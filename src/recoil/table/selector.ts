import type { GenerationTypes } from "constants/value";

import { selector } from "recoil";
import { accordianState } from "recoil/base";
import { resultState } from "./atom";

import { getGenerationSum } from "lib/utils";

export type StatisticsState = {
  sum: Record<GenerationTypes, number>;
  diff: Record<GenerationTypes, number>;
};
export const statisticsState = selector<StatisticsState>({
  key: "StatisticsState",
  get: ({ get }) => {
    const RN = get(accordianState("corporate")).selected;
    const year = get(accordianState("year")).selected;
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
      diff: {
        total: calculate(total, prevTotal),
        youth: calculate(youth, prevYouth),
        manhood: calculate(manhood, prevManhood),
      },
    };
  },
});

const calculate = (current: number[], prev?: number[]) =>
  getGenerationSum(current) - (prev ? getGenerationSum(prev) : 0);
