import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { setEmploymentIncreaseData } from "../calculatorSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

import * as font from "constants/font";
import colors from "constants/colors";
import { parseMoney } from "lib/utils";

type EmploymentIncreaseProps = {
  last5Years: string[];
};
const EmploymentIncrease = ({ last5Years }: EmploymentIncreaseProps) => {
  const dispatch = useAppDispatch();
  const { businessScale, isCapital, employmentIncreaseData } = useAppSelector(
    (state) => state.calculator
  );

  useEffect(() => {
    if (isCapital !== undefined && businessScale) {
      dispatch(setEmploymentIncreaseData({ last5Years }));
    }
  }, [dispatch, isCapital, businessScale, last5Years]);

  if (!businessScale || isCapital === undefined)
    return (
      <div
        css={css`
          margin: 2rem;
          font-size: ${font.size.big};
          font-weight: ${font.weight.bold};
        `}
      >
        사업 규모와 수도권 여부를 선택하세요
      </div>
    );
  if (!Object.keys(employmentIncreaseData).length) return <div>loading...</div>;
  return (
    <EmploymentIncreaseContainer>
      {(
        [
          "thisYear",
          "lastYear",
          "last2Year",
          "exPostFacto1",
          "exPostFacto2",
          "total",
        ] as Type[]
      ).map((type) => (
        <EmploymentIncreaseList
          key={type}
          type={type}
          years={last5Years}
          data={employmentIncreaseData}
        />
      ))}
    </EmploymentIncreaseContainer>
  );
};

const EmploymentIncreaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

type Type =
  | "thisYear"
  | "lastYear"
  | "last2Year"
  | "total"
  | "exPostFacto1"
  | "exPostFacto2";
type EmploymentIncreaseListProps = {
  type: Type;
  years: string[];
  data: {
    [year: string]: {
      [T in Type]: Record<"youth" | "manhood", number> | number;
    };
  };
};
const EmploymentIncreaseList = ({
  years,
  type,
  data,
}: EmploymentIncreaseListProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      margin-top: 1rem;
      border-top: 1px dotted ${colors.black300};
      border-bottom: 1px dotted ${colors.black300};
      &:first-of-type {
        margin-top: 0;
      }
    `}
  >
    <EmploymentIncreaseHeadingItem type={type} />
    {years.map((year) => (
      <EmploymentIncreaseItem key={year} data={data[year][type]} />
    ))}
  </div>
);

type EmploymentIncreaseItemProps = {
  data: Record<"youth" | "manhood", number> | number;
};
const EmploymentIncreaseItem = ({ data }: EmploymentIncreaseItemProps) => (
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
    {typeof data === "object" ? (
      Object.keys(data).map((category) => (
        <li key={category}>
          {parseMoney(data[category as keyof typeof data])}
        </li>
      ))
    ) : (
      <li
        css={css`
          font-weight: ${font.weight.bold};
        `}
      >
        {parseMoney(data)}
      </li>
    )}
  </ul>
);

type EmploymentIncreaseHeadingItemProps = {
  type: Type;
};
const EmploymentIncreaseHeadingItem = ({
  type,
}: EmploymentIncreaseHeadingItemProps) => (
  <ul
    css={css`
      display: flex;
      flex-direction: column;
      width: 120px;
      font-size: ${font.size.medium};
      font-weight: ${font.weight.bold};
      margin-right: 170px;
      & > li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem;
      }
    `}
  >
    {type === "total" ? (
      <li>{"총합"}</li>
    ) : (
      <>
        <li>{`청년 (${
          type === "thisYear"
            ? "본 년도"
            : type === "lastYear"
            ? "전 년도"
            : type === "last2Year"
            ? "2년 전"
            : type === "exPostFacto1"
            ? "사후관리 1년"
            : "사후관리 2년"
        })`}</li>
        <li>{`장년 (${
          type === "thisYear"
            ? "본 년도"
            : type === "lastYear"
            ? "전 년도"
            : type === "last2Year"
            ? "2년 전"
            : type === "exPostFacto1"
            ? "사후관리 1년"
            : "사후관리 2년"
        })`}</li>
      </>
    )}
  </ul>
);

export default React.memo(EmploymentIncrease);
