import Corporate from "models/Corporate";

import { selector } from "recoil";
import { corporatesState } from "./atom";

export const corporateNamesState = selector<Corporate["name"][]>({
  key: "CorporateNamesState",
  get: ({ get }) => {
    return Object.values(get(corporatesState)).map((e) => e.name);
  },
});
