import { GenerationTypes } from "constants/value";

import { atomFamily, selectorFamily } from "recoil";
import { corporatesState } from "recoil/corporates";

export type EmployeeCheckedProps = {
  RN: string;
  year: string;
  id: string;
};
export const employeeCheckedState = atomFamily<boolean[], EmployeeCheckedProps>(
  {
    key: "EmployeeCheckedState",
    default: new Array(12).fill(false),
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
