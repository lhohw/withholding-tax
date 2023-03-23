import { memo } from "react";
import { css } from "@emotion/react";

import * as font from "constants/font";

export type FractionProps = {
  title: string;
  children: number | string | React.ReactNode;
};
const Fraction = ({ title, children }: FractionProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.3rem;
      font-size: ${font.size.base};
      margin: 0 1rem;
    `}
  >
    <div
      css={css`
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: ${font.weight.semibold};
        border-bottom: ${title ? "1px solid var(--text)" : "none"};
        width: 100%;
      `}
    >
      {title}
    </div>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: ${typeof children === "string" && children.startsWith("-")
          ? "var(--red)"
          : "inherit"};
      `}
    >
      {children}
    </div>
  </div>
);

export default memo(Fraction);
