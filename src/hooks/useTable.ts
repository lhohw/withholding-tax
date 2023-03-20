import { useRecoilState, useRecoilValue } from "recoil";

import { resultState, statisticsState, monthState } from "recoil/table";

export type UseTableProps = {
  RN: string;
  year: string;
};
const useTable = ({ RN, year }: UseTableProps) => {
  const [resultData, setResultData] = useRecoilState(resultState({ RN, year }));
  const statistics = useRecoilValue(statisticsState);
  const [month, setMonth] = useRecoilState(monthState({ RN, year }));

  return {
    resultData,
    setResultData,
    statistics,
    month,
    setMonth,
  };
};

export default useTable;
