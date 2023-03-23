import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TiTimes, TiDivide, TiEquals } from "react-icons/ti";

import * as font from "constants/font";

import Fraction from "./Fraction";
import BigText from "./BigText";
import { orangeGradient } from "styles/gradient";

export type ProcessOfSocialInsuranceProps = {
  year?: string;
  type: string;
  variation: string;
  totalSalary: string;
  totalGeneration: string;
  socialInsuranceRate: string;
  resultValue: string;
};
const ProcessOfSocialInsurance = ({
  year,
  type,
  variation,
  totalSalary,
  totalGeneration,
  socialInsuranceRate,
  resultValue,
}: ProcessOfSocialInsuranceProps) => (
  <ProcessOfSocialInsuranceWrapper>
    <Fraction title={year || ""}>{""}</Fraction>
    <Fraction title={`${type === "youth" ? "청년" : "장년"} 증가`}>
      {variation}
    </Fraction>
    <TiTimes size={20} />
    <BigText>[</BigText>
    <Fraction title="사회 보험료 금액">
      <Fraction title={`${type === "youth" ? "청년" : "장년"} 총 급여`}>
        {totalSalary}
      </Fraction>
      <TiDivide size={20} />
      <Fraction title={`총 ${type === "youth" ? "청년" : "장년"}`}>
        {totalGeneration}
      </Fraction>
      <TiTimes size={20} />
      <Fraction title="사회보험요율">{socialInsuranceRate}</Fraction>
    </Fraction>
    <BigText>]</BigText>
    <TiTimes size={20} />
    <Fraction title="요율">{type === "youth" ? "100%" : "50%"}</Fraction>
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
  </ProcessOfSocialInsuranceWrapper>
);

const ProcessOfSocialInsuranceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  position: relative;
  padding: 1rem 0;
  & > div:first-of-type {
    min-width: 50px;
    font-size: 2rem;
    position: absolute;
    top: -1rem;
    left: -2rem;
    ${orangeGradient};
    color: transparent;
    background-clip: text;
    text-shadow: 1px 3px 3px var(--yellow);
    & > div:first-of-type {
      border: none;
    }
  }
  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

export default ProcessOfSocialInsurance;
