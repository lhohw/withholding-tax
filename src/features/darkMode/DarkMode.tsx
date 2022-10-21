import React, { useCallback } from "react";
import { css } from "@emotion/react";
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
    <div
      css={css`
        display: flex;
        padding: 0.3rem;
        margin: 1rem 2rem;
        align-items: center;
        justify-content: center;
        border: 0.5px solid var(--text);
        border-radius: 6px;
        box-shadow: 1px 1px 2px var(--text);
        cursor: pointer;
      `}
      onClick={onModeChange}
    >
      {theme === "dark" ? <HiMoon size={20} /> : <HiSun size={20} />}
    </div>
  );
};

export default DarkMode;
