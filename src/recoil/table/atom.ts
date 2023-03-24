import type { GenerationTypes } from "constants/value";

import { atomFamily, selectorFamily } from "recoil";

import Employee from "models/Employee";

import { corporatesState } from "recoil/corporates";

import { getDays, isRetired } from "lib/utils";

export type EmployeeCheckedProps = Pick<
  InstanceType<typeof Employee>,
  "id" | "year" | "earnedIncomeWithholdingDepartment" | "date"
>;
export const employeeCheckedState = atomFamily<boolean[], EmployeeCheckedProps>(
  {
    key: "EmployeeCheckedState",
    default: ({ year, earnedIncomeWithholdingDepartment, date }) => {
      if (!(year in earnedIncomeWithholdingDepartment))
        return new Array(12).fill(false);

      const resign = date[year]?.resign;
      return earnedIncomeWithholdingDepartment[year].map(
        ({ totalSalary: { total } }, idx) => {
          if (!date[year]?.start) return false;

          const startDate = Date.parse(date[year].start);
          const monthsLastDay = Date.parse(
            `${year}.${(idx + 1).toString().padStart(2, "0")}.${getDays(
              +year,
              idx
            )}`
          );
          if (startDate > monthsLastDay) return false;
          if ((!resign || Date.parse(resign) > monthsLastDay) && total === 0)
            return true;
          if (resign && isRetired(resign, year, idx + 1)) return true;
          return false;
        }
      );
    },
  }
);

export type ResultState = Record<GenerationTypes, number[]>;
export type ResultProps = {
  RN: string;
  year: string;
};
export const resultState = atomFamily<ResultState, ResultProps>({
  key: "ResultState",
  default: selectorFamily<ResultState, ResultProps>({
    key: "ResultState/default",
    get:
      ({ RN, year }) =>
      ({ get }) => {
        const corporate = get(corporatesState)[RN];
        const ret = corporate.getYearlyTableResult(year);
        return ret;
      },
  }),
});
