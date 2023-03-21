import { useCallback } from "react";
import { css } from "@emotion/react";

import useTable from "hooks/useTable";

import { exceptNumberRegex } from "constants/regex";
import { lightOrangeGradient } from "styles/gradient";

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
      setMonth(Math.min(12, Math.max(0, +value)).toString());
    },
    [setMonth]
  );
  return (
    <MonthCounterWrapper>
      <MonthTitle />
      <Splitter />
      <MonthInput month={month} onMonthChange={onMonthChange} />
    </MonthCounterWrapper>
  );
};

const MonthCounterWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    css={css`
      ${lightOrangeGradient};
      display: flex;
      flex-direction: row;
      height: 35px;
      width: 110px;
      margin: 2.5px;
      justify-content: center;
      border: 0.5px solid var(--navy);
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 0;
    `}
  >
    {children}
  </div>
);
const MonthTitle = () => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 8px 0 0;
      font-size: 0.7rem;
      font-weight: bold;
      position: absolute;
      left: 0.2rem;
      top: 0.2rem;
    `}
  >
    Month
  </div>
);
const Splitter = () => (
  <div
    css={css`
      position: absolute;
      left: 47%;
      top: 50%;
      width: 27px;
      height: 1px;
      border: 1px solid var(--black);
      transform: translateX(-50%) rotate(135deg);
    `}
  />
);

const MonthInput = ({
  month,
  onMonthChange,
}: {
  month: string;
  onMonthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    css={css`
      display: flex;
      background-color: var(--white);
      border: none;
      border-bottom: 2px solid var(--black);
      text-align: center;
      width: 40px;
      height: 27.5px;
      position: absolute;
      top: 4px;
      right: 2px;
      transition: border-color, font-weight 0.25s ease-in-out;
      font-weight: bold;
      &:focus {
        outline: none;
        border-color: var(--light-orange);
      }
    `}
    value={month}
    onChange={onMonthChange}
  />
);
export default MonthCounter;
