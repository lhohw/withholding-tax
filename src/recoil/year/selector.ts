import { selector } from "recoil";
import { selectedYearIndexState, yearsState } from "./atom";

export const selectedYearState = selector({
  key: "SelectedYearState",
  get: ({ get }) => {
    const idx = get(selectedYearIndexState);
    if (idx === -1) return null;
    return get(yearsState)[idx];
  },
});
