import type { CorporateState } from "../corporateSlice";

import React, { useState } from "react";
import { css } from "@emotion/react";
import * as font from "constants/font";
import colors from "constants/colors";

import { numberRegex } from "constants/regex";
import styled from "@emotion/styled";

type MonthHandlerProps = {
  month: number;
  setMonth: (value: number) => void;
};
const MonthHandler = ({ month, setMonth }: MonthHandlerProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 1rem;
        font-size: ${font.size.large};
        font-weight: ${font.weight.medium};
      `}
    >
      /
      <input
        css={css`
          margin: 0 0.6rem;
          border: 0.5px solid ${colors.black400};
          width: 50px;
          text-align: center;
          padding: 0.5rem;
          font-size: ${font.size.large};
          border: none;
          outline: none;
          border-bottom: 1px solid ${colors.black600};
          transition: all 0.3s ease-in-out;
          &:focus {
            border-color: ${colors.main};
          }
        `}
        type="text"
        value={month}
        maxLength={2}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const month = e.target.value;
          if (numberRegex.exec(month) || parseInt(month) > 12) return;
          setMonth(parseInt(month || "0"));
        }}
      />
      개월
    </div>
  );
};
type StatDataType = {
  title: string;
  data: number;
  month?: number;
};
const StatData = ({ title, data, month = 12 }: StatDataType) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      flex: 1;
      font-size: ${font.size.base};
    `}
  >
    <span
      css={css`
        text-align: center;
        width: 30px;
        font-weight: ${font.weight.semibold};
      `}
    >
      {title}
    </span>
    <span
      css={css`
        margin-left: 1rem;
        color: ${data < 0 ? colors.red600 : colors.base};
      `}
    >{`${(data / Math.max(1, month)).toFixed(2)} [${data}]`}</span>
  </div>
);

type StatProps = {
  title: string;
  month: number;
  data: Record<"youth" | "manhood" | "total", number[]>;
};
const Stat = ({ title, month, data }: StatProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      margin-left: 1rem;
      width: 200px;
      height: 100%;
    `}
  >
    <span
      css={css`
        font-weight: bold;
        padding: 0.3rem;
      `}
    >
      {title}
    </span>
    <StatData
      title="전체"
      data={data["total"].reduce((x, y) => x + y)}
      month={month}
    />
    <StatData
      title="청년"
      data={data["youth"].reduce((x, y) => x + y)}
      month={month}
    />
    <StatData
      title="장년"
      data={data["manhood"].reduce((x, y) => x + y)}
      month={month}
    />
  </div>
);

type StatsProps = {
  total: CorporateState["data"][string]["total"]["generation"];
  variation: CorporateState["data"][string]["total"]["generation"];
};
const Stats = ({ total, variation }: StatsProps) => {
  const [month, setMonth] = useState<number>(12);
  return (
    <StyledStats>
      <Stat title="합" month={month} data={total} />
      <Stat title="증감" month={month} data={variation} />
      <MonthHandler month={month} setMonth={setMonth} />
    </StyledStats>
  );
};

const StyledStats = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem;
  align-items: center;
`;

export default Stats;
