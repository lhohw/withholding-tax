import React from "react";
import styled from "@emotion/styled";

import { useAppSelector } from "app/hooks";

import { LinkContainer, StyledButton } from "./Controller";

type BusinessScaleProps = {
  businessScale: string;
  isCapital?: boolean;
  onBusinessScaleClick: (businessScale: string) => void;
  onCapitalClick: (isCapital: boolean) => void;
};
const BusinessScale = ({
  businessScale,
  isCapital,
  onBusinessScaleClick,
  onCapitalClick,
}: BusinessScaleProps) => {
  const { theme } = useAppSelector((state) => state.darkMode);
  return (
    <BusinessScaleContainer>
      <LinkContainer>
        <StyledButton
          theme={theme}
          isActive={businessScale === "중소"}
          onClick={() => onBusinessScaleClick("중소")}
        >
          중소
        </StyledButton>
        <StyledButton
          theme={theme}
          isActive={businessScale === "중견"}
          onClick={() => onBusinessScaleClick("중견")}
        >
          중견
        </StyledButton>
        <StyledButton
          theme={theme}
          isActive={businessScale === "대기업"}
          onClick={() => onBusinessScaleClick("대기업")}
        >
          대기업
        </StyledButton>
      </LinkContainer>
      <LinkContainer>
        <StyledButton
          theme={theme}
          isActive={isCapital === true}
          onClick={() => onCapitalClick(true)}
        >
          수도권
        </StyledButton>
        <StyledButton
          theme={theme}
          isActive={isCapital === false}
          onClick={() => onCapitalClick(false)}
        >
          비수도권
        </StyledButton>
      </LinkContainer>
    </BusinessScaleContainer>
  );
};

const BusinessScaleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default React.memo(BusinessScale);
