import { PaymentDate, YYYYMMDD } from "../features/person/personAPI";
import { getBirthCentury } from "./values";

const getDays = (year: number, month: number) =>
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

export const isYouth = (id: string, date: PaymentDate) => {
  const [year, month] = date.split("/").map(Number);
  const limit = new Date(year - 30, month - 1, getDays(year, month - 1));
  const [f] = id.split("-");
  const prefix = getBirthCentury(id);
  const y = parseInt(prefix + f.slice(0, 2));
  const m = parseInt(f.slice(2, 4));
  const d = parseInt(f.slice(4, 6));
  const birth = new Date(y, m - 1, d);
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

const strToNum = (x: string) => parseInt(x.split(",").join("") || "0");
const numToStr = (x: number) => {
  let minus = x < 0;
  const str = minus ? x.toString().slice(1) : x.toString();
  let i = str.length;
  let ret = "";
  while (i > 0) {
    ret = "," + str.slice(Math.max(0, i - 3), i) + ret;
    i -= 3;
  }
  return (minus ? "-" : "") + ret.slice(1);
};

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

export const roundOff = (x: number) => Math.floor(x * 100) / 100;
