import { useMemo } from "react";
import { getLastYears } from "lib/values";
import { useRecoilState } from "recoil";
import { toggleState, accordianState } from "recoil/base";

const useYear = () => {
  const [isYearListOpen, setIsYearListOpen] = useRecoilState(
    toggleState("year")
  );

  const [selectedYear, setSelectedYear] = useRecoilState(
    accordianState("year")
  );
  const years = useMemo(() => getLastYears(6), []);

  const toggleYearListOpen = () => setIsYearListOpen(!isYearListOpen);
  return {
    years,
    selectedYear,
    isYearListOpen,
    toggleYearListOpen,
    setSelectedYear,
  };
};

export default useYear;
