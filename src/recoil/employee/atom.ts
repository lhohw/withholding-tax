import { atomFamily } from "recoil";

import Employee from "models/Employee";

import { getWorkingDays } from "lib/utils";

export const employeeCheckedState = atomFamily({
  key: "EmployeeCheckedState",
  default: new Array(12).fill(false),
});

export type WorkingDaysStateProps = {
  date: Employee["date"];
  year: string;
};
export const workingDaysState = atomFamily<number, WorkingDaysStateProps>({
  key: "WorkingDaysState",
  default: ({ date, year }) => {
    if (!date[year]?.start) return 0;
    if (!date[year]?.resign) return Infinity;
    return getWorkingDays(date[year].start, date[year].resign);
  },
});
