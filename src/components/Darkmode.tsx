import { css } from "@emotion/react";
import Metaphor from "./Metaphor";
import useTheme from "hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

const Darkmode = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Metaphor title="테마 변경" onClick={toggleTheme}>
      <span
        css={css`
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        `}
      >
        <FiMoon
          aria-hidden={true}
          css={css`
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: transform 0.6s ease-in-out, color 0.25s ease-in-out;
            transform-origin: center bottom;
            transform: ${theme === "light" || theme === "default"
              ? "rotate(-90deg) scale(0)"
              : "rotate(0deg) scale(1)"};
            ${theme === "default"
              ? `@media (prefers-color-scheme: dark) {
              transform: rotate(0deg) scale(1);
            }`
              : null}
          `}
          title="밝은 테마로 전환"
        />
        <FiSun
          aria-hidden={true}
          css={css`
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: transform 0.6s ease-in-out, color 0.25s ease-in-out;
            transform-origin: center bottom;
            transform: ${theme === "light" || theme === "default"
              ? "rotate(0deg) scale(1)"
              : "rotate(-90deg) scale(0)"};
            ${theme === "default"
              ? `@media (prefers-color-scheme: dark) {
              transform: rotate(-90deg) scale(0);
            }`
              : null}
          `}
          title="어두운 테마로 전환"
        />
      </span>
    </Metaphor>
  );
};

export default Darkmode;
