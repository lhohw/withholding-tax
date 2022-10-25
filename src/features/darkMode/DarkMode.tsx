import React, { useCallback } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { setTheme } from "./darkModeSlice";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.darkMode);
  const onModeChange = useCallback(
    (e: any) => {
      const nextTheme =
        e.type === "change"
          ? e.matches
            ? "dark"
            : "light"
          : theme === "dark"
          ? "light"
          : theme === "light"
          ? "dark"
          : window.matchMedia("(prefers-color-scheme: dark").matches
          ? "light"
          : "dark";
      dispatch(setTheme(nextTheme));
    },
    [dispatch, theme]
  );

  return (
    <button onClick={onModeChange}>
      {theme === "dark" ? <HiMoon size={20} /> : <HiSun size={20} />}
    </button>
  );
};

export default DarkMode;
