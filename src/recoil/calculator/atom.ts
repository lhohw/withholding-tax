import type { ResultProps } from "recoil/table";

import { atomFamily, selectorFamily } from "recoil";

import { corporatesState } from "recoil/corporates";
import { inputState } from "recoil/base";

import { getLastYears } from "lib/values";
import { getStatisticsData } from "lib/utils";

import { generationTypes } from "constants/value";

export type { ResultProps };
export const resultSumState = atomFamily<string[][], Omit<ResultProps, "year">>(
  {
    key: "ResultSumState",
    default: selectorFamily<string[][], Omit<ResultProps, "year">>({
      key: "ResultSumState/default",
      get:
        ({ RN }) =>
        ({ get }) => {
          const corporate = get(corporatesState)[RN];
          const last6Years = getLastYears(6);

          const ret = [["전체 (합)"], ["청년 (합)"], ["장년 (합)"]];
          last6Years.forEach((year) => {
            const data = corporate.getYealryTableResultGenerationSum(year);
            const monthCnt = get(inputState({ RN, year, stateKey: "month" }));
            const [, total, youth, manhood] = getStatisticsData(
              "",
              data,
              +monthCnt
            );
            ret[0].push(total);
            ret[1].push(youth);
            ret[2].push(manhood);
          });
          return ret;
        },
    }),
  }
);

export const resultDiffState = atomFamily<
  string[][],
  Omit<ResultProps, "year">
>({
  key: "ResultDiffState",
  default: selectorFamily<string[][], Omit<ResultProps, "year">>({
    key: "ResultDiffState/default",
    get:
      ({ RN }) =>
      ({ get }) => {
        const corporate = get(corporatesState)[RN];
        const last5Years = getLastYears(5);

        const ret = [["전체 (증감)"], ["청년 (증감)"], ["장년 (증감)"]];
        let prevData = corporate.getYealryTableResultGenerationSum(
          (+last5Years[0] - 1).toString()
        );
        last5Years.forEach((year) => {
          const data = corporate.getYealryTableResultGenerationSum(year);
          generationTypes.forEach((type) => data[type] - prevData[type]);
          prevData = data;
          const monthCnt = get(inputState({ RN, year, stateKey: "month" }));
          const [, total, youth, manhood] = getStatisticsData(
            "",
            data,
            +monthCnt
          );
          ret[0].push(total);
          ret[1].push(youth);
          ret[2].push(manhood);
        });
        return ret;
      },
  }),
});
