import type { YYYYMMDD } from "models/Employee";
import { getBirth } from "../api/employeeAPI";

export const dateToNumber = (date: string) => new Date(date).getTime();
export const numberToDate = (num: number) =>
  new Date(num).toLocaleDateString().split(". ");

export const parseDate = (
  date: YYYYMMDD | Record<"year" | "month" | "day", number>
) => {
  if (typeof date === "object") {
    const { year, month, day } = date;
    return new Date(`${year}-${month}-${day}`);
  }
  const [year, month, day] = date.split(/\s*\.\s*/);
  return new Date(`${+year}-${+month}-${+day}`);
};

export const getDays = (year: number, month: number) => {
  if (month === 0) throw new Error("month should be over 0");
  return [
    -1,
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
};

export const getFirstDay = (year: number, month: number) => {
  return new Date(`${year}-${month}-${1}`);
};
export const getLastDay = (year: number, month: number) => {
  const day = getDays(year, month);
  return new Date(`${year}-${month}-${day}`);
};

export const isYouth = (RRN: string, date: number) => {
  const [year, month] = numberToDate(date).map(Number);
  const limit = getLastDay(year - 30, month);
  const birth = parseDate(getBirth(RRN));
  return birth > limit;
};

export const isResigned = (
  resignationDate: YYYYMMDD,
  year: string | number,
  month: string | number
) => {
  if (!resignationDate) return false;
  year = year.toString();
  month = month.toString().padStart(2, "0");
  const [ry, rm] = resignationDate.split(".");
  const resigned = parseDate(resignationDate);
  const lastDay = getLastDay(+year, +month);
  if (lastDay.getTime() === resigned.getTime()) return false;
  const resignMonthFirstDay = getFirstDay(+ry, +rm);
  return resignMonthFirstDay < lastDay;
};

export const lessThanAMonth = (date: {
  start: YYYYMMDD;
  retirement: YYYYMMDD;
}) => {
  const { start, retirement } = date;
  if (!retirement) return false;
  const [sy, sm, sd] = start.split(".").map(Number);
  const [ry, rm, rd] = retirement.split(".").map(Number);
  if (sd === 1) return sy === ry && sm === rm && rd < getDays(sy, sm);
  const limit = parseDate({
    year: sy + (sm === 12 ? 1 : 0),
    month: sm + 1 === 13 ? 1 : sm + 1,
    day: sd,
  });
  const ret = parseDate({
    year: ry,
    month: rm,
    day: rd,
  });
  return ret < limit;
};

export const getWorkingDays = (startDate: string, retirementDate: string) =>
  (Date.parse(retirementDate) - Date.parse(startDate)) / 1000 / 60 / 60 / 24;

export const lessThan28Days = (startDate: string, retirementDate: string) =>
  getWorkingDays(startDate, retirementDate) <= 27;
