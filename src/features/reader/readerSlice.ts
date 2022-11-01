import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "features/person/personAPI";

import { readPDF } from "./readerAPI";

import { yearRegex } from "constants/regex";

import type { KnownError } from "app/store";

export type ReaderState = {
  list: {
    [key: string]: {
      name: string;
      address: string;
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
    return thunkApi.rejectWithValue({ code: 500, errorMessage: "message" });
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
        const person: Person = JSON.parse(personStr);
        const {
          id,
          RRN,
          corporate,
          earnedIncomeWithholdingDepartment: ei,
          date,
          birth,
          payment,
        } = person;
        const { RN } = corporate;
        const exist =
          state.list[RN] &&
          Object.entries(state.list[RN].personnel).find(
            ([_, person]) => person.RRN === RRN
          );
        if (!state.list[RN]) {
          state.list[RN] = {
            name: person.corporate.name,
            address: person.corporate.address,
            personnel: {
              [id]: person,
            },
          };
        } else if (!exist) {
          if (!state.list[RN].address)
            state.list[RN].address = person.corporate.address;
          if (!state.list[RN].name) state.list[RN].name = person.corporate.name;
          state.list[RN].personnel[id] = person;
        } else {
          const p = state.list[RN].personnel[exist[0]];
          p.earnedIncomeWithholdingDepartment[year] = ei[year];
          p.payment[year] = payment[year];
          p.date[year] = date[year];
          if (!p.birth && birth) p.birth = birth;
        }
      }
    });
  },
});

export const { select } = readerSlice.actions;

export default readerSlice.reducer;
