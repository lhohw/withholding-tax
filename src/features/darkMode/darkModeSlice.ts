import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import colors from "constants/colors";

export type DarkModeState = {
  theme: "dark" | "light";
};
const initialState: DarkModeState = {
  theme:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark").matches
      ? "dark"
      : "light",
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<DarkModeState["theme"]>) => {
      const { payload: theme } = action;
      state.theme = theme;
      document
        .querySelector(":root")! // @ts-ignore
        .style.setProperty("--text", colors.text[theme]);
      document
        .querySelector(":root")! // @ts-ignore
        .style.setProperty("--background", colors.background[theme]);
    },
  },
});

export const { setTheme } = darkModeSlice.actions;

export default darkModeSlice.reducer;
