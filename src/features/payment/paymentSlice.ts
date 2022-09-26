import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, YYYYMMDD } from "features/person/personAPI";

import { getLastYears } from "lib/utils";

export type PaymentState = {
  name: string;
  personnel: {
    [id: string]: {
      name: Person["name"];
      selected: boolean;
      date: Person["date"];
      generation: Person["generation"];
    };
  };
  total: Person["generation"];
};
const initialState: PaymentState = {
  name: "",
  personnel: {},
  total: {},
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (
      state,
      action: PayloadAction<{
        name: string;
        personnel: {
          [key: string]: Person;
        };
      }>
    ) => {
      const { name, personnel } = action.payload;
      state.name = name;
      const last6Years = getLastYears(6);
      const defaultGeneration: Person["generation"] = {};

      last6Years.forEach((year) => {
        state.total[year] = { youth: 0, manhood: 0 };
        defaultGeneration[year] = { youth: 0, manhood: 0 };
      });
      Object.entries(personnel).forEach(([key, person]) => {
        state.personnel[key] = {
          name: person.name,
          selected: false,
          date: {
            start: person.date.start.slice(2) as YYYYMMDD,
            retirement: person.date.retirement.slice(2) as YYYYMMDD,
            birth: person.date.birth,
          },
          generation: { ...defaultGeneration, ...person.generation },
        };
        Object.entries(person.generation).forEach(([year, gen]) => {
          const { youth, manhood } = gen;
          state.total[year].youth += youth;
          state.total[year].manhood += manhood;
        });
      });
    },
  },
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
