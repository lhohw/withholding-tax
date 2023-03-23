import type { StatisticsState } from "recoil/table";
import type { YearlyData } from "models/Employee";
import type { GenerationTypes } from "constants/value";

import { selector, selectorFamily } from "recoil";

import { accordianState, inputState } from "recoil/base";
import { statisticsState } from "recoil/table";

import { generationTypes } from "constants/value";

import { getLastYears } from "lib/values";
import { getSocialInsuranceRate } from "lib/utils";
import { industrialAccidentRate } from "constants/law";
import { UseCalculatorProps } from "hooks/useCalculator";

export const yearlyMonthState = selectorFamily<YearlyData<string>, number>({
  key: "YearlyMonthState",
  get:
    (count) =>
    ({ get }) => {
      const { selected: RN } = get(accordianState("corporate"));
      const lastYears = getLastYears(count);
      return lastYears.reduce<YearlyData<string>>(
        (acc, year) => ({
          ...acc,
          [year]: get(inputState({ RN, year, stateKey: "month" })),
        }),
        {}
      );
    },
});

export type SocialInsuranceTableStateData = YearlyData<
  Record<"totalSalary" | "totalGeneration", number>
>;
export type SocialInsuranceTableState = Record<
  "sum" | "variation",
  Record<GenerationTypes, SocialInsuranceTableStateData>
>;
export const socialInsuranceTableState = selector<SocialInsuranceTableState>({
  key: "SocialInsuranceTableState",
  get: ({ get }) => {
    const last6Years = getLastYears(6);
    const last5Years = getLastYears(5);
    const statistics = last6Years.reduce(
      (acc, year) => ({
        ...acc,
        [year]: get(statisticsState(year)),
      }),
      {} as YearlyData<StatisticsState>
    );

    return (["sum", "variation"] as const).reduce(
      (acc, type) => ({
        ...acc,
        [type]: generationTypes.reduce(
          (genAcc, generation) => ({
            ...genAcc,
            [generation]: (type === "sum" ? last6Years : last5Years).reduce(
              (yearAcc, year) => ({
                ...yearAcc,
                [year]: {
                  totalSalary: statistics[year][type][generation].totalSalary,
                  totalGeneration:
                    statistics[year][type][generation].totalGeneration,
                },
              }),
              {} as SocialInsuranceTableStateData
            ),
          }),
          {} as Record<GenerationTypes, SocialInsuranceTableStateData>
        ),
      }),
      {} as SocialInsuranceTableState
    );
  },
});

export const socialInsuranceRatesState = selectorFamily<
  YearlyData<number>,
  UseCalculatorProps
>({
  key: "SocialInsuranceRatesState",
  get:
    ({ RN }) =>
    ({ get }) => {
      const socialInsuranceCode = get(
        inputState({ stateKey: "socialInsuranceCode", RN })
      );
      const years = getLastYears(6);
      return years.reduce(
        (acc, year) => ({
          ...acc,
          [year]:
            year in industrialAccidentRate &&
            socialInsuranceCode &&
            socialInsuranceCode in industrialAccidentRate[year]
              ? getSocialInsuranceRate(year, socialInsuranceCode)
              : 0,
        }),
        {}
      );
    },
});
