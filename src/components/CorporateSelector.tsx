import type { AccordianProps } from "./Accordian";

import useCorporate from "hooks/useCorporate";
import { useCallback } from "react";
import Accordian from "./Accordian";

const CorporateSelector = () => {
  const {
    corporates,
    selectedCorporateIndex,
    setSelectedCorporateIndex,
    isCorporateListOpen,
    toggleCorporateList,
  } = useCorporate();

  const onSelect = useCallback<AccordianProps["onSelect"]>(
    (idx) => {
      setSelectedCorporateIndex(idx);
      if (isCorporateListOpen) toggleCorporateList();
    },
    [isCorporateListOpen, setSelectedCorporateIndex, toggleCorporateList]
  );
  return (
    <Accordian
      isOpen={isCorporateListOpen}
      options={corporates}
      selected={selectedCorporateIndex}
      placeholder="CORPORATE"
      toggle={toggleCorporateList}
      onSelect={onSelect}
    />
  );
};

export default CorporateSelector;
