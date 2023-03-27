import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

import CapitalButton from "./MetaphorButton/CapitalButton";

const CapitalButtons = () => {
  const [params, setParams] = useSearchParams();
  const onClick = useCallback(
    (isCapital: boolean) =>
      setParams({ size: params.get("size")!, isCapital: isCapital.toString() }),
    [setParams, params]
  );
  const activeCapital = useMemo(() => params.get("isCapital")!, [params]);
  return (
    <CapitalButtonsWrapper>
      {([true, false] as const).map((isCapital, i) => (
        <CapitalButton
          key={i}
          activeCapital={activeCapital}
          isCapital={isCapital}
          onClick={() => onClick(isCapital)}
        />
      ))}
    </CapitalButtonsWrapper>
  );
};

const CapitalButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & > button + button,
  a + a {
    margin-left: 1rem;
  }
`;

export default CapitalButtons;
