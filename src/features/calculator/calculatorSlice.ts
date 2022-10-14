import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CalculatorState = {
  type: string;
  code: string;
};
const initialState: CalculatorState = {
  type: "",
  code: "",
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
  },
});

export const { setType, setCode } = calculatorSlice.actions;

export default calculatorSlice.reducer;
