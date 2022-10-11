import React, { useMemo } from "react";
import { css } from "@emotion/react";

import { getLastYears } from "lib/values";
import { roundOff } from "lib/utils";

import * as font from "constants/font";

import { useAppSelector } from "app/hooks";
import colors from "constants/colors";

const Variation = () => {
  const { data } = useAppSelector((state) => state.corporate);
  const last6Years = useMemo(() => getLastYears(6), []);
  const last5Years = useMemo(() => getLastYears(5), []);
  const sum = useMemo(
    () =>
      last6Years.reduce(
        (s, year) => ({ ...s, [year]: data[year].total.sum }),
        {}
      ),
    [data, last6Years]
  );
  const variation = useMemo(
    () =>
      last5Years.reduce(
        (v, year) => ({
          ...v,
          [year]: {
            total: data[year].total.sum.total - data[+year - 1].total.sum.total,
            youth: data[year].total.sum.youth - data[+year - 1].total.sum.youth,
            manhood:
              data[year].total.sum.manhood - data[+year - 1].total.sum.manhood,
          },
        }),
        {}
      ),
    [data, last5Years]
  );
  const months = useMemo(
    () =>
      last6Years.reduce(
        (s, year) => ({
          ...s,
          [year]: data[year].month,
        }),
        {}
      ),
    [last6Years, data]
  );
  return (
    <VariationContainer>
      <VariationList type="sum" months={months} years={last6Years} data={sum} />
      <VariationList
        type="variation"
        months={months}
        years={last5Years}
        data={variation}
      />
    </VariationContainer>
  );
};

const VariationContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding: 1rem;
    `}
  >
    {children}
  </div>
);

type VariationItemProps = {
  year?: string | number;
  month: number;
  data: Record<"total" | "youth" | "manhood", number>;
};
const VariationItem = ({ year, month, data }: VariationItemProps) => (
  <ul
    css={css`
      display: flex;
      flex-direction: column;
      width: 100px;
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
        {`${roundOff(data[category as keyof typeof data] / month)} [${
          data[category as keyof typeof data]
        }]`}
      </li>
    ))}
  </ul>
);

type VariationListProps = {
  type: "sum" | "variation";
  years: string[];
  months: {
    [year: string]: number;
  };
  data: {
    [year: string]: Record<"total" | "youth" | "manhood", number>;
  };
};
const VariationList = ({ type, years, months, data }: VariationListProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      margin-top: ${type === "variation" ? "1rem" : 0};
    `}
  >
    <VariationHeadingItem type={type} />
    {years.map((year) => (
      <VariationItem
        key={year}
        year={type === "sum" ? year : undefined}
        month={months[year]}
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
      width: 100px;
      font-size: ${font.size.medium};
      font-weight: ${font.weight.bold};
      margin-right: ${type === "variation" ? "100px" : 0};
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
