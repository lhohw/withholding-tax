import type { GenerationTypes } from "constants/value";

import { atomFamily, selectorFamily } from "recoil";

import { corporatesState } from "recoil/corporates";
import { employeeCheckedState } from "recoil/employee";

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
        const PADDING = 2;
        const ret = {
          total: new Array(14).fill(0),
          youth: new Array(14).fill(0),
          manhood: new Array(14).fill(0),
        };
        Object.values(corporate.employees).forEach((employee) => {
          const { id, date, earnedIncomeWithholdingDepartment, salary } =
            employee;
          if (!(year in salary)) return;
          const checked = get(
            employeeCheckedState({
              id,
              year,
              date,
              mappedEarnedIncomeWithholdingDepartment:
                earnedIncomeWithholdingDepartment[year]?.map(
                  (e) => e.totalSalary.total
                ),
            })
          );
          const monthlyData = earnedIncomeWithholdingDepartment[year];
          const { youth, manhood } = salary[year];
          const salaryFlag = Number(checked.some((e) => e === false));
          ret.total[1] += (youth + manhood) * salaryFlag;
          ret.youth[0] += youth * salaryFlag;
          ret.manhood[1] += manhood * salaryFlag;
          for (let month = 0; month < 12; month++) {
            const {
              salary: { youth, manhood },
            } = monthlyData[month];
            const flag = Number(!checked[month]);
            const youthVal = Number(youth !== 0) * flag;
            const manhoodVal = Number(manhood !== 0) * flag;

            ret.total[PADDING + month] += youthVal + manhoodVal;
            ret.youth[PADDING + month] += youthVal;
            ret.manhood[PADDING + month] += manhoodVal;
          }
        });
        return ret;
      },
  }),
});
