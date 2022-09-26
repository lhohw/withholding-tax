import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReaderState = {
  selected: number;
};

const initialState: ReaderState = {
  selected: -1,
};

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {},
});

export const {} = readerSlice.actions;

export default readerSlice.reducer;
