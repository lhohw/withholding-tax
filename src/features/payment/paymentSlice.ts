import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "features/person/personAPI";

import { getLastYears } from "lib/utils";

export type PaymentState = {
  payment: {
    [id: string]: Person["payment"];
  };
  total: Person["payment"];
};
const initialState: PaymentState = {
  payment: {},
  total: {},
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    check: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
      const { id, checked } = action.payload;
      const flag = checked ? 1 : -1;
      getLastYears(6).forEach((year) => {
        state.total[year].youth += state.payment[id][year].youth * flag;
        state.total[year].manhood += state.payment[id][year].manhood * flag;
      });
    },
    setPayment: (state, action: PayloadAction<PaymentState["payment"]>) => {
      const { payload: payment } = action;
      const last6Years = getLastYears(6);
      const defaultPayment: Person["payment"] = {};

      last6Years.forEach((year) => {
        state.total[year] = { youth: 0, manhood: 0 };
        defaultPayment[year] = { youth: 0, manhood: 0 };
      });
      Object.entries(payment).forEach(([key, p]) => {
        state.payment[key] = { ...defaultPayment, ...p };
        last6Years.forEach((year) => {
          state.total[year].youth += state.payment[key][year].youth;
          state.total[year].manhood += state.payment[key][year].manhood;
        });
      });
    },
  },
});

export const { check, setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
