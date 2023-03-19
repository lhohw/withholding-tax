import { useRecoilState } from "recoil";
import { resultState } from "recoil/table";

export type UseTableProps = {
  RN: string;
  year: string;
};
const useTable = ({ RN, year }: UseTableProps) => {
  const [resultData] = useRecoilState(resultState({ RN, year }));

  return {
    resultData,
  };
};

export default useTable;
