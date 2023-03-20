import { useRecoilState, useRecoilValue } from "recoil";
import { resultState } from "recoil/table";
import { monthState } from "recoil/table/atom";
import { statisticsState } from "recoil/table/selector";

export type UseTableProps = {
  RN: string;
  year: string;
};
const useTable = ({ RN, year }: UseTableProps) => {
  const [resultData] = useRecoilState(resultState({ RN, year }));
  const statistics = useRecoilValue(statisticsState);
  const [month, setMonth] = useRecoilState(monthState({ RN, year }));

  return {
    resultData,
    statistics,
    month,
    setMonth,
  };
};

export default useTable;
