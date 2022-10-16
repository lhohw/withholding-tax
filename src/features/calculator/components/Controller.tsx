import React, { useCallback } from "react";
import styled from "@emotion/styled";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { setBusinessScale, setIsCapital } from "../calculatorSlice";

import * as font from "constants/font";
import colors from "constants/colors";

import Code from "./Code";
import BusinessScale from "./BusinessScale";

type ControllerType = {
  type: string;
  onItemClick: (type: string) => void;
};
const Controller = ({ type, onItemClick }: ControllerType) => {
  const dispatch = useAppDispatch();
  const onBusinessScaleClick = useCallback(
    (businessScale: string) => {
      dispatch(setBusinessScale(businessScale));
    },
    [dispatch]
  );
  const onCapitalClick = useCallback(
    (isCapital: boolean) => {
      dispatch(setIsCapital(isCapital));
    },
    [dispatch]
  );
  const { businessScale, isCapital } = useAppSelector(
    (state) => state.calculator
  );
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
      {type === "social" ? (
        <Code />
      ) : type === "employment" ? (
        <BusinessScale
          businessScale={businessScale}
          isCapital={isCapital}
          onBusinessScaleClick={onBusinessScaleClick}
          onCapitalClick={onCapitalClick}
        />
      ) : null}
    </ControllerContainer>
  );
};

export const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: ${font.size.large};
  text-decoration: none;
  color: ${colors.black400};
  border: 1px solid ${colors.base};
  border-radius: 5px;
  background-color: ${colors.background};
  min-width: 100px;
  height: 50px;
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

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4rem;
`;

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 1rem;
  border-left: 2px dotted ${colors.base};
`;

export default Controller;
