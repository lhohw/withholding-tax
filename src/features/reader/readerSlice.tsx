import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "features/person/personAPI";

import { readPDF } from "./readerAPI";

import { yearRegex } from "constants/regex";

import type { KnownError } from "app/store";

export type ReaderState = {
  list: {
    [key: string]: {
      name: string;
      personnel: {
        [key: string]: Person;
      };
    };
  };
  selected: Record<"year" | "corporate", string>;
};

const initialState: ReaderState = {
  list: {},
  selected: {
    year: "",
    corporate: "",
  },
};

export const readAsync = createAsyncThunk<
  { data: { year: string; personStr: string }[] },
  string,
  {
    rejectValue: KnownError;
  }
>("reader/read", async (data, thunkApi) => {
  try {
    const withholdingTaxData = await readPDF(data);
    const { datas, isTaxLove } = withholdingTaxData;
    let response = [];
    for (const { data, left } of datas) {
      const year = data[0][0].replace(yearRegex, "");
      const personStr = JSON.stringify(new Person({ data, left, isTaxLove }));
      response.push({ year, personStr });
    }
    return { data: response };
  } catch (e: any) {
    console.log(e);
    return thunkApi.rejectWithValue({ code: 1, errorMessage: "message" });
  }
});

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    select: (
      state,
      action: PayloadAction<{ type: "year" | "corporate"; data: string }>
    ) => {
      const { type, data } = action.payload;
      if (type === "year" && state.selected.year === data) {
        state.selected.year = "";
        return;
      }
      if (type === "corporate" && state.selected.corporate === data) {
        state.selected = initialState.selected;
        return;
      }
      state.selected[type] = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readAsync.fulfilled, (state, action) => {
      for (const { year, personStr } of action.payload.data) {
        const person = JSON.parse(personStr);
        const {
          corporate: { RN },
          id,
          date: { start, retirement, birth },
          earnedIncomeWithholdingDepartment: ei,
          payment,
        } = person;
        if (!state.list[RN]) {
          state.list[RN] = {
            name: person.corporate.name,
            personnel: {
              [id]: person,
            },
          };
        } else if (!state.list[RN].personnel[id]) {
          state.list[RN].personnel[id] = person;
        } else {
          const p = state.list[RN].personnel[id];
          p.earnedIncomeWithholdingDepartment[year] = ei[year];
          p.payment[year] = payment[year];
          if (!p.date.start && start) p.date.start = start;
          if (!p.date.retirement && retirement) p.date.retirement = retirement;
          if (!p.date.birth && birth) p.date.birth = birth;
        }
      }
    });
  },
});

export const { select } = readerSlice.actions;

export default readerSlice.reducer;
