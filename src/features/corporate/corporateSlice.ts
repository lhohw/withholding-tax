import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonPayment } from "features/person/personAPI";
import {
  getDefaultGeneration,
  getDefaultPayment,
  getLastYears,
} from "lib/values";
import { isRetired } from "lib/utils";

import type { InfoState } from "features/info/infoSlice";
import type { ReaderState } from "features/reader/readerSlice";

export type CorporateState = {
  data: {
    [year: string]: {
      personnel: {
        [id: string]: {
          info: InfoState[string];
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
      };
    };
  };
};

const initialState: CorporateState = {
  data: {},
};

export const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {
    setPersonnel: (
      state,
      action: PayloadAction<ReaderState["list"][string]["personnel"]>
    ) => {
      const years = getLastYears(6);

      const { payload: personnel } = action;

      years.forEach((year) => {
        const yearData: CorporateState["data"][string] = {
          total: {
            payment: { youth: 0, manhood: 0 },
            generation: {
              youth: getDefaultGeneration(),
              manhood: getDefaultGeneration(),
              total: getDefaultGeneration(),
            },
          },
          personnel: {},
        };
        const { total, personnel: p } = yearData;
        Object.entries(personnel).forEach(([id, person]) => {
          const { name, date, earnedIncomeWithholdingDepartment: ei } = person;
          p[id] = {} as typeof yearData.personnel[string];
          p[id].info = { checked: false, name, date };
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
                  isRetired(date.retirement, year, idx + 1))
              )
                return;
              p[id].payment.youth += payment.youth;
              p[id].payment.manhood += payment.manhood;
              total.generation.total[idx]++;
              total.payment.youth += payment.youth;
              total.payment.manhood += payment.manhood;
              if (flag === "청년") total.generation["youth"][idx]++;
              else total.generation["manhood"][idx]++;

              p[id].generation[idx] = flag;
            });
          }
        });
        state.data[year] = yearData;
      });
    },
    toggle: (state, action: PayloadAction<{ id: string; year: string }>) => {
      const { data } = state;
      const { id, year } = action.payload;
      if (!year) throw new Error("year not defined");

      const { total, personnel } = data[year];
      const person = personnel[id];
      person.info.checked = !person.info.checked;
      const flag = personnel[id].info.checked ? -1 : 1;
      total.payment.youth += person.payment.youth * flag;
      total.payment.manhood += person.payment.manhood * flag;
      person.generation.forEach((f, idx) => {
        if (f === "-") return;
        total["generation"].total[idx] += flag;
        total["generation"][f === "청년" ? "youth" : "manhood"][idx] += flag;
      });
    },
  },
});

export const { setPersonnel, toggle } = corporateSlice.actions;

export default corporateSlice.reducer;
