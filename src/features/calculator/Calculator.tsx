import { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";
import { getLastYears } from "lib/values";

import { setType, setData } from "./calculatorSlice";

import Code from "./components/Code";
import Variation from "./components/Variation";
import Controller from "./components/Controller";
import SocialInsurance from "./components/SocialInsurance";

const Calculator = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { RN } = loc.state;

  const dispatch = useAppDispatch();
  const corporates = useAppSelector((state) => state.corporate);
  const corporate = corporates[RN];

  const { type } = useAppSelector((state) => state.calculator);

  const last6Years = useMemo(() => getLastYears(6), []);
  const last5Years = useMemo(() => getLastYears(5), []);

  const onItemClick = useCallback(
    (type: string) => dispatch(setType(type)),
    [dispatch]
  );
  useEffect(() => {
    if (!corporate) navigate("/", { replace: true });
    else dispatch(setData({ last6Years, data: corporate.data }));
  }, [corporate, navigate, dispatch, last6Years]);

  const { data } = useAppSelector((state) => state.calculator);
  if (!Object.keys(Object.values(data.generationSum)).length)
    return <>loading...</>;
  return (
    <StyledCalculator>
      <h1>{corporate.name}</h1>
      <div className="info">
        <Variation
          last5Years={last5Years}
          last6Years={last6Years}
          data={data}
        />
        <Controller type={type} onItemClick={onItemClick} />
      </div>
      {type &&
        (type === "social" ? (
          <>
            <Code />
            <SocialInsurance last5Years={last5Years} data={data} />
          </>
        ) : (
          <div>고용증대</div>
        ))}
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
