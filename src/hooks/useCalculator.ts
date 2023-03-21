import { useRecoilValue } from "recoil";

import { resultSumState, resultDiffState } from "recoil/calculator";

export type UseCalculatorProps = {
  RN: string;
};
const useCalculator = ({ RN }: UseCalculatorProps) => {
  const resultSum = useRecoilValue(resultSumState({ RN }));
  const resultDiff = useRecoilValue(resultDiffState({ RN }));

  return {
    resultSum,
    resultDiff,
  };
};

export default useCalculator;
