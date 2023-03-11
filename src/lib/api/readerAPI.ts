import type {
  EmployeeT,
  MonthlyStatementOfPaymentOfWageAndSalary,
} from "models/Employee";

import * as pdfjs from "pdfjs-dist";
// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

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
} from "constants/regex";
import { dateToNumber, parseMoney, isYouth } from "lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export type ExtractTextAndOffsetXFromPage = (props: {
  pdf: pdfjs.PDFDocumentProxy;
  pageNumber: number;
}) => Promise<{ text: string; offsetX: number[] }>;
const extractTextAndOffsetXFromPage: ExtractTextAndOffsetXFromPage = async ({
  pdf,
  pageNumber,
}) => {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 3 });
  const textContent = await page.getTextContent();

  const { items } = textContent;
  let text = "";
  const offsetX: number[] = [];
  for (const item of items) {
    if ("str" in item && "transform" in item) {
      const t = pdfjs.Util.transform(viewport.transform, item.transform);
      const tx = pdfjs.Util.transform(t, [1, 0, 0, -1, 0, 0]);
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
  EmployeeT,
  "corporate" | "name" | "date"
> & {
  data: string;
  index: number;
  year: string;
  RRN: string;
};
export type CreateWithholdingTaxData = (props: {
  isTaxLove: boolean;
  text: string;
}) => WithholdingTaxData | null;
const createWithholdingTaxData: CreateWithholdingTaxData = ({
  isTaxLove,
  text,
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
    let data = parseData(str, withholdingTaxData);
    let key = Object.keys(data)[0];
    if (key === "data") withholdingTaxData["index"] = match.index;
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
  if (str.match(yearRegex)) return { year: str.replace(yearRegex, "") };
  if (str.match(corporateRegex))
    return { corporate: { name: str.replace(corporateRegex, "") } } as Pick<
      EmployeeT,
      "corporate"
    >;
  if (str.match(RRNRegex)) return { RRN: str.replace(RRNRegex, "") };
  if (str.match(addressRegex)) {
    str = str.replace(/소\s*득\s*자\s*/, "");
    return { corporate: { address: str.replace(addressRegex, "") } } as Pick<
      EmployeeT,
      "corporate"
    >;
  }
  if (str.match(nameRegex)) return { name: str.replace(nameRegex, "") };
  if (str.match(RNRegex))
    return { corporate: { RN: str.replace(RNRegex, "") } } as Pick<
      EmployeeT,
      "corporate"
    >;
  if (str.match(dateRegex.start)) {
    str = str.replace(dateRegex.start, "");
    if (str.match(/\//)) str = str.replace(/\//g, ".");
    else if (str.match(/\d+년\d+월\d+일/))
      str = str.replace(/[년|월|일]/g, (matched) =>
        matched === "일" ? "" : "."
      );
    return {
      date: {
        [year]: {
          start: str || "",
        },
      },
    } as Pick<EmployeeT, "date">;
  }
  if (str.match(dateRegex.resign)) {
    str = str.replace(dateRegex.resign, "");
    if (str.match(/\//)) str = str.replace(/\//g, ".");
    else if (str.match(/\d+년\d+월\d+일/))
      str = str.replace(/[년|월|일]/g, (matched) =>
        matched === "일" ? "" : "."
      );
    return {
      date: {
        [year]: {
          resign: str || "",
        },
      },
    } as Pick<EmployeeT, "date">;
  }
  return { data: str };
};

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

const isTaxLove = async (pdf: pdfjs.PDFDocumentProxy) => {
  const md = await pdf.getMetadata();
  // @ts-ignore
  const isTaxLove = md?.info?.Creator === "세무사랑 Pro";
  return isTaxLove;
};

// For parsing salary data
const createStatement = (
  data: WithholdingTaxData,
  offsetX: number[],
  isTaxLove: boolean
) => {
  const { data: text, index, year, RRN } = data;
  let match;
  let here = -1;
  const statement: MonthlyStatementOfPaymentOfWageAndSalary[] = [];
  const salary: EmployeeT["salary"] = {};

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

  const monthlyStatement: MonthlyStatementOfPaymentOfWageAndSalary = {
    salary: {
      youth: 0,
      manhood: 0,
    },
    salaryDate: dateToNumber(`${yearPrefix}/${tag}`),
    totalSalary: {
      salary: parseMoney(obj.salary),
      bonus: parseMoney(obj.bonus),
      recognitionBonus: parseMoney(obj.recognitionBonus),
      profitFromExerciseOfStockOption: parseMoney(
        obj.profitFromExerciseOfStockOption
      ),
      withdrawalFromOurEmployeeStockOwnershipAssociation: parseMoney(
        obj.withdrawalFromOurEmployeeStockOwnershipAssociation
      ),
      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: parseMoney(
        obj.exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement
      ),
      total: parseMoney(obj.total),
    },
    theAmountOfTaxCollected: {
      simplifiedTaxAmountApplicable: {
        salaryRange: !obj.salaryRange
          ? [0, 0]
          : isTaxLove
          ? (obj.salaryRange
              .split(/이상\s*|미만\s*/g)
              .slice(0, 2)
              .map(parseMoney) as [number, number])
          : (obj.salaryRange.split("~").map(parseMoney) as [number, number]),
        incomeTax: parseMoney(obj.incomeTax),
      },
      etc: {
        incomeTax: parseMoney(obj.externalIncomeTax),
      },
      totalIncomeTax: parseMoney(obj.totalIncomeTax),
      localIncomeTax: parseMoney(obj.localIncomeTax),
    },
  };
  if (isYouth(RRN, monthlyStatement.salaryDate))
    monthlyStatement.salary.youth = monthlyStatement.totalSalary.total;
  else monthlyStatement.salary.manhood = monthlyStatement.totalSalary.total;
  return monthlyStatement;
};

const readPDF = async (data: string) => {
  const pdf = await pdfjs.getDocument({
    data,
    cMapUrl: "../../../cmaps/",
    cMapPacked: true,
  }).promise;
  const totalPage = pdf.numPages;
  const _isTaxLove = await isTaxLove(pdf);
  const pdfData: { data: WithholdingTaxData; offsetX: number[] }[] = [];
  for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
    const { text, offsetX } = await extractTextAndOffsetXFromPage({
      pdf,
      pageNumber,
    });
    const pageData = createWithholdingTaxData({ isTaxLove: _isTaxLove, text })!;
    if (pageData) pdfData.push({ data: pageData, offsetX });
  }

  const employeeInfo = pdfData.map(({ data, offsetX }) => {
    const statement = createStatement(data, offsetX, _isTaxLove);
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

export const read = async (data: string) => {
  try {
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
  } catch (e: any) {
    console.log(e);
  }
};
