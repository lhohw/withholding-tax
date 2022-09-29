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
    let response = [];
    for (const { data, left } of withholdingTaxData) {
      const year = data[0][0].replace(yearRegex, "");
      const personStr = JSON.stringify(new Person({ data, left }));
      response.push({ year, personStr });
    }
    return { data: response };
  } catch (e: any) {
    const {
      response: { status: code },
      message,
    } = e;
    console.log(e);
    return thunkApi.rejectWithValue({ code, errorMessage: message });
  }
});

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readAsync.fulfilled, (state, action) => {
      for (const { year, personStr } of action.payload.data) {
        const person = JSON.parse(personStr);
        const {
          corporate: { RN },
          id,
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
        }
      }
    });
  },
});

export const {} = readerSlice.actions;

export default readerSlice.reducer;
