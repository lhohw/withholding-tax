import type { YearlySocialInsuranceProps } from "./YearlySocialInsurance";

import { useMemo } from "react";
import styled from "@emotion/styled";

import useCorporate from "hooks/useCorporate";
import useCalculator from "hooks/useCalculator";

import { getLastYears } from "lib/values";
import { parseMoney, roundOff } from "lib/utils";

import YearlySocialInsurance from "./YearlySocialInsurance";

const SocialInsuranceResult = () => {
  const last5Years = useMemo(() => getLastYears(5), []);
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  const { sum, variation, months, socialInsuranceRates } = useCalculator({
    RN,
  });
  return (
    <SocialInsuranceResultWrapper>
      {last5Years.map((year) => {
        const data = (["youth", "manhood"] as const).reduce((acc, type) => {
          const _variation = variation[type][year].totalGeneration;
          const _totalSalary = sum[type][year].totalSalary;
          const _totalGeneration = sum[type][year].totalGeneration;
          const _month = months[year];
          const _socialInsuranceRate = socialInsuranceRates[year];
          const resultValue = parseMoney(
            _totalGeneration === 0
              ? 0
              : Math.max(0, roundOff(_variation / +_month)) * // 증감
                  ((_totalSalary / // 총 급여
                    roundOff(_totalGeneration / +_month)) * // 총 청/장년
                    _socialInsuranceRate) * // 사회보험 요율
                  (type === "youth" ? 1 : 0.5)
          ).toString();
          return {
            ...acc,
            [type]: {
              variation: roundOff(_variation / +_month).toString(),
              totalSalary: parseMoney(_totalSalary),
              totalGeneration: roundOff(_totalGeneration / +_month).toString(),
              socialInsuranceRate: _socialInsuranceRate.toString(),
              resultValue,
              type,
            },
          };
        }, {} as Omit<YearlySocialInsuranceProps, "year">);

        return <YearlySocialInsurance key={year} year={year} {...data} />;
      })}
    </SocialInsuranceResultWrapper>
  );
};

const SocialInsuranceResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  & > div + div {
    margin-top: 1rem;
  }
`;

export default SocialInsuranceResult;
