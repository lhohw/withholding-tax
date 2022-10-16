import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useAppSelector } from "app/hooks";

import * as font from "constants/font";
import colors from "constants/colors";

import { TiTimes, TiDivide, TiEquals } from "react-icons/ti";

import { parseMoney, roundOff, getSocialInsuranceRate } from "lib/utils";
import { CalculatorState } from "../calculatorSlice";

type SocialInsuranceProps = {
  last5Years: string[];
  data: CalculatorState["data"];
};
const SocialInsurance = ({ last5Years, data }: SocialInsuranceProps) => {
  const { paymentSum, generationSum, variation, monthCnts } = data;
  const { code } = useAppSelector((state) => state.calculator);
  return (
    <SocialInsuranceContainer>
      {last5Years.map((year) => (
        <div key={year}>
          <Row
            year={year}
            type="youth"
            variation={variation[year].youth}
            totalPayment={paymentSum[year].youth}
            totalGeneration={generationSum[year].youth}
            socialInsuranceRate={getSocialInsuranceRate(year, code) || 0}
            monthCnt={monthCnts[year]}
          />
          <Row
            type="manhood"
            variation={variation[year].manhood}
            totalPayment={paymentSum[year].manhood}
            totalGeneration={generationSum[year].manhood}
            socialInsuranceRate={getSocialInsuranceRate(year, code) || 0}
            monthCnt={monthCnts[year]}
          />
        </div>
      ))}
    </SocialInsuranceContainer>
  );
};

const SocialInsuranceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-width: 1000px;
`;
type RowProps = {
  year?: string;
  type: string;
  variation: number;
  totalPayment: number;
  totalGeneration: number;
  socialInsuranceRate: number;
  monthCnt: number;
};
const Row = React.memo(
  ({
    year,
    type,
    variation,
    totalPayment,
    totalGeneration,
    socialInsuranceRate,
    monthCnt,
  }: RowProps) => {
    const resultValue = useMemo(
      () => {
        const value =
          totalGeneration === 0
            ? "0"
            : Math.max(0, roundOff(variation / monthCnt)) * // 증감
              ((totalPayment / // 총 급여
                roundOff(totalGeneration / monthCnt)) * // 총 청/장년
                socialInsuranceRate) * // 사회보험 요율
              (type === "youth" ? 1 : 0.5);
        return parseMoney(value);
      }, // 요율
      [
        variation,
        totalPayment,
        totalGeneration,
        socialInsuranceRate,
        type,
        monthCnt,
      ]
    );
    return (
      <RowContainer>
        <Item heading={year || ""}>{""}</Item>
        <Item heading={`${type === "youth" ? "청년" : "장년"} 증가`}>
          {roundOff(variation / monthCnt)}
        </Item>
        <TiTimes size={20} />
        <span
          css={css`
            font-size: 3rem;
            margin: 0 1rem;
          `}
        >
          [
        </span>
        <Item heading="사회 보험료 금액">
          <Item heading={`${type === "youth" ? "청년" : "장년"} 총 급여`}>
            {parseMoney(totalPayment)}
          </Item>
          <TiDivide size={20} />
          <Item heading={`총 ${type === "youth" ? "청년" : "장년"}`}>
            {roundOff(totalGeneration / monthCnt)}
          </Item>
          <TiTimes size={20} />
          <Item heading="사회보험요율">{socialInsuranceRate}</Item>
        </Item>
        <span
          css={css`
            font-size: 3rem;
            margin: 0 1rem;
          `}
        >
          ]
        </span>
        <TiTimes size={20} />
        <Item heading="요율">{type === "youth" ? "100%" : "50%"}</Item>
        <TiEquals
          css={css`
            margin: 0 1rem;
          `}
          size={20}
        />
        <span
          css={css`
            font-weight: ${font.weight.bold};
          `}
        >{`${resultValue} 원`}</span>
      </RowContainer>
    );
  },
  (prevProps, nextProps) =>
    prevProps.socialInsuranceRate === nextProps.socialInsuranceRate
);

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  & > div:first-of-type {
    min-width: 50px;
  }
  &:last-of-type {
    margin-bottom: 2rem;
  }
`;
type ItemProps = {
  heading: string;
  children: number | string | React.ReactNode;
};
const Item = React.memo(({ heading, children }: ItemProps) => (
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
        border-bottom: ${heading ? "1px solid black" : "none"};
        width: 100%;
      `}
    >
      {heading}
    </div>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: ${typeof children === "number" && children < 0
          ? colors.red600
          : colors.base};
      `}
    >
      {children}
    </div>
  </div>
));

export default SocialInsurance;
