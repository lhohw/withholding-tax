import { memo } from "react";
import { css } from "@emotion/react";

export type BigTextProps = {
  children: React.ReactNode;
  className?: string;
};
const BigText = ({ children, className }: BigTextProps) => (
  <span
    className={className}
    css={css`
      font-size: 3rem;
      margin: 0 1rem;
    `}
  >
    {children}
  </span>
);

export default memo(BigText);
