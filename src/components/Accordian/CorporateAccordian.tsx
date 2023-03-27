import type { AccordianProps } from ".";

import { useCallback } from "react";
import useCorporate from "hooks/useCorporate";
import useCorporates from "hooks/useCorporates";

import Accordian from ".";

const CorporateAccordian = () => {
  const { selectedCorporate, setSelectedCorporate } = useCorporate();

  const {
    isCorporateListOpen,
    toggleCorporateList,
    corporateNames,
    corporates,
  } = useCorporates();

  const onSelect = useCallback<AccordianProps["onSelect"]>(
    (idx) => {
      setSelectedCorporate({
        idx,
        selected: Object.values(corporates)[idx].RN,
      });
      if (isCorporateListOpen) toggleCorporateList();
    },
    [isCorporateListOpen, corporates, setSelectedCorporate, toggleCorporateList]
  );

  return (
    <Accordian
      width="200px"
      isOpen={isCorporateListOpen}
      options={corporateNames}
      selected={selectedCorporate.idx}
      placeholder="CORPORATE"
      toggle={toggleCorporateList}
      onSelect={onSelect}
    />
  );
};

export default CorporateAccordian;
