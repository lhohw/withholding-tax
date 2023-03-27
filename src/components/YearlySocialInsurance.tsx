import type { ProcessOfSocialInsuranceProps } from "./ProcessOfSocialInsurance";

import styled from "@emotion/styled";

import { GenerationTypes } from "constants/value";

import ProcessOfSocialInsurance from "./ProcessOfSocialInsurance";

export type YearlySocialInsuranceProps = {
  year: string;
} & Record<Exclude<GenerationTypes, "total">, ProcessOfSocialInsuranceProps>;
const YearlySocialInsurance = ({
  year,
  ...props
}: YearlySocialInsuranceProps) => {
  return (
    <YearlySocialInsuranceWrapper>
      {Object.keys(props).map((type) => {
        return (
          <ProcessOfSocialInsurance
            key={type}
            year={type === "youth" ? year : ""}
            {...props[type as keyof typeof props]}
          />
        );
      })}
    </YearlySocialInsuranceWrapper>
  );
};

const YearlySocialInsuranceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 2px dashed var(--navy);
`;

export default YearlySocialInsurance;
