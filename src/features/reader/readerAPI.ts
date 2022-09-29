import * as pdfjs from "pdfjs-dist";
// @ts-ignore
// import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { withholdingTaxRegex } from "constants/regex";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const read = async (data: string) => {
  const pdf = await pdfjs.getDocument(data).promise;
  const total = pdf._pdfInfo.numPages;

  const datas: { text: string; left: number[] }[] = [];
  for (let i = 1; i <= total; i++) {
    const [text, left] = await readPage(pdf, i);
    datas.push({ text, left });
  }
  return datas;
};

const readPage = async (
  pdf: pdfjs.PDFDocumentProxy,
  p: number
): Promise<[string, number[]]> => {
  const page = await pdf.getPage(p);
  const viewport = page.getViewport({ scale: 3 });

  const textContent = await page.getTextContent();

  const { items } = textContent;
  let text = "";
  const left: number[] = [];
  for (const item of items) {
    if ("str" in item && "transform" in item) {
      const t = pdfjs.Util.transform(viewport.transform, item.transform);
      const tx = pdfjs.Util.transform(t, [1, 0, 0, -1, 0, 0]);

      text += item.str;
      item.str && left.push(tx[4]);
    }
  }
  return [text, left];
};

const extractWithholdingTax = (
  totalText: string
): [boolean, [string, number][]] => {
  const arr: [string, number][] = [];
  let match;
  let isWithholdingTax = false;
  while ((match = withholdingTaxRegex.exec(totalText))) {
    const str = match[0];
    if (str === "소득자별근로소득원천징수부") {
      isWithholdingTax = true;
      continue;
    }
    arr.push([str, match.index]);
  }
  return [isWithholdingTax, arr];
};

const getWithholdingTaxData = (pdfData: { text: string; left: number[] }[]) => {
  const datas: { data: [string, number][]; left: number[] }[] = [];
  for (let i = 0; i < pdfData.length; i++) {
    const { text, left } = pdfData[i];
    const [isWithholdingTax, data] = extractWithholdingTax(text);
    if (isWithholdingTax) datas.push({ data, left });
  }
  return datas;
};

export const readPDF = async (data: string) => {
  const pdfData = await read(data);
  return getWithholdingTaxData(pdfData);
};
