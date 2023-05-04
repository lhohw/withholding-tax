import type { StatisticsState } from "recoil/table";
import type { YearlyData } from "models/Employee";
import type { EmploymentIncreaseTypes, GenerationTypes } from "constants/value";

import { selector, selectorFamily } from "recoil";

import { accordianState, inputState } from "recoil/base";
import { statisticsState } from "recoil/table";

import { generationTypes } from "constants/value";
import { CorporateSizes, employmentIncrease } from "constants/deduction";
import { industrialAccidentRate } from "constants/law";

import { getLastYears } from "lib/utils/values";
import { getSocialInsuranceRate, roundOff } from "lib/utils";

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

export type YearlyEmploymentIncreaseData = Record<
  EmploymentIncreaseTypes,
  Record<"youth" | "manhood", number>
>;
export type EmploymentIncreaseDataState = {
  data: YearlyData<YearlyEmploymentIncreaseData>;
  total: YearlyData<number>;
};
export type EmploymentIncreaseDataProps = {
  size: CorporateSizes;
  isCapital: string;
};
export const employmentIncreaseDataState = selectorFamily<
  EmploymentIncreaseDataState,
  EmploymentIncreaseDataProps
>({
  key: "EmploymentIncreaseDataState",
  get:
    ({ size, isCapital }) =>
    ({ get }) => {
      const last5Years = getLastYears(5);
      const months = get(yearlyMonthState(5));
      let consecutiveYouth = 0,
        consecutiveTotal = 0;

      const employmentIncreaseData: EmploymentIncreaseDataState["data"] = {};
      const totalData: EmploymentIncreaseDataState["total"] = {};
      last5Years.forEach((year, idx) => {
        const { variation } = get(statisticsState(year));
        const { youth, manhood, total } = Object.entries(variation).reduce(
          (acc, [gen, { totalGeneration }]) => ({
            ...acc,
            [gen]: roundOff(totalGeneration / +months[year]),
          }),
          {} as Record<GenerationTypes, number>
        );

        const isYouthDecrease = youth < 0,
          isTotalDecrease = total < 0;
        if (isYouthDecrease) consecutiveYouth = 0;
        else consecutiveYouth = Math.min(2, consecutiveYouth + 1);
        if (isTotalDecrease) consecutiveTotal = 0;
        else consecutiveTotal = Math.min(2, consecutiveTotal + 1);

        const capital = isCapital === "true" ? "capital" : "nonCapital";

        const amount =
          size === "small"
            ? employmentIncrease[year][size][capital]
            : employmentIncrease[year][size];

        const yearData = {
          thisYear: {
            youth:
              isYouthDecrease || isTotalDecrease
                ? 0
                : amount.youth * Math.min(youth, total),
            manhood: isTotalDecrease
              ? 0
              : Math.max(0, amount.manhood * Math.min(manhood, total)),
          },
          lastYear: {
            youth:
              isYouthDecrease ||
              isTotalDecrease ||
              idx === 0 ||
              +year - 1 < 2018
                ? 0
                : employmentIncreaseData[+year - 1].thisYear.youth,
            manhood:
              isTotalDecrease || idx === 0 || +year - 1 < 2018
                ? 0
                : employmentIncreaseData[+year - 1].thisYear.manhood,
          },
          last2Year: {
            youth:
              isYouthDecrease ||
              isTotalDecrease ||
              idx < 2 ||
              +year - 2 < 2018 ||
              consecutiveYouth < 2 ||
              consecutiveTotal < 2
                ? 0
                : employmentIncreaseData[+year - 2].thisYear.youth,
            manhood:
              isTotalDecrease ||
              idx < 2 ||
              +year - 2 < 2018 ||
              consecutiveTotal < 2
                ? 0
                : employmentIncreaseData[+year - 2].thisYear.manhood,
          },
          exPostFacto1: {
            youth: 0,
            manhood: 0,
          },
          exPostFacto2: {
            youth: 0,
            manhood: 0,
          },
        };

        employmentIncreaseData[year] = yearData;
        totalData[year] =
          yearData.thisYear.youth +
          yearData.thisYear.manhood +
          yearData.lastYear.youth +
          yearData.lastYear.manhood +
          yearData.last2Year.youth +
          yearData.last2Year.manhood;
      });
      return {
        data: employmentIncreaseData,
        total: totalData,
      };
    },
});
