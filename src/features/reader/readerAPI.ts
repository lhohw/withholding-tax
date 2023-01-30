import * as pdfjs from "pdfjs-dist";
// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {
  withholdingTaxRegex,
  taxLoveWithholdingTaxRegex,
} from "constants/regex";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const read = async (data: string) => {
  const pdf = await pdfjs.getDocument({
    data,
    // cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapUrl: "../../../cmaps/",
    cMapPacked: true,
  }).promise;
  const md = await pdf.getMetadata();
  // @ts-ignore
  const isTaxLove = md?.info?.Creator === "세무사랑 Pro";

  const total = pdf._pdfInfo.numPages;

  const pdfData: { text: string; left: number[] }[] = [];
  for (let i = 1; i <= total; i++) {
    const [text, left] = await readPage(pdf, i);
    pdfData.push({ text, left });
  }
  return { isTaxLove, pdfData };
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
      if (item.str) {
        left.push(tx[4]);
        for (let i = 0; i < item.str.length - 1; i++) left.push(-1);
      }
    }
  }
  return [text, left];
};

type ExtractWithholdingTax = (props: {
  isTaxLove: boolean;
  totalText: string;
}) => [boolean, [string, number][]];
const extractWithholdingTax: ExtractWithholdingTax = ({
  isTaxLove,
  totalText,
}) => {
  const arr: [string, number][] = [];
  let match;
  let isWithholdingTax = false;
  const regex = isTaxLove ? taxLoveWithholdingTaxRegex : withholdingTaxRegex;
  while ((match = regex.exec(totalText))) {
    let str = match[0];
    if (/소득자별\s?근로소득\s?원천징수부/.exec(str)) {
      isWithholdingTax = true;
      continue;
    }
    if (isTaxLove) {
      if (str.startsWith("법 인 명")) str = str.replace("법 인 명", "법인명");
      if (str.startsWith("근무처") && str.endsWith("소 득 자"))
        str = str.replace("소 득 자", "");
      if (str.startsWith("성 명")) str = str.replace("성 명", "성명:");
      if (str.startsWith("입사일") || str.startsWith("퇴사일")) {
        let [title, date] = str.split(" ");
        if (date) {
          const splitted = date.split("/");
          str = `${title} ${splitted[0]}년${splitted[1]}월${splitted[2]}일`;
        }
      }
      if (str.startsWith("35") && str.endsWith("계")) {
        str = str.slice(2);
        match.index += 2;
      }
    }
    arr.push([str.trim(), match.index]);
  }
  return [isWithholdingTax, arr];
};

type GetWithholdingTaxData = (props: {
  pdfData: { text: string; left: number[] }[];
  isTaxLove: boolean;
}) => {
  datas: {
    data: [string, number][];
    left: number[];
  }[];
  isTaxLove: boolean;
};
const getWithholdingTaxData: GetWithholdingTaxData = ({
  isTaxLove,
  pdfData,
}) => {
  const datas: { data: [string, number][]; left: number[] }[] = [];
  for (let i = 0; i < pdfData.length; i++) {
    const { text, left } = pdfData[i];
    const [isWithholdingTax, data] = extractWithholdingTax({
      isTaxLove,
      totalText: text,
    });
    if (isWithholdingTax) datas.push({ data, left });
  }
  return { datas, isTaxLove };
};

export const readPDF = async (data: string) => {
  const { isTaxLove, pdfData } = await read(data);
  return getWithholdingTaxData({ isTaxLove, pdfData });
};
