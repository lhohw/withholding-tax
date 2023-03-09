import { useState } from "react";

const useCorporate = () => {
  const [isCorporateListOpen, setIsCorporateListOpen] = useState(false);
  const [corporates, setCorporates] = useState<string[]>([]);
  const [selectedCorporateIndex, setSelectedCorporateIndex] = useState(-1);

  const toggleCorporateList = () =>
    setIsCorporateListOpen(!isCorporateListOpen);
  return {
    corporates,
    setCorporates,
    selectedCorporateIndex,
    setSelectedCorporateIndex,
    isCorporateListOpen,
    toggleCorporateList,
  };
};

export default useCorporate;
