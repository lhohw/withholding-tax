import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CorporateState } from "features/corporate/corporateSlice";
import { roundOff } from "lib/utils";

import { employmentIncrease } from "constants/deduction";

export type CalculatorState = {
  type: string;
  code: string;
  businessScale: string;
  isCapital?: boolean;
  data: {
    paymentSum: {
      [year: string]: Record<"youth" | "manhood", number>;
    };
    generationSum: {
      [year: string]: Record<"youth" | "manhood" | "total", number>;
    };
    variation: {
      [year: string]: Record<"youth" | "manhood" | "total", number>;
    };
    monthCnts: {
      [year: string]: number;
    };
  };
  employmentIncreaseData: {
    [year: string]: Record<
      "thisYear" | "lastYear" | "last2Year" | "exPostFacto1" | "exPostFacto2",
      Record<"youth" | "manhood", number>
    > & {
      total: number;
    };
  };
};
const initialState: CalculatorState = {
  type: "",
  code: "",
  businessScale: "",
  isCapital: undefined,
  data: {
    paymentSum: {},
    generationSum: {},
    variation: {},
    monthCnts: {},
  },
  employmentIncreaseData: {},
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setType: (state, action) => {
      const { payload: type } = action;
      if (state.type === type) state.type = "";
      else state.type = type;
    },
    setCode: (state, action: PayloadAction<string>) => {
      const { payload: code } = action;
      state.code = code;
    },
    setBusinessScale: (state, action: PayloadAction<string>) => {
      const { payload: scale } = action;
      if (state.businessScale === scale) state.businessScale = "";
      else state.businessScale = scale;
    },
    setIsCapital: (state, action: PayloadAction<boolean | undefined>) => {
      const { payload: isCapital } = action;
      if (state.isCapital === isCapital) state.isCapital = undefined;
      else state.isCapital = isCapital;
    },
    setData: (
      state,
      action: PayloadAction<{
        last6Years: string[];
        data: CorporateState[string]["data"];
      }>
    ) => {
      const { last6Years, data } = action.payload;
      last6Years.forEach((year, idx) => {
        state.data.paymentSum[year] = data[year].total.salary;
        state.data.generationSum[year] = data[year].total.sum;
        state.data.monthCnts[year] = data[year].monthCnt;
        if (idx >= 1) {
          state.data.variation[year] = {
            total: data[year].total.sum.total - data[+year - 1].total.sum.total,
            youth: data[year].total.sum.youth - data[+year - 1].total.sum.youth,
            manhood:
              data[year].total.sum.manhood - data[+year - 1].total.sum.manhood,
          };
        }
      });
    },
    setEmploymentIncreaseData: (
      state,
      action: PayloadAction<{ last5Years: string[] }>
    ) => {
      const { last5Years } = action.payload;
      const {
        data: { variation, monthCnts },
        isCapital,
        businessScale,
      } = state;

      let consecutiveYouth = 0,
        consecutiveTotal = 0;
      last5Years.forEach((year, idx) => {
        const { youth, manhood, total } = Object.entries(
          variation[year]
        ).reduce(
          (obj, [key, value]) => ({
            ...obj,
            [key]: roundOff(value / monthCnts[year]),
          }),
          {} as Record<"youth" | "manhood" | "total", number>
        );

        const isYouthDecrease = youth < 0,
          isTotalDecrease = total < 0;
        if (isYouthDecrease) consecutiveYouth = 0;
        else consecutiveYouth = Math.min(2, consecutiveYouth + 1);
        if (isTotalDecrease) consecutiveTotal = 0;
        else consecutiveTotal = Math.min(2, consecutiveTotal + 1);

        const scale =
          businessScale === "중소"
            ? "small"
            : businessScale === "중견"
            ? "medium"
            : "large";
        const capital = isCapital ? "capital" : "nonCapital";

        const amount =
          scale === "small"
            ? employmentIncrease[year][scale][capital]
            : employmentIncrease[year][scale];

        const yearData: CalculatorState["employmentIncreaseData"][string] = {
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
                : state.employmentIncreaseData[+year - 1].thisYear.youth,
            manhood:
              isTotalDecrease || idx === 0 || +year - 1 < 2018
                ? 0
                : state.employmentIncreaseData[+year - 1].thisYear.manhood,
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
                : state.employmentIncreaseData[+year - 2].thisYear.youth,
            manhood:
              isTotalDecrease ||
              idx < 2 ||
              +year - 2 < 2018 ||
              consecutiveTotal < 2
                ? 0
                : state.employmentIncreaseData[+year - 2].thisYear.manhood,
          },
          exPostFacto1: {
            youth: 0,
            manhood: 0,
          },
          exPostFacto2: {
            youth: 0,
            manhood: 0,
          },
          total: 0,
        };

        yearData.total =
          yearData.thisYear.youth +
          yearData.thisYear.manhood +
          yearData.lastYear.youth +
          yearData.lastYear.manhood +
          yearData.last2Year.youth +
          yearData.last2Year.manhood;
        state.employmentIncreaseData[year] = yearData;
      });
    },
  },
});

export const {
  setType,
  setCode,
  setBusinessScale,
  setIsCapital,
  setData,
  setEmploymentIncreaseData,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
