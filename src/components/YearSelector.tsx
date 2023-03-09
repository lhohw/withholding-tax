import type { AccordianProps } from "./Accordian";

import useYear from "hooks/useYear";
import { useCallback } from "react";
import Accordian from "./Accordian";

const YearSelector = () => {
  const {
    years,
    selectedYearIndex,
    setSelectedYearIndex,
    isYearListOpen,
    toggleYearListOpen,
  } = useYear();

  const onSelect = useCallback<AccordianProps["onSelect"]>(
    (idx) => {
      setSelectedYearIndex(idx);
      if (isYearListOpen) toggleYearListOpen();
    },
    [isYearListOpen, setSelectedYearIndex, toggleYearListOpen]
  );
  return (
    <Accordian
      isOpen={isYearListOpen}
      options={years}
      selected={selectedYearIndex}
      placeholder="YEAR"
      toggle={toggleYearListOpen}
      onSelect={onSelect}
    />
  );
};

export default YearSelector;
