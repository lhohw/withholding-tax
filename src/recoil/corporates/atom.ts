import { atom } from "recoil";

import Corporate from "models/Corporate";

export type Corporates = {
  [RN: string]: Corporate;
};
export const corporatesState = atom<Corporates>({
  key: "CorporatesState",
  default: {},
});
