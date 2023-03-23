import type { AccordianProps } from ".";

import { useCallback } from "react";
import { useLocation } from "react-router-dom";

import useYear from "hooks/useYear";

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
  const { pathname } = useLocation();
  return (
    <Accordian
      width="130px"
      isOpen={isYearListOpen}
      options={years}
      selected={selectedYear.idx}
      placeholder="YEAR"
      toggle={toggleYearListOpen}
      onSelect={onSelect}
      disable={pathname !== "/"}
    />
  );
};

export default YearAccordian;
