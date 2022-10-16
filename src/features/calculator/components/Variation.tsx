import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { roundOff } from "lib/utils";

import * as font from "constants/font";

import colors from "constants/colors";
import { CalculatorState } from "../calculatorSlice";

type VariationProps = {
  last5Years: string[];
  last6Years: string[];
  data: CalculatorState["data"];
};
const Variation = ({ last5Years, last6Years, data }: VariationProps) => {
  const { monthCnts, generationSum: sum, variation } = data;
  return (
    <VariationContainer>
      <VariationList
        type="sum"
        monthCnts={monthCnts}
        years={last6Years}
        data={sum}
      />
      <VariationList
        type="variation"
        monthCnts={monthCnts}
        years={last5Years}
        data={variation}
      />
    </VariationContainer>
  );
};

const VariationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

type VariationItemProps = {
  year?: string | number;
  monthCnt: number;
  data: VariationListProps["data"][string];
};
const VariationItem = ({ year, monthCnt, data }: VariationItemProps) => (
  <ul
    css={css`
      display: flex;
      flex-direction: column;
      width: 170px;
      font-size: ${font.size.medium};
      & > li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem;
      }
    `}
  >
    {year && (
      <li
        css={css`
          font-weight: ${font.weight.bold};
          height: 30px;
        `}
      >
        {year}
      </li>
    )}
    {["total", "youth", "manhood"].map((category) => (
      <li
        key={category}
        css={css`
          color: ${data[category as keyof typeof data] < 0
            ? colors.red600
            : colors.base};
        `}
      >
        {`${roundOff(data[category as keyof typeof data] / monthCnt)} [${
          data[category as keyof typeof data]
        }]`}
      </li>
    ))}
  </ul>
);

type VariationListProps = {
  type: "sum" | "variation";
  years: string[];
  monthCnts: {
    [year: string]: number;
  };
  data: {
    [year: string]: Record<"youth" | "manhood" | "total", number>;
  };
};
const VariationList = ({
  type,
  years,
  monthCnts,
  data,
}: VariationListProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      margin-top: ${type === "variation" ? "1rem" : 0};
      border-top: 1px dotted ${colors.black300};
      border-bottom: 1px dotted ${colors.black300};
    `}
  >
    <VariationHeadingItem type={type} />
    {years.map((year) => (
      <VariationItem
        key={year}
        year={type === "sum" ? year : undefined}
        monthCnt={monthCnts[year]}
        data={data[year]}
      />
    ))}
  </div>
);

type VariationHeadingItemProps = {
  type: "sum" | "variation";
};
const VariationHeadingItem = ({ type }: VariationHeadingItemProps) => (
  <ul
    css={css`
      display: flex;
      flex-direction: column;
      width: 120px;
      font-size: ${font.size.medium};
      font-weight: ${font.weight.bold};
      margin-right: ${type === "variation" ? 170 : 0}px;
      & > li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem;
        &:first-of-type {
          margin-top: ${type === "sum" ? "30px" : 0};
        }
      }
    `}
  >
    <li>{`전체 (${type === "sum" ? "합" : "증감"})`}</li>
    <li>{`청년 (${type === "sum" ? "합" : "증감"})`}</li>
    <li>{`장년 (${type === "sum" ? "합" : "증감"})`}</li>
  </ul>
);

export default React.memo(Variation);
