import { useState } from "react";

export type Theme = "default" | "light" | "dark";
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    (window?.matchMedia("(prefers-color-scheme: dark").matches
      ? "dark"
      : "light") || "default"
  );
  const toggleTheme = (e: any) => {
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
    setTheme(nextTheme);
    document.body.setAttribute("theme", nextTheme);
    // const root = document.querySelector(":root") as HTMLHtmlElement;
    // root.style.setProperty("--text", colors.text[theme]);
    // root.style.setProperty("--background", colors.background[theme]);
  };
  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
