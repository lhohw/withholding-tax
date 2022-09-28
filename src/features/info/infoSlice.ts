import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Person, YYYYMMDD } from "features/person/personAPI";

export type InfoState = {
  [id: Person["id"]]: {
    checked: boolean;
    name: Person["name"];
    date: Person["date"];
  };
};

const initialState: InfoState = {};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<InfoState>) => {
      Object.entries(action.payload).forEach(
        ([
          id,
          {
            checked,
            name,
            date: { start, retirement, birth },
          },
        ]) => {
          state[id] = {
            checked,
            name,
            date: {
              start: start.slice(2) as YYYYMMDD,
              retirement: retirement.slice(2) as YYYYMMDD,
              birth,
            },
          };
        }
      );
    },
    toggle: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      state[id].checked = !state[id].checked;
    },
  },
});

export const { setInfo, toggle } = infoSlice.actions;

export default infoSlice.reducer;
