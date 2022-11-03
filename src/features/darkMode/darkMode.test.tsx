import { screen } from "@testing-library/react";
import { HiSun, HiMoon } from "react-icons/hi";

import { renderWithProviders } from "lib/test-utils";
import DarkMode from "./DarkMode";
import darkModeReducer, { setTheme } from "./darkModeSlice";
import type { DarkModeState } from "./darkModeSlice";

describe("darkmode reducer", () => {
  it("light theme", () => {
    const initialState: DarkModeState = {
      theme: "light",
    };
    renderWithProviders(
      <>
        <DarkMode />
        <HiSun data-testid="light" />
      </>,
      {
        preloadedState: {
          darkMode: initialState,
        },
      }
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole("button").children[0].innerHTML).toBe(
      screen.getByTestId("light").innerHTML
    );

    const actual = darkModeReducer(initialState, setTheme("light"));
    expect(actual).toEqual({ theme: "light" });
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-node-access
    const rootStyle = document.querySelector(":root")!;
    expect(getComputedStyle(rootStyle).getPropertyValue("--text")).toBe(
      "#202020"
    );
    expect(getComputedStyle(rootStyle).getPropertyValue("--background")).toBe(
      "#fefefe"
    );
  });

  it("dark theme", () => {
    const initialState: DarkModeState = {
      theme: "dark",
    };
    renderWithProviders(
      <>
        <DarkMode />
        <HiMoon data-testid="dark" />
      </>,
      {
        preloadedState: {
          darkMode: initialState,
        },
      }
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole("button").children[0].innerHTML).toBe(
      screen.getByTestId("dark").innerHTML
    );

    const actual = darkModeReducer(initialState, setTheme("dark"));
    expect(actual).toEqual({ theme: "dark" });
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-node-access
    const rootStyle = document.querySelector(":root")!;
    expect(getComputedStyle(rootStyle).getPropertyValue("--text")).toBe(
      "#d1d1d1"
    );
    expect(getComputedStyle(rootStyle).getPropertyValue("--background")).toBe(
      "#121212"
    );
  });
});
