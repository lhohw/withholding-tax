import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TiTimes, TiDivide, TiEquals } from "react-icons/ti";

import * as font from "constants/font";

import Fraction from "./Fraction";
import BigText from "./BigText";
import { orangeGradient } from "styles/gradient";
import TextFallback from "./TextFallback";

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
  ...props
}: ProcessOfSocialInsuranceProps) => (
  <ProcessOfSocialInsuranceWrapper>
    <ProcessOfSocialInsuranceTitle year={year} />
    {props.socialInsuranceRate === "0" ? (
      <TextFallback
        css={css`
          margin: 0;
          padding: 0;
          font-size: ${font.size.big};
          color: var(--navy);
          text-shadow: 1px 3px 10px #9dafff;
          ${props.type === "youth" &&
          css`
            display: none;
          `}
        `}
        message="사회보험요율이 존재하지 않습니다. 해당 연도와 코드의 사회보험요율 추가가 필요합니다."
      />
    ) : (
      <ProcessOfSocialInsuranceBody {...props} />
    )}
  </ProcessOfSocialInsuranceWrapper>
);

const ProcessOfSocialInsuranceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  position: relative;
  padding: 2rem 0 1rem 0;
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

const ProcessOfSocialInsuranceTitle = ({
  year,
}: Pick<ProcessOfSocialInsuranceProps, "year">) => (
  <Fraction title={year || ""}>{""}</Fraction>
);

const ProcessOfSocialInsuranceBody = ({
  variation,
  type,
  totalSalary,
  totalGeneration,
  socialInsuranceRate,
  resultValue,
}: ProcessOfSocialInsuranceProps) => (
  <>
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
  </>
);
export default ProcessOfSocialInsurance;
