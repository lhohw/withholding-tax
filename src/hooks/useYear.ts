import { useState } from "react";
import { getLastYears } from "lib/values";

const useYear = () => {
  const [isYearListOpen, setIsYearListOpen] = useState(false);
  const [years] = useState<string[]>(getLastYears(6));
  const [selectedYearIndex, setSelectedYearIndex] = useState(-1);

  const toggleYearListOpen = () => setIsYearListOpen(!isYearListOpen);
  return {
    years,
    selectedYearIndex,
    setSelectedYearIndex,
    isYearListOpen,
    toggleYearListOpen,
  };
};

export default useYear;
