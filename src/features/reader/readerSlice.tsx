import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReaderState = {
  selected: number;
  corporates: string[];
};

const initialState: ReaderState = {
  selected: -1,
  corporates: [],
};

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setPersonnel: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
});

export const { setPersonnel } = readerSlice.actions;

export default readerSlice.reducer;
