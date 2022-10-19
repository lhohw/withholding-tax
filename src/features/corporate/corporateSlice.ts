import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonPayment, YYYYMMDD, Person } from "features/person/personAPI";
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
} from "lib/utils";

import type { ReaderState } from "features/reader/readerSlice";

export type CorporateState = {
  [RN: string]: {
    name: string;
    address: string;
    data: {
      [year: string]: {
        personnel: {
          [id: string]: {
            info: {
              checked: boolean[];
              name: Person["name"];
              birth: Person["birth"];
              date: Person["date"][string];
              workingDays?: number;
            };
            payment: PersonPayment[string];
            generation: ("청년" | "장년" | "-")[];
          };
        };
        total: {
          payment: PersonPayment[string];
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
        data: {
          name: string;
          address: string;
          personnel: ReaderState["list"][string]["personnel"];
        };
        RN: string;
      }>
    ) => {
      const years = getLastYears(6);

      const {
        data: { name, personnel, address },
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
            payment: { youth: 0, manhood: 0 },
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
          personnel: {},
          monthCnt: corporate.data[year]?.monthCnt || 12,
        };
        const { total, personnel: p } = yearData;
        Object.entries(personnel).forEach(([id, person]) => {
          const existPerson = corporate.data[year]?.personnel[id];
          const {
            name,
            date,
            earnedIncomeWithholdingDepartment: ei,
            birth,
          } = person;
          if (existPerson && !ei[year]) {
            p[id] = existPerson;
          } else {
            p[id] = {} as typeof yearData.personnel[string];
            p[id].info = {
              checked: existPerson?.info.checked || new Array(12).fill(false),
              name,
              birth,
              date: {
                start: (date[year]?.start.slice(2) as YYYYMMDD) || "",
                retirement: (date[year]?.retirement.slice(2) as YYYYMMDD) || "",
              },
            };
            p[id].payment = getDefaultPayment();
            p[id].generation = new Array(12).fill("-");
          }
          if (ei[year]) {
            ei[year].slice(0, 12).forEach(({ payment }, idx) => {
              const flag = payment.youth
                ? "청년"
                : payment.manhood
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
                  (!date[year].retirement ||
                    (Date.parse(monthsLastDay) <=
                      Date.parse(date[year].retirement) &&
                      !isRetired(date[year].retirement, year, idx + 1)))
                ) {
                  const flag2 = isYouth(
                    person.RRN,
                    `${year}/${(idx + 1).toString().padStart(2, "0")}` as any
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
                  date[year]?.retirement &&
                  isRetired(date[year].retirement, year, idx + 1)
                ) {
                  p[id].generation[idx] = "퇴사" as any;
                }
                return;
              }
              // 퇴사일 확인
              if (date[year]?.retirement.trim()) {
                if (lessThan28Days(date[year]?.start, date[year]?.retirement))
                  return;
                // if (lessThanAMonth(date))
                if (
                  getWorkingDays(date[year]?.start, date[year]?.retirement) <=
                  31
                )
                  p[id].info.workingDays = getWorkingDays(
                    date[year]?.start,
                    date[year]?.retirement
                  );
                if (isRetired(date[year]?.retirement, year, idx + 1)) {
                  p[id].payment.youth += payment.youth;
                  p[id].payment.manhood += payment.manhood;
                  const checked = p[id].info.checked[idx];
                  total.payment.youth += checked ? 0 : payment.youth;
                  total.payment.manhood += checked ? 0 : payment.manhood;
                  p[id].generation[idx] = "퇴사" as any;
                  return;
                }
              }
              const checked = p[id].info.checked[idx];
              p[id].payment.youth += payment.youth;
              p[id].payment.manhood += payment.manhood;
              total.generation.total[idx] += checked ? 0 : 1;
              total.payment.youth += checked ? 0 : payment.youth;
              total.payment.manhood += checked ? 0 : payment.manhood;
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

      const { total, personnel } = data[year];
      const person = personnel[id];
      const notChecked: number[] = [];
      person.info.checked.forEach((checked, idx) => {
        if (!checked) notChecked.push(idx);
      });
      if (notChecked.length) {
        for (const idx of notChecked) {
          person.info.checked[idx] = true;
          const flag = -1;
          const f = person.generation[idx];
          // @ts-ignore
          if (f === "-" || f === "퇴사") continue;
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
        total.payment.youth -= person.payment.youth;
        total.payment.manhood -= person.payment.manhood;
      } else {
        for (let idx = 0; idx < 12; idx++) {
          person.info.checked[idx] = false;
          const flag = 1;
          const f = person.generation[idx];
          // @ts-ignore
          if (f === "-" || f === "퇴사") continue;
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
        total.payment.youth += person.payment.youth;
        total.payment.manhood += person.payment.manhood;
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
        content: "청년" | "장년" | "-" | "퇴사";
      }>
    ) => {
      const { id, RN, year, idx, content } = action.payload;
      const yearData = state[RN].data[year];
      const person = state[RN].data[year].personnel[id];
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
        yearData.total.payment.youth += person.payment.youth;
        yearData.total.payment.manhood += person.payment.manhood;
      } else if (person.info.checked.findIndex((e) => e === false) === -1) {
        yearData.total.payment.youth -= person.payment.youth;
        yearData.total.payment.manhood -= person.payment.manhood;
      }
    },
  },
});

export const { setPersonnel, toggle, setMonthCnt, toggleItem } =
  corporateSlice.actions;

export default corporateSlice.reducer;
