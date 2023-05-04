import { atomFamily } from "recoil";

import Employee from "models/Employee";

import {
  getLastDay,
  getWorkingDays,
  isResigned,
  parseDate,
} from "lib/utils/date";

export type EmployeeCheckedStateProps = {
  id: string;
  year: string;
  date: Employee["date"];
  mappedEarnedIncomeWithholdingDepartment?: number[];
};
export const employeeCheckedState = atomFamily<
  boolean[],
  EmployeeCheckedStateProps
>({
  key: "EmployeeCheckedState",
  default: ({ year, date, mappedEarnedIncomeWithholdingDepartment }) => {
    if (!mappedEarnedIncomeWithholdingDepartment)
      return new Array(12).fill(false);
    return getDefaultEmployeeChecked({
      year,
      date,
      mappedEarnedIncomeWithholdingDepartment,
    });
  },
});

export type GetDefaultEmployeeCheckedProps = Pick<
  EmployeeCheckedStateProps,
  "year" | "date" | "mappedEarnedIncomeWithholdingDepartment"
>;
const getDefaultEmployeeChecked = ({
  year,
  date,
  mappedEarnedIncomeWithholdingDepartment,
}: GetDefaultEmployeeCheckedProps) => {
  const resign = date[year]?.resign;
  return mappedEarnedIncomeWithholdingDepartment!.map((total, idx) => {
    if (!date[year]?.start) return false;

    const startDate = parseDate(date[year].start);
    const month = idx + 1;
    const monthsLastDay = getLastDay(+year, month);
    if (startDate > monthsLastDay) return false;
    if ((!resign || !isResigned(resign, year, month)) && total === 0)
      return true;
    if (resign && isResigned(resign, year, month) && total) return true;
    return false;
  });
};

export type WorkingDaysStateProps = {
  date: Employee["date"];
  year: string;
};
export const workingDaysState = atomFamily<number, WorkingDaysStateProps>({
  key: "WorkingDaysState",
  default: ({ date, year }) => {
    if (!date[year]?.start) return 0;
    if (!date[year]?.resign) return Infinity;
    return getWorkingDays(date[year].start, date[year].resign);
  },
});
