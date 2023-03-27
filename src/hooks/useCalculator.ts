import { useRecoilValue } from "recoil";

import {
  socialInsuranceTableState,
  yearlyMonthState,
  socialInsuranceRatesState,
} from "recoil/calculator";

export type UseCalculatorProps = {
  RN: string;
};
const useCalculator = ({ RN }: UseCalculatorProps) => {
  const { sum, variation } = useRecoilValue(socialInsuranceTableState);
  const months = useRecoilValue(yearlyMonthState(6));
  const socialInsuranceRates = useRecoilValue(
    socialInsuranceRatesState({ RN })
  );
  return {
    sum,
    variation,
    months,
    socialInsuranceRates,
  };
};

export default useCalculator;
