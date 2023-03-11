import type { AccordianProps } from "./Accordian";

import { useCallback } from "react";
import useCorporate from "hooks/useCorporate";
import Accordian from "./Accordian";

const CorporateSelector = () => {
  const {
    selectedCorporateIndex,
    setSelectedCorporateIndex,
    isCorporateListOpen,
    toggleCorporateList,
    corporateNames,
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
      width="200px"
      isOpen={isCorporateListOpen}
      options={corporateNames}
      selected={selectedCorporateIndex}
      placeholder="CORPORATE"
      toggle={toggleCorporateList}
      onSelect={onSelect}
    />
  );
};

export default CorporateSelector;
