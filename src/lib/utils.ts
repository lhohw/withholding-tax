import type { YYYYMMDD } from "models/Employee";

import {
  socialInsuranceRate as SIR,
  industrialAccidentRate as IAR,
} from "constants/law";
import { getBirth } from "./api/employeeAPI";
import { GenerationTypes, generationTypes } from "constants/value";

export const degToRad = (deg: number) => (deg / 180) * Math.PI;

export const getSocialInsuranceRate = (year: string, code: string) =>
  Math.floor(
    (Object.values(SIR[year]).reduce((x, y) => x + y) + IAR[year][code] / 10) *
      1e5
  ) / 1e7;

export const getDays = (year: number, month: number) =>
  [
    31,
    28 + ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];

export const isYouth = (RRN: string, date: number) => {
  const [year, month] = numberToDate(date).map(Number);
  const limit = new Date(year - 30, month - 1, getDays(year, month - 1));
  const birth = new Date(getBirth(RRN));
  return birth > limit;
};

export const isRetired = (
  retirementDate: string,
  year: string | number,
  month: string | number
) => {
  year = year.toString();
  month = month.toString().padStart(2, "0");
  const retired = new Date(retirementDate.split(".").join("-"));
  const monthsFirstDay = new Date(`${year}-${month}-01`);
  const monthsLastDay = new Date(
    `${year}-${month}-${getDays(+year, +month - 1)
      .toString()
      .padStart(2, "0")}`
  );
  return retirementDate && retired >= monthsFirstDay && retired < monthsLastDay;
};

const strToNum = (x: string) => roundOff(Number(x.split(",").join("") || "0"));
const numToStr = (x: number) => {
  const minus = x < 0;
  let str = minus ? x.toString().slice(1) : x.toString();
  if (str.indexOf(".") !== -1) {
    [str] = str.split(".");
  }
  let i = str.length;
  let ret = "";
  while (i > 0) {
    ret = "," + str.slice(Math.max(0, i - 3), i) + ret;
    i -= 3;
  }
  return (minus ? "-" : "") + ret.slice(1);
};

export const dateToNumber = (date: string) => new Date(date).getTime();
export const numberToDate = (num: number) =>
  new Date(num).toLocaleDateString().split(". ");

export function parseMoney<T extends string | number>(
  x: T
): T extends string ? number : string;
export function parseMoney(x: string | number) {
  if (typeof x === "string") return strToNum(x);
  return numToStr(x);
}

export const lessThanAMonth = (date: {
  start: YYYYMMDD;
  retirement: YYYYMMDD;
}) => {
  const { start, retirement } = date;
  if (!retirement) return false;
  const [sy, sm, sd] = start.split(".").map(Number);
  const [ry, rm, rd] = retirement.split(".").map(Number);
  if (sd === 1) return sy === ry && sm === rm && rd < getDays(sy, sm - 1);
  const limit = new Date(
    `${sy + (sm === 12 ? 1 : 0)}-${sm + 1 === 13 ? 1 : sm + 1}-${sd}`
  );
  const ret = new Date(`${ry}-${rm}-${rd}`);
  return ret < limit;
};

export const getWorkingDays = (startDate: string, retirementDate: string) =>
  (Date.parse(retirementDate) - Date.parse(startDate)) / 1000 / 60 / 60 / 24;

export const lessThan28Days = (startDate: string, retirementDate: string) =>
  getWorkingDays(startDate, retirementDate) <= 27;

export const roundOff = (x: number) =>
  (x < 0 ? Math.ceil(x * 100) : Math.floor(x * 100)) / 100;

export const getStatisticsData = (
  title: string,
  data: { [key in GenerationTypes]: number },
  monthCnt: number
) => [
  title,
  ...generationTypes.map(
    (type) => `${roundOff(data[type] / (monthCnt || 1))} [${data[type]}]`
  ),
];

export const getGenerationSum = (data: number[]) =>
  data.slice(2).reduce((x, y) => x + y);
