import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "features/person/personAPI";

export type CorporateState = {
  list: {
    [key: string]: {
      name: string;
      personnel: {
        [key: string]: Person;
      };
    };
  };
  selected?: string;
};

const initialState: CorporateState = {
  list: {},
};

export const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {
    setPersonnel: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    mergePerson: (
      state,
      action: PayloadAction<{ year: number; data: string }>
    ) => {
      const { year, data } = action.payload;
      const person: Person = JSON.parse(data);
      const {
        corporate: { RN },
        id,
        earnedIncomeWithholdingDepartment: ei,
        generation,
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
        p.generation[year] = generation[year];
      }
    },
  },
});

export const { setPersonnel, mergePerson } = corporateSlice.actions;

export default corporateSlice.reducer;
