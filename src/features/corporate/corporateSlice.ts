import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonPayment, YYYYMMDD, Person } from "features/person/personAPI";
import {
  getDefaultGeneration,
  getDefaultPayment,
  getLastYears,
} from "lib/values";
import { isRetired, lessThanAMonth } from "lib/utils";

// import type { InfoState } from "features/info/infoSlice";
import type { ReaderState } from "features/reader/readerSlice";

export type CorporateState = {
  [RN: string]: {
    name: string;
    data: {
      [year: string]: {
        personnel: {
          [id: string]: {
            // info: InfoState[string];
            info: {
              checked: boolean;
              name: Person["name"];
              date: Person["date"];
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
          personnel: ReaderState["list"][string]["personnel"];
        };
        RN: string;
      }>
    ) => {
      const years = getLastYears(6);

      const {
        data: { name, personnel },
        RN,
      } = action.payload;
      state[RN] = {
        name,
        data: {},
      };
      const corporate = state[RN];
      corporate.name = name;
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
          monthCnt: 12,
        };
        const { total, personnel: p } = yearData;
        Object.entries(personnel).forEach(([id, person]) => {
          const { name, date, earnedIncomeWithholdingDepartment: ei } = person;
          p[id] = {} as typeof yearData.personnel[string];
          p[id].info = {
            checked: false,
            name,
            date: {
              start: date.start.slice(2) as YYYYMMDD,
              retirement: date.retirement.slice(2) as YYYYMMDD,
              birth: date.birth,
            },
          };
          p[id].payment = getDefaultPayment();
          p[id].generation = new Array(12).fill("-");
          if (ei[year]) {
            ei[year].slice(0, 12).forEach(({ payment }, idx) => {
              const flag = payment.youth
                ? "청년"
                : payment.manhood
                ? "장년"
                : "-";

              if (
                flag === "-" ||
                (date.retirement.trim() &&
                  (isRetired(date.retirement, year, idx + 1) ||
                    lessThanAMonth(date)))
              )
                return;
              p[id].payment.youth += payment.youth;
              p[id].payment.manhood += payment.manhood;
              total.generation.total[idx]++;
              total.payment.youth += payment.youth;
              total.payment.manhood += payment.manhood;
              if (flag === "청년") {
                total.generation["youth"][idx]++;
                total.sum.total++;
                total.sum.youth++;
              } else {
                total.generation["manhood"][idx]++;
                total.sum.total++;
                total.sum.manhood++;
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
      person.info.checked = !person.info.checked;
      const flag = personnel[id].info.checked ? -1 : 1;
      total.payment.youth += person.payment.youth * flag;
      total.payment.manhood += person.payment.manhood * flag;
      person.generation.forEach((f, idx) => {
        if (f === "-") return;
        total.generation.total[idx] += flag;
        total.sum.total += flag;
        if (f === "청년") {
          total.generation.youth[idx] += flag;
          total.sum.youth += flag;
        } else {
          total.generation.manhood[idx] += flag;
          total.sum.manhood += flag;
        }
      });
    },
    setMonthCnt: (
      state,
      action: PayloadAction<{ year: string; monthCnt: number; RN: string }>
    ) => {
      const { monthCnt, year, RN } = action.payload;
      state[RN].data[year].monthCnt = monthCnt;
    },
  },
});

export const { setPersonnel, toggle, setMonthCnt } = corporateSlice.actions;

export default corporateSlice.reducer;
