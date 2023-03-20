import { useCallback } from "react";
import { css } from "@emotion/react";

import useTable from "hooks/useTable";
import { exceptNumberRegex } from "constants/regex";

export type MonthCounterProps = {
  RN: string;
  year: string;
};
const MonthCounter = ({ RN, year }: MonthCounterProps) => {
  const { month, setMonth } = useTable({ RN, year });
  const onMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (exceptNumberRegex.exec(value) || isNaN(Number(value))) return;
      setMonth(Math.min(12, Math.max(0, +value)));
    },
    [setMonth]
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 120px;
        width: 100px;
        justify-content: center;
        margin-left: 2rem;
        border: 1px solid var(--placeholder);
        border-radius: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          border-bottom: 1px dashed var(--navy);
          border-radius: 8px 8px 0 0;
          background: linear-gradient(
            113deg,
            rgb(245, 232, 232) 0%,
            rgba(255, 143, 118, 0.125) 100%
          );
          font-size: 0.9rem;
          font-weight: bold;
        `}
      >
        Month
      </div>
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: rgba(254, 254, 254, 0.376);
          font-size: 1.5rem;
          padding: 0 0.5rem;
          border-radius: 0 0 8px 8px;
        `}
      >
        <span
          css={css`
            font-weight: bold;
          `}
        >
          /
        </span>
        <input
          css={css`
            display: flex;
            background: transparent;
            border: none;
            border-bottom: 2px solid var(--black);
            text-align: center;
            height: 40px;
            width: 30px;
            margin-left: 1rem;
            transition: border-color, font-weight 0.25s ease-in-out;
            &:focus {
              outline: none;
              border-color: var(--light-orange);
              font-weight: bold;
            }
          `}
          value={month}
          onChange={onMonthChange}
        />
      </div>
    </div>
  );
};

export default MonthCounter;
