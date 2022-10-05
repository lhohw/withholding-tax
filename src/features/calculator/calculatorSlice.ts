import { createSlice } from "@reduxjs/toolkit";

export type CalculatorState = {
  code: string;
};
const initialState: CalculatorState = {
  code: "",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setCode: (state, action) => {
      const { payload: code } = action;
      state.code = code;
    },
  },
});

export const { setCode } = calculatorSlice.actions;

export default calculatorSlice.reducer;
