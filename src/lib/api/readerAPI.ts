import type { MonthlyStatementOfPaymentOfWageAndSalary } from "models/Employee";

import {
  GlobalWorkerOptions,
  getDocument,
  PDFPageProxy,
  PDFDocumentProxy,
  Util,
} from "pdfjs-dist";
// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import produce from "immer";

import Employee from "models/Employee";
import { getId, getBirth } from "./employeeAPI";
import {
  defaultStatement,
  range,
  taxLoveRange,
  titles,
} from "constants/employee";
import {
  withholdingTaxRegex,
  taxLoveWithholdingTaxRegex,
  yearRegex,
  RRNRegex,
  nameRegex,
  corporateRegex,
  RNRegex,
  addressRegex,
  dateRegex,
  monthlyStatementRegex,
  incomeEarnerRegex,
} from "constants/regex";
import { dateToNumber, parseMoney, isYouth } from "lib/utils";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const read = async (data: string) => {
  const employeeInfo = await readPDF(data);
  const result: Employee[] = [];
  for (const {
    year,
    name,
    RRN,
    corporate,
    date,
    earnedIncomeWithholdingDepartment,
  } of employeeInfo) {
    const id = getId(RRN);
    const birth = getBirth(RRN);
    const employee = new Employee(
      id,
      birth,
      name,
      corporate,
      date,
      earnedIncomeWithholdingDepartment,
      year
    );
    result.push(employee);
  }
  return result;
};

const readPDF = async (data: string) => {
  const pdf = await getPDFDocumentFrom(data);
  const _isTaxLove = await isTaxLove(pdf);
  const pdfData = await getPDFDataFrom(pdf, _isTaxLove);

  const employeeInfo = createEmployeeInfo(pdfData, _isTaxLove);
  return employeeInfo;
};

const getPDFDocumentFrom = async (data: string) => {
  return await getDocument({
    data,
    cMapUrl: "../../../cmaps/",
    cMapPacked: true,
  }).promise;
};

const isTaxLove = async (pdf: PDFDocumentProxy) => {
  const md = await pdf.getMetadata();
  // @ts-ignore
  const isTaxLove = md?.info?.Creator === "세무사랑 Pro";
  return isTaxLove;
};

const getPDFDataFrom = async (pdf: PDFDocumentProxy, isTaxLove = false) => {
  const pdfData: { data: WithholdingTaxData; offsetX: number[] }[] = [];
  const totalPage = pdf.numPages;
  for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const { text, offsetX } = await extractTextAndOffsetXFromPage(page);
    const pageData = createWithholdingTaxData({ text, isTaxLove })!;
    if (pageData) pdfData.push({ data: pageData, offsetX });
  }
  return pdfData;
};

const extractTextAndOffsetXFromPage = async (page: PDFPageProxy) => {
  const viewport = page.getViewport({ scale: 3 });
  const { items } = await page.getTextContent();
  let text = "";
  const offsetX: number[] = [];
  for (const item of items) {
    if ("str" in item && "transform" in item) {
      const t = Util.transform(viewport.transform, item.transform);
      const tx = Util.transform(t, [1, 0, 0, -1, 0, 0]);
      text += item.str;
      if (item.str) {
        offsetX.push(tx[4]);
        for (let i = 0; i < item.str.length - 1; i++) offsetX.push(-1);
      }
    }
  }
  return { text, offsetX };
};

export type WithholdingTaxData = Pick<
  Employee,
  "corporate" | "name" | "date"
> & {
  data: string;
  index: number;
  year: string;
  RRN: string;
};
export type CreateWithholdingTaxData = (props: {
  text: string;
  isTaxLove: boolean;
}) => WithholdingTaxData | null;
const createWithholdingTaxData: CreateWithholdingTaxData = ({
  text,
  isTaxLove,
}) => {
  const withholdingTaxData: WithholdingTaxData = {} as WithholdingTaxData;
  let match;
  let isWithholdingTax = false;
  const regex = isTaxLove ? taxLoveWithholdingTaxRegex : withholdingTaxRegex;
  while ((match = regex.exec(text))) {
    let str = match[0];
    if (/소득자별\s*근로소득\s*원천징수부/.exec(str)) {
      isWithholdingTax = true;
      continue;
    }
    // isTaxLove &&
    if (str.startsWith("35") && str.endsWith("계")) {
      str = str.slice(2);
      match.index += 2;
    }
    const data = parseData(str, withholdingTaxData);
    const key = Object.keys(data)[0];
    if (key === "data") withholdingTaxData.index = match.index;
    setData(withholdingTaxData, data, key);
  }
  if (!isWithholdingTax) return null;
  return withholdingTaxData;
};

