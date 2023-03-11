import { getLastYears } from "lib/values";
import { atom } from "recoil";

export const selectedYearIndexState = atom({
  key: "SelectedYearIndexState",
  default: -1,
});

export const yearsState = atom({
  key: "YearsState",
  default: getLastYears(6),
});
