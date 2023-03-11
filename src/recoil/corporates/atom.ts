import Corporate from "models/Corporate";
import { atom } from "recoil";

export type Corporates = {
  [RN: string]: Corporate;
};
export const corporatesState = atom<Corporates>({
  key: "CorporatesState",
  default: {},
});

export const selectedCorporateIndexState = atom<number>({
  key: "SelectedCorporateIndexState",
  default: -1,
});
