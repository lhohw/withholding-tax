import type { AccordianProps } from ".";

import useYear from "hooks/useYear";
import { useCallback } from "react";
import Accordian from ".";

const YearAccordian = () => {
  const {
    years,
    selectedYear,
    setSelectedYear,
    isYearListOpen,
    toggleYearListOpen,
  } = useYear();

  const onSelect = useCallback<AccordianProps["onSelect"]>(
    (idx) => {
      setSelectedYear({ idx, selected: years[idx] });
      if (isYearListOpen) toggleYearListOpen();
    },
    [isYearListOpen, years, setSelectedYear, toggleYearListOpen]
  );
  return (
    <Accordian
      width="130px"
      isOpen={isYearListOpen}
      options={years}
      selected={selectedYear.idx}
      placeholder="YEAR"
      toggle={toggleYearListOpen}
      onSelect={onSelect}
    />
  );
};

export default YearAccordian;
