import { createSlice } from "@reduxjs/toolkit";
import { Person } from "./personAPI";

type PersonState = {
  person: Person;
};
const initialState: PersonState = {
  person: null!,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    makePerson: (state, action) => {
      state.person = new Person(action.payload);
    },
  },
});

export const { makePerson } = personSlice.actions;

export default personSlice.reducer;