const parseData = (
  str: string,
  withholdingTaxData: WithholdingTaxData
): Partial<Pick<WithholdingTaxData, keyof WithholdingTaxData>> => {
  const year = withholdingTaxData.year;
  if (str.match(yearRegex)) return createDataObject(str, ["year"], yearRegex);
  if (str.match(corporateRegex))
    return createDataObject(str, ["corporate", "name"], corporateRegex);
  if (str.match(RRNRegex)) return createDataObject(str, ["RRN"], RRNRegex);
  if (str.match(addressRegex)) {
    return createDataObject(
      removeKeyFromRegex(str, incomeEarnerRegex),
      ["corporate", "address"],
      addressRegex
    );
  }
  if (str.match(nameRegex)) return createDataObject(str, ["name"], nameRegex);
  if (str.match(RNRegex))
    return createDataObject(str, ["corporate", "RN"], RNRegex);
  if (str.match(dateRegex.start)) {
    str = removeKeyFromRegex(str, dateRegex.start);
    if (str.match(/\//)) str = str.replace(/\//g, ".");
    else if (str.match(/\d+년\d+월\d+일/))
      str = str.replace(/[년|월|일]/g, (matched) =>
        matched === "일" ? "" : "."
      );
    return createDataObject(
      str || "",
      ["date", year, "start"],
      dateRegex.start
    );
  }
  if (str.match(dateRegex.resign)) {
    str = removeKeyFromRegex(str, dateRegex.resign);
    if (str.match(/\//)) str = str.replace(/\//g, ".");
    else if (str.match(/\d+년\d+월\d+일/))
      str = str.replace(/[년|월|일]/g, (matched) =>
        matched === "일" ? "" : "."
      );
    return createDataObject(
      str || "",
      ["date", year, "resign"],
      dateRegex.resign
    );
  }
  return { data: str };
};

const createDataObject = <T extends { [key: string]: any }>(
  str: string,
  route: string[],
  regex?: RegExp
) => {
  if (!route.length) throw new Error("route for data oject is required");
  if (regex) str = removeKeyFromRegex(str, regex);

  const obj = produce({} as T, (draft) => {
    for (let i = 0; i < route.length - 1; i++) {
      const key = route[i];
      // @ts-ignore
      if (!draft[key]) draft[key] = {};
      draft = draft[key];
    }
    // @ts-ignore
    draft[route[route.length - 1]] = str;
  });
  return obj;
};

const removeKeyFromRegex = (str: string, regex: RegExp) =>
  str.replace(regex, "");

const setData = (
  here: { [key: string]: any },
  data: { [key: string]: any },
  key: string
) => {
  while (typeof data[key as keyof WithholdingTaxData] === "object") {
    if (!(key in here)) here[key as keyof WithholdingTaxData] = {};
    here = here[key];
    data = data[key];
    key = Object.keys(data)[0];
  }
  here[key] = data[key];
};

const createEmployeeInfo = (
  pdfData: Awaited<ReturnType<typeof getPDFDataFrom>>,
  isTaxLove = false
) => {
  const employeeInfo = pdfData.map(({ data, offsetX }) => {
    const statement = createStatement(data, offsetX, isTaxLove);
    const { year, name, RRN, corporate, date } = data;
    return {
      year,
      name,
      RRN,
      corporate,
      date,
      earnedIncomeWithholdingDepartment: {
        [year]: statement,
      },
    };
  });
  return employeeInfo;
};

const createStatement = (
  data: WithholdingTaxData,
  offsetX: number[],
  isTaxLove: boolean
) => {
  const { data: text, index, year, RRN } = data;
  let match;
  let here = -1;
  const statement: MonthlyStatementOfPaymentOfWageAndSalary[] = [];
  const salary: Employee["salary"] = {};

  salary[year] = { youth: 0, manhood: 0 };
  let tag = "";
  const regex = monthlyStatementRegex(isTaxLove);
  let expectedMonth = 1;
  let minus = 0;
  while ((match = regex.exec(text))) {
    if (here === -1) {
      tag = isTaxLove
        ? match[0].split("/")[1]
        : match[0].replace("월", "").padStart(2, "0");
      here = match.index;
      if (parseInt(tag) === 2 && !text.startsWith("12")) minus++;
      continue;
    }
    // create default monthly statement
    while (parseInt(tag) - minus !== expectedMonth && expectedMonth <= 12) {
      if (parseInt(tag) - minus < expectedMonth) {
        throw new Error("invalid month, check pdf and reader.");
      }
      const monthlyStatement = createMonthlyStatement(
        "",
        offsetX,
        index + here,
        RRN,
        expectedMonth.toString().padStart(2, "0"),
        +year,
        isTaxLove,
        expectedMonth++
      );
      statement.push(monthlyStatement);
    }
    const monthlyStatement = createMonthlyStatement(
      text.slice(here, match.index),
      offsetX,
      index + here,
      RRN,
      (+tag - minus).toString().padStart(2, "0"),
      +year,
      isTaxLove,
      expectedMonth++
    );
    if (!monthlyStatement) return statement;
    statement.push(monthlyStatement);
    salary[year].youth += monthlyStatement.salary.youth;
    salary[year].manhood += monthlyStatement.salary.manhood;

    tag =
      (isTaxLove
        ? (+match[0].split("/")[1] - minus).toString().padStart(2, "0")
        : (+match[0].replace("월", "") - minus).toString().padStart(2, "0")) ||
      (+match[0] - minus).toString().padStart(2, "0");
    here = match.index;
  }
  return statement;
};

const findPositionForParsingStatement = (x: number, range: number[]) => {
  let i = 0;
  while (i < range.length && x > range[i]) i++;
  if (i === range.length) {
    i--;
    console.error("Can not find position for statement " + x);
  }
  return titles[i];
};

const createMonthlyStatement = (
  line: string,
  left: number[],
  startIndex: number,
  RRN: string,
  tag: string,
  yearPrefix: number,
  isTaxLove: boolean,
  expectedMonth: number
): MonthlyStatementOfPaymentOfWageAndSalary => {
  if (isTaxLove && expectedMonth <= 11 && line) {
    line = line.slice(0, line.lastIndexOf((expectedMonth + 1).toString()));
  }
  if (line.startsWith("연말")) return null!;
  const obj = defaultStatement();
  let prev = -1;
  const _range = isTaxLove ? taxLoveRange : range;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!char.trim()) continue;
    let x = left[startIndex + i];
    if (x === -1) {
      if (i !== 0 && !line[i - 1].trim()) {
        let tmp = 1;
        while (
          startIndex + i + tmp < left.length &&
          left[startIndex + i + tmp] === -1
        ) {
          tmp++;
        }
        x = left[startIndex + i + tmp];
      } else x = prev;
    } else prev = x;
    const title = findPositionForParsingStatement(x, _range);
    obj[title as keyof typeof obj] += char;
  }
  const monthlyStatement = createMonthlyStatementByObject(
    obj,
    dateToNumber(`${yearPrefix}/${tag}`),
    isTaxLove
  );

  if (isYouth(RRN, monthlyStatement.salaryDate))
    monthlyStatement.salary.youth = monthlyStatement.totalSalary.total;
  else monthlyStatement.salary.manhood = monthlyStatement.totalSalary.total;
  return monthlyStatement;
};

const createMonthlyStatementByObject = (
  obj: ReturnType<typeof defaultStatement>,
  salaryDate: number,
  isTaxLove = false
) => {
  const {
    salary,
    bonus,
    recognitionBonus,
    profitFromExerciseOfStockOption,
    withdrawalFromOurEmployeeStockOwnershipAssociation,
    exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement,
    total,
    salaryRange,
    incomeTax,
    externalIncomeTax,
    totalIncomeTax,
    localIncomeTax,
  } = obj;
  const monthlyStatement: MonthlyStatementOfPaymentOfWageAndSalary = {
    salary: {
      youth: 0,
      manhood: 0,
    },
    salaryDate,
    totalSalary: {
      salary: parseMoney(salary),
      bonus: parseMoney(bonus),
      recognitionBonus: parseMoney(recognitionBonus),
      profitFromExerciseOfStockOption: parseMoney(
        profitFromExerciseOfStockOption
      ),
      withdrawalFromOurEmployeeStockOwnershipAssociation: parseMoney(
        withdrawalFromOurEmployeeStockOwnershipAssociation
      ),
      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: parseMoney(
        exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement
      ),
      total: parseMoney(total),
    },
    theAmountOfTaxCollected: {
      simplifiedTaxAmountApplicable: {
        salaryRange: !salaryRange
          ? [0, 0]
          : isTaxLove
          ? (salaryRange
              .split(/이상\s*|미만\s*/g)
              .slice(0, 2)
              .map(parseMoney) as [number, number])
          : (salaryRange.split("~").map(parseMoney) as [number, number]),
        incomeTax: parseMoney(incomeTax),
      },
      etc: {
        incomeTax: parseMoney(externalIncomeTax),
      },
      totalIncomeTax: parseMoney(totalIncomeTax),
      localIncomeTax: parseMoney(localIncomeTax),
    },
  };
  return monthlyStatement;
};
