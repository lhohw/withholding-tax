import type { CorporateState } from "../corporateSlice";
import React from "react";

import { css } from "@emotion/react";
import * as font from "constants/font";
import colors from "constants/colors";

import { roundOff } from "lib/utils";

import styled from "@emotion/styled";

type MonthHandlerProps = {
  monthCnt: number;
  onMonthCntChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const MonthHandler = ({
  monthCnt = 12,
  onMonthCntChange,
}: MonthHandlerProps) => {
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
        value={monthCnt}
        maxLength={2}
        onChange={onMonthCntChange}
      />
      개월
    </div>
  );
};
type StatDataType = {
  title: string;
  data: number;
  monthCnt?: number;
};
const StatData = ({ title, data, monthCnt = 12 }: StatDataType) => (
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
    >{`${roundOff(data / Math.max(1, monthCnt))} [${data}]`}</span>
  </div>
);

type StatProps = {
  title: string;
  monthCnt: number;
  data: Record<"youth" | "manhood" | "total", number>;
};
const Stat = ({ title, monthCnt, data }: StatProps) => (
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
    <StatData title="전체" data={data["total"]} monthCnt={monthCnt} />
    <StatData title="청년" data={data["youth"]} monthCnt={monthCnt} />
    <StatData title="장년" data={data["manhood"]} monthCnt={monthCnt} />
  </div>
);

type StatsProps = {
  sum: CorporateState[string]["data"][string]["total"]["sum"];
  variation: CorporateState[string]["data"][string]["total"]["sum"];
  monthCnt: number;
  onMonthCntChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Stats = ({ sum, variation, monthCnt, onMonthCntChange }: StatsProps) => (
  <StyledStats>
    <Stat title="합" monthCnt={monthCnt} data={sum} />
    <Stat title="증감" monthCnt={monthCnt} data={variation} />
    <MonthHandler monthCnt={monthCnt} onMonthCntChange={onMonthCntChange} />
  </StyledStats>
);

const StyledStats = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem;
  align-items: center;
`;

export default Stats;
