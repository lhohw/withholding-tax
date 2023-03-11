import Corporate from "models/Corporate";

import { selector } from "recoil";
import { corporatesState, selectedCorporateIndexState } from "./atom";

export const corporateNamesState = selector<Corporate["name"][]>({
  key: "CorporateNamesState",
  get: ({ get }) => {
    return Object.values(get(corporatesState)).map((e) => e.name);
  },
});

export const selectedCorporateState = selector<Corporate>({
  key: "SelectedCorporateState",
  get: ({ get }) => {
    const idx = get(selectedCorporateIndexState);
    if (idx === -1) return null!;
    return Object.values(get(corporatesState))[idx];
  },
});
