import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "features/person/personAPI";

import { getLastYears } from "lib/utils";

export type GenerationState = {
  generation: {
    [id: string]: {
      [year: string]: ("청년" | "장년" | "-")[];
    };
  };
  total: {
    [year: string]: Record<"total" | "youth" | "manhood", number[]>;
  };
};

const initialState: GenerationState = {
  generation: {},
  total: {},
};

export const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    check: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
      const { id, checked } = action.payload;
      const flag = checked ? 1 : -1;
      Object.entries(state.generation[id]).forEach(([year, data]) => {
        data.forEach((key, idx) => {
          const k = key === "청년" ? "youth" : key === "장년" ? "manhood" : "-";
          if (k === "-") return;
          state.total[year]["total"][idx] += flag;
          state.total[year][k][idx] += flag;
        });
      });
    },
    setGeneration: (
      state,
      action: PayloadAction<GenerationState["generation"]>
    ) => {
      const defaultGeneration = new Array(12).fill("-");
      const last5Years = getLastYears(5);
      last5Years.forEach(
        (year) =>
          (state.total[year] = {
            youth: new Array(12).fill(0),
            manhood: new Array(12).fill(0),
            total: new Array(12).fill(0),
          })
      );
      const { payload: generation } = action;
      Object.entries(generation).forEach(([id, gen]) => {
        state.generation[id] = {};
        last5Years.forEach((year) => {
          if (gen[year]) {
            state.generation[id][year] = gen[year];
            gen[year].forEach((value, idx) => {
              if (value === "-") return;
              state.total[year].total[idx]++;
              state.total[year][value === "청년" ? "youth" : "manhood"][idx]++;
            });
          } else state.generation[id][year] = defaultGeneration;
        });
      });
    },
  },
});

export const { check, setGeneration } = generationSlice.actions;

export default generationSlice.reducer;
