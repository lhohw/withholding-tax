import { PaymentDate } from "../features/person/personAPI";

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
  month: number
) => {
  year = +year;
};

export const getBirthCentury = (id: string) => {
  const firstRearDigit = id.split("-")[1][0];
  return (
    19 +
    (firstRearDigit === "3" ||
    firstRearDigit === "4" ||
    firstRearDigit === "7" ||
    firstRearDigit === "8"
      ? 1
      : 0)
  ).toString();
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

export const getLastYears = (len: number) => {
  const year = parseInt(new Date().toLocaleString().split(". ")[0]);
  return new Array(len)
    .fill(undefined)
    .map((_, i) => (year - (len - i)).toString());
};
