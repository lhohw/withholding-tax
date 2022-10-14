import React from "react";
import styled from "@emotion/styled";

import * as font from "constants/font";
import colors from "constants/colors";

type ControllerType = {
  type: string;
  onItemClick: (type: string) => void;
};
const Controller = React.memo(({ type, onItemClick }: ControllerType) => {
  return (
    <ControllerContainer>
      <LinkContainer>
        <StyledButton
          isActive={type === "social"}
          onClick={() => onItemClick("social")}
        >
          사회보험
        </StyledButton>
        <StyledButton
          isActive={type === "employment"}
          onClick={() => onItemClick("employment")}
        >
          고용증대
        </StyledButton>
      </LinkContainer>
    </ControllerContainer>
  );
});

const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  padding: 0.5rem;
  font-size: ${font.size.large};
  text-decoration: none;
  color: ${colors.base};
  border: 1px solid ${colors.base};
  border-radius: 5px;
  background-color: ${colors.background};
  cursor: pointer;
  & + button {
    margin-left: 1rem;
  }
  ${(props) =>
    props.isActive
      ? {
          fontWeight: font.weight.bold,
          color: colors.main,
        }
      : {}}
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  border-left: 2px dotted ${colors.base};
`;

export default Controller;
