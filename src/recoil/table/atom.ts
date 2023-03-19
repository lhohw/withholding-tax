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

export type ResultState = {
  total: number[];
  youth: number[];
  manhood: number[];
};
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
        const { employees } = get(corporatesState)[RN];
        const ret = {
          total: new Array(14).fill(0),
          youth: new Array(14).fill(0),
          manhood: new Array(14).fill(0),
        };
        const PADDING = 2;
        for (const {
          salary,
          earnedIncomeWithholdingDepartment,
        } of Object.values(employees)) {
          const { youth, manhood } = salary[year];
          const monthlyData = earnedIncomeWithholdingDepartment[year];
          ret.total[1] += youth + manhood;
          for (let month = 0; month < 12; month++) {
            const {
              salary: { youth, manhood },
            } = monthlyData[month];
            const youthVal = Number(youth !== 0);
            const manhoodVal = Number(manhood !== 0);
            ret.total[PADDING + month] += youthVal + manhoodVal;
            ret.youth[PADDING + month] += youthVal;
            ret.youth[0] += youth;
            ret.manhood[PADDING + month] += manhoodVal;
            ret.manhood[1] += manhood;
          }
        }
        return ret;
      },
  }),
});
