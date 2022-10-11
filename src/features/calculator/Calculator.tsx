import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";

import { setType } from "./calculatorSlice";

import Variation from "./Variation";
import Controller from "./Controller";
import { useCallback } from "react";

const Calculator = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, data } = useAppSelector((state) => state.corporate);

  const { type } = useAppSelector((state) => state.calculator);
  const onItemClick = useCallback(
    (type: string) => dispatch(setType(type)),
    [dispatch]
  );
  if (!name) {
    navigate("/", { replace: true });
    return <></>;
  }
  return (
    <StyledCalculator>
      <h1>{name}</h1>
      <div className="info">
        <Variation />
        <Controller type={type} onItemClick={onItemClick} />
      </div>
      {type && (type === "social" ? <div>사회보험</div> : <div>고용증대</div>)}
    </StyledCalculator>
  );
};

const StyledCalculator = styled.div`
  display: flex;
  flex-direction: column;
  & > h1 {
    margin: 1rem 0 0 2rem;
    color: ${colors.main};
  }
  & .info {
    display: flex;
    flex-direction: row;
  }
`;
export default Calculator;
