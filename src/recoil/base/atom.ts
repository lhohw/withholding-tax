import { atomFamily } from "recoil";

export const toggleState = atomFamily({
  key: "ToggleState",
  default: false,
});

export type AccordianState = {
  idx: number;
  selected: string;
};
export const accordianState = atomFamily<AccordianState, string>({
  key: "AccordianState",
  default: {
    idx: -1,
    selected: null!,
  },
});
