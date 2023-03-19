import type { YYYYMMDD, Salary } from "models/Employee";
import type Corporate from "models/Corporate";
import type Employee from "models/Employee";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDefaultGeneration,
  getDefaultPayment,
  getLastYears,
} from "lib/values";
import {
  getWorkingDays,
  isRetired,
  lessThan28Days,
  getDays,
  isYouth,
  dateToNumber,
} from "lib/utils";

export type Generation = "청년" | "장년" | "-" | "퇴사";
export type CorporateState = {
  [RN: string]: {
    name: string;
    address: string;
    data: {
      [year: string]: {
        employees: {
          [id: string]: {
            info: {
              checked: boolean[];
              name: Employee["name"];
              birth: Employee["birth"];
              date: Employee["date"][string];
              workingDays?: number;
            };
            salary: Salary;
            generation: Generation[];
          };
        };
        total: {
          salary: Salary;
          generation: {
            youth: number[];
            manhood: number[];
            total: number[];
          };
          sum: {
            youth: number;
            manhood: number;
            total: number;
          };
        };
        monthCnt: number;
      };
    };
  };
};

const initialState: CorporateState = {};

export const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {
    setPersonnel: (
      state,
      action: PayloadAction<{
        data: Corporate;
        RN: string;
      }>
    ) => {
      const years = getLastYears(6);

      const {
        data: { name, employees, address },
        RN,
      } = action.payload;
      if (!state[RN])
        state[RN] = {
          name,
          address,
          data: {},
        };
      const corporate = state[RN];
      years.forEach((year) => {
        const yearData: CorporateState[string]["data"][string] = {
          total: {
            salary: { youth: 0, manhood: 0 },
            generation: {
              youth: getDefaultGeneration(),
              manhood: getDefaultGeneration(),
              total: getDefaultGeneration(),
            },
            sum: {
              youth: 0,
              manhood: 0,
              total: 0,
            },
          },
          employees: {},
          monthCnt: corporate.data[year]?.monthCnt || 12,
        };
        const { total, employees: p } = yearData;
        Object.entries(employees).forEach(([id, person]) => {
          const existPerson = corporate.data[year]?.employees[id];
          const {
            name,
            date,
            earnedIncomeWithholdingDepartment: ei,
            birth,
          } = person;
          if (existPerson && !ei[year]) {
            p[id] = existPerson;
          } else {
            p[id] = {} as typeof yearData.employees[string];
            p[id].info = {
              checked: existPerson?.info.checked || new Array(12).fill(false),
              name,
              birth,
              date: {
                start: (date[year]?.start.slice(2) as YYYYMMDD) || "",
                resign: (date[year]?.resign.slice(2) as YYYYMMDD) || "",
              },
            };
            p[id].salary = getDefaultPayment();
            p[id].generation = new Array(12).fill("-");
          }
          if (ei[year]) {
            ei[year].slice(0, 12).forEach(({ salary }, idx) => {
              const flag: Generation = salary.youth
                ? "청년"
                : salary.manhood
                ? "장년"
                : "-";

              // 급여 없음
              if (flag === "-") {
                const monthsLastDay = `${year}.${(idx + 1)
                  .toString()
                  .padStart(2, "0")}.${getDays(+year, idx)}`;
                if (
                  date[year]?.start &&
                  Date.parse(date[year].start) <= Date.parse(monthsLastDay) &&
                  (!date[year].resign ||
                    (Date.parse(monthsLastDay) <=
                      Date.parse(date[year].resign) &&
                      !isRetired(date[year].resign, year, idx + 1)))
                ) {
                  const flag2 = isYouth(
                    person.birth,
                    dateToNumber(
                      `${year}/${(idx + 1).toString().padStart(2, "0")}`
                    )
                  )
                    ? "청년"
                    : "장년";
                  p[id].info.checked[idx] =
                    existPerson?.info && existPerson.generation[idx] === flag2
                      ? existPerson.info.checked[idx]
                      : true;
                  const checked = p[id].info.checked[idx];
                  total.generation.total[idx] += checked ? 0 : 1;
                  if (flag2 === "청년") {
                    total.generation["youth"][idx] += checked ? 0 : 1;
                    total.sum.total += checked ? 0 : 1;
                    total.sum.youth += checked ? 0 : 1;
                  } else {
                    total.generation["manhood"][idx] += checked ? 0 : 1;
                    total.sum.total += checked ? 0 : 1;
                    total.sum.manhood += checked ? 0 : 1;
                  }
                  p[id].generation[idx] = flag2;
                } else if (
                  date[year]?.resign &&
                  isRetired(date[year].resign, year, idx + 1)
                ) {
                  p[id].generation[idx] = "퇴사";
                }
                return;
              }
              // 퇴사일 확인
              if (date[year]?.resign.trim()) {
                if (lessThan28Days(date[year]?.start, date[year]?.resign))
                  return;
                // if (lessThanAMonth(date))
                if (getWorkingDays(date[year]?.start, date[year]?.resign) <= 31)
                  p[id].info.workingDays = getWorkingDays(
                    date[year]?.start,
                    date[year]?.resign
                  );
                if (isRetired(date[year]?.resign, year, idx + 1)) {
                  p[id].salary.youth += salary.youth;
                  p[id].salary.manhood += salary.manhood;
                  const checked = p[id].info.checked[idx];
                  total.salary.youth += checked ? 0 : salary.youth;
                  total.salary.manhood += checked ? 0 : salary.manhood;
                  p[id].generation[idx] = "퇴사";
                  return;
                }
              }
              const checked = p[id].info.checked[idx];
              p[id].salary.youth += salary.youth;
              p[id].salary.manhood += salary.manhood;
              total.generation.total[idx] += checked ? 0 : 1;
              total.salary.youth += checked ? 0 : salary.youth;
              total.salary.manhood += checked ? 0 : salary.manhood;
              if (flag === "청년") {
                total.generation["youth"][idx] += checked ? 0 : 1;
                total.sum.total += checked ? 0 : 1;
                total.sum.youth += checked ? 0 : 1;
              } else {
                total.generation["manhood"][idx] += checked ? 0 : 1;
                total.sum.total += checked ? 0 : 1;
                total.sum.manhood += checked ? 0 : 1;
              }

              p[id].generation[idx] = flag;
            });
          }
        });
        corporate.data[year] = yearData;
      });
    },
    toggle: (
      state,
      action: PayloadAction<{ id: string; year: string; RN: string }>
    ) => {
      const { id, year, RN } = action.payload;
      const { data } = state[RN];
      if (!year) throw new Error("year to toggle not defined");

      const { total, employees } = data[year];
      const person = employees[id];
      const notChecked: number[] = [];
      person.info.checked.forEach((checked, idx) => {
        if (!checked) notChecked.push(idx);
      });
      if (notChecked.length) {
        for (const idx of notChecked) {
          person.info.checked[idx] = true;
          const flag = -1;
          const f = person.generation[idx];
          if (!(f === "장년" || f === "청년")) continue;
          total.generation.total[idx] += flag;
          total.sum.total += flag;
          if (f === "청년") {
            total.generation.youth[idx] += flag;
            total.sum.youth += flag;
          } else {
            total.generation.manhood[idx] += flag;
            total.sum.manhood += flag;
          }
        }
        total.salary.youth -= person.salary.youth;
        total.salary.manhood -= person.salary.manhood;
      } else {
        for (let idx = 0; idx < 12; idx++) {
          person.info.checked[idx] = false;
          const flag = 1;
          const f = person.generation[idx];
          if (!(f === "장년" || f === "청년")) continue;
          total.generation.total[idx] += flag;
          total.sum.total += flag;
          if (f === "청년") {
            total.generation.youth[idx] += flag;
            total.sum.youth += flag;
          } else {
            total.generation.manhood[idx] += flag;
            total.sum.manhood += flag;
          }
        }
        total.salary.youth += person.salary.youth;
        total.salary.manhood += person.salary.manhood;
      }
    },
    setMonthCnt: (
      state,
      action: PayloadAction<{ year: string; monthCnt: number; RN: string }>
    ) => {
      const { monthCnt, year, RN } = action.payload;
      state[RN].data[year].monthCnt = monthCnt;
    },
    toggleItem: (
      state,
      action: PayloadAction<{
        id: string;
        RN: string;
        year: string;
        idx: number;
        content: Generation; // "청년" | "장년" | "-" | "퇴사";
      }>
    ) => {
      const { id, RN, year, idx, content } = action.payload;
      const yearData = state[RN].data[year];
      const person = state[RN].data[year].employees[id];
      const isAllChecked =
        person.info.checked.findIndex((e) => e === false) === -1;

      const nextChecked = !person.info.checked[idx];
      person.info.checked[idx] = nextChecked;
      if (content === "-" || content === "퇴사") return;
      const flag = nextChecked ? -1 : 1;
      if (content === "청년") {
        yearData.total.generation.youth[idx] += flag;
        yearData.total.sum.youth += flag;
      } else {
        yearData.total.generation.manhood[idx] += flag;
        yearData.total.sum.manhood += flag;
      }
      yearData.total.generation.total[idx] += flag;
      yearData.total.sum.total += flag;
      if (isAllChecked) {
        yearData.total.salary.youth += person.salary.youth;
        yearData.total.salary.manhood += person.salary.manhood;
      } else if (person.info.checked.findIndex((e) => e === false) === -1) {
        yearData.total.salary.youth -= person.salary.youth;
        yearData.total.salary.manhood -= person.salary.manhood;
      }
    },
  },
});

export const { setPersonnel, toggle, setMonthCnt, toggleItem } =
  corporateSlice.actions;

export default corporateSlice.reducer;
