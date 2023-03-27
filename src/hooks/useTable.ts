import { useRecoilState, useRecoilValue } from "recoil";
import { inputState } from "recoil/base";

import { resultState, statisticsState } from "recoil/table";

export type UseTableProps = {
  RN: string;
  year: string;
};
const useTable = ({ RN, year }: UseTableProps) => {
  const [resultData, setResultData] = useRecoilState(resultState({ RN, year }));
  const statistics = useRecoilValue(statisticsState(year));
  const [month, setMonth] = useRecoilState(
    inputState({ RN, year, stateKey: "month" })
  );

  return {
    resultData,
    setResultData,
    statistics,
    month,
    setMonth,
  };
};

export default useTable;
