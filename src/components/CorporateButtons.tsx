import type { CorporateSizes } from "constants/deduction";

import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

import CorporateButton from "./MetaphorButton/CorporateButton";

const CorporateButtons = () => {
  const [params, setParams] = useSearchParams();
  const onClick = useCallback(
    (size: CorporateSizes) =>
      setParams({ size, isCapital: params.get("isCapital")! }),
    [params, setParams]
  );
  const activeSize = useMemo(
    () => params.get("size") as CorporateSizes,
    [params]
  );
  return (
    <CorporateMetaphorButtonsWrapper>
      {(["small", "medium", "large"] as const).map((size) => (
        <CorporateButton
          key={size}
          activeSize={activeSize}
          size={size}
          onClick={() => onClick(size)}
        />
      ))}
    </CorporateMetaphorButtonsWrapper>
  );
};

const CorporateMetaphorButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & > button + button,
  a + a {
    margin-left: 1rem;
  }
`;

export default CorporateButtons;
