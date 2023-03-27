import type { YYYYMMDD } from "models/Employee";

import { getBirthCentury } from "lib/values";

const cache: {
  [RRN: string]: string;
} = {};

export const getBirth = (RRN: string): YYYYMMDD => {
  const year = getBirthCentury(RRN) + RRN.slice(0, 2);
  const month = RRN.slice(2, 4);
  const day = RRN.slice(4, 6);
  return `${year}.${month}.${day}`;
};

export const getId = (RRN: string) => {
  if (cache[RRN]) return cache[RRN];
  const id = crypto.randomUUID();
  cache[RRN] = id;
  return id;
};
