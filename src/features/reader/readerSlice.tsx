import { createSlice } from "@reduxjs/toolkit";

export type ReaderState = {};

const initialState: ReaderState = {};

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {},
});

export const {} = readerSlice.actions;

export default readerSlice.reducer;
