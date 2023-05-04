import {
  socialInsuranceRate as SIR,
  industrialAccidentRate as IAR,
} from "constants/law";

export const degToRad = (deg: number) => (deg / 180) * Math.PI;

export const getSocialInsuranceRate = (year: string, code: string) =>
  Math.floor(
    (Object.values(SIR[year]).reduce((x, y) => x + y) + IAR[year][code] / 10) *
      1e5
  ) / 1e7;

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

export function parseMoney<T extends string | number>(
  x: T
): T extends string ? number : string;
export function parseMoney(x: string | number) {
  if (typeof x === "string") return strToNum(x);
  return numToStr(x);
}

export const roundOff = (x: number) =>
  (x < 0 ? Math.ceil(x * 100) : Math.floor(x * 100)) / 100;

export const withDividedByMonth = (data: number, month: string) =>
  `${roundOff(data / (+month || 1))} [${data}]`;

export const getGenerationSum = (data: number[]) =>
  data.slice(2).reduce((x, y) => x + y);

export const getResultSum = (result: number[]) => ({
  totalSalary: result[0] + result[1],
  totalGeneration: getGenerationSum(result),
});
