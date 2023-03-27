import type { GenerationTypes } from "constants/value";

import { selectorFamily } from "recoil";
import { accordianState } from "recoil/base";
import { resultState } from "./atom";

import { getResultSum } from "lib/utils";

export type StatisticsState = Record<
  "sum" | "variation",
  Record<GenerationTypes, Record<"totalSalary" | "totalGeneration", number>>
>;
export const statisticsState = selectorFamily<StatisticsState, string>({
  key: "StatisticsState",
  get:
    (year) =>
    ({ get }) => {
      const RN = get(accordianState("corporate")).selected;
      const { total, youth, manhood } = get(resultState({ RN, year }));
      const {
        total: prevTotal,
        youth: prevYouth,
        manhood: prevManhood,
      } = get(resultState({ RN, year: (+year - 1).toString() }));
      return {
        sum: {
          total: calculate(total),
          youth: calculate(youth),
          manhood: calculate(manhood),
        },
        variation: {
          total: calculate(total, prevTotal),
          youth: calculate(youth, prevYouth),
          manhood: calculate(manhood, prevManhood),
        },
      };
    },
});

const calculate = (current: number[], prev?: number[]) => {
  const { totalSalary, totalGeneration } = getResultSum(current);
  const ret = { totalSalary, totalGeneration };
  if (prev) {
    const { totalSalary, totalGeneration } = getResultSum(prev);
    ret.totalSalary -= totalSalary;
    ret.totalGeneration -= totalGeneration;
  }
  return ret;
};
