import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  selectedYearIndexState,
  yearsState,
  selectedYearState,
} from "recoil/year";

const useYear = () => {
  const [isYearListOpen, setIsYearListOpen] = useState(false);

  const [selectedYearIndex, setSelectedYearIndex] = useRecoilState(
    selectedYearIndexState
  );
  const [years] = useRecoilState(yearsState);
  const selectedYear = useRecoilValue(selectedYearState);

  const toggleYearListOpen = () => setIsYearListOpen(!isYearListOpen);
  return {
    years,
    selectedYearIndex,
    setSelectedYearIndex,
    isYearListOpen,
    toggleYearListOpen,
    selectedYear,
  };
};

export default useYear;
