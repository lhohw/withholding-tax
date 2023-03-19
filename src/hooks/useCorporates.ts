import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toggleState } from "recoil/base";
import { corporateNamesState, corporatesState } from "recoil/corporates";

const useCorporates = () => {
  const [isCorporateListOpen, setCorporateListOpen] = useRecoilState(
    toggleState("corporateList")
  );
  const [corporates, setCorporates] = useRecoilState(corporatesState);
  const corporateNames = useRecoilValue(corporateNamesState);

  const toggleCorporateList = useCallback(
    () => setCorporateListOpen(!isCorporateListOpen),
    [setCorporateListOpen, isCorporateListOpen]
  );

  return {
    isCorporateListOpen,
    toggleCorporateList,
    corporates,
    setCorporates,
    corporateNames,
  };
};

export default useCorporates;
