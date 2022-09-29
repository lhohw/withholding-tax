import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, PersonPayment } from "features/person/personAPI";
import {
  getDefaultGeneration,
  getDefaultPayment,
  getLastYears,
} from "lib/utils";

import type { InfoState } from "features/info/infoSlice";

export type CorporateState = {
  list: {
    [key: string]: {
      name: string;
      personnel: {
        [key: string]: Person;
      };
    };
  };
  selected?: string;
  year?: string;
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
  list: {},
  data: {},
};

export const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {
    setPersonnel: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
      const years = getLastYears(6);

      const { personnel } = state.list[action.payload];

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
              if (flag === "-") return;
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
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    toggle: (state, action: PayloadAction<string>) => {
      const { year, data } = state;
      const { payload: id } = action;
      if (!year) return;
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
    mergePerson: (
      state,
      action: PayloadAction<{ year: number; data: string }>
    ) => {
      const { year, data } = action.payload;
      const person: Person = JSON.parse(data);
      const {
        corporate: { RN },
        id,
        earnedIncomeWithholdingDepartment: ei,
        payment,
      } = person;
      if (!state.list[RN]) {
        state.list[RN] = {
          name: person.corporate.name,
          personnel: {
            [id]: person,
          },
        };
      } else if (!state.list[RN].personnel[id]) {
        state.list[RN].personnel[id] = person;
      } else {
        const p = state.list[RN].personnel[id];
        p.earnedIncomeWithholdingDepartment[year] = ei[year];
        p.payment[year] = payment[year];
      }
    },
  },
});

export const { setPersonnel, mergePerson, setYear, toggle } =
  corporateSlice.actions;

export default corporateSlice.reducer;
