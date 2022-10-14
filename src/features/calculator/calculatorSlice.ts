import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CorporateState } from "features/corporate/corporateSlice";

export type CalculatorState = {
  type: string;
  code: string;
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
};
const initialState: CalculatorState = {
  type: "",
  code: "",
  data: {
    paymentSum: {},
    generationSum: {},
    variation: {},
    monthCnts: {},
  },
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
    setData: (
      state,
      action: PayloadAction<{
        last6Years: string[];
        data: CorporateState[string]["data"];
      }>
    ) => {
      const { last6Years, data } = action.payload;
      last6Years.forEach((year, idx) => {
        state.data.paymentSum[year] = data[year].total.payment;
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
  },
});

export const { setType, setCode, setData } = calculatorSlice.actions;

export default calculatorSlice.reducer;
