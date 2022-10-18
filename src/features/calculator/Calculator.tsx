import { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";
import { capitalRegex } from "constants/regex";
import * as font from "constants/font";

import { getLastYears } from "lib/values";

import {
  setBusinessScale,
  setData,
  setIsCapital,
  setType,
  setCode,
} from "./calculatorSlice";

import Variation from "./components/Variation";
import Controller from "./components/Controller";
import SocialInsurance from "./components/SocialInsurance";
import EmploymentIncrease from "./components/EmploymentIncrease";
import Loading from "features/loading/Loading";

const Calculator = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { RN } = loc.state;

  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.calculator);
  const corporates = useAppSelector((state) => state.corporate);
  const corporate = corporates[RN];

  const last6Years = useMemo(() => getLastYears(6), []);
  const last5Years = useMemo(() => getLastYears(5), []);

  const onItemClick = useCallback(
    (type: string) => {
      dispatch(setType(type));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!corporate) navigate("/", { replace: true });
    else {
      dispatch(setData({ last6Years, data: corporate.data }));
      if (corporate.address) {
        dispatch(setIsCapital(corporate.address.match(capitalRegex) !== null));
      }
    }
    return () => {
      dispatch(setType(""));
      dispatch(setCode(""));
      dispatch(setBusinessScale(""));
      dispatch(setIsCapital(undefined));
    };
  }, [corporate, navigate, dispatch, last6Years]);

  const { data } = useAppSelector((state) => state.calculator);
  if (!Object.keys(Object.values(data.generationSum)).length)
    return <Loading />;
  return (
    <StyledCalculator>
      <div className="header">
        <div className="info">
          <h1>{corporate.name}</h1>
          <span>{corporate.address}</span>
        </div>
        <Controller type={type} onItemClick={onItemClick} />
      </div>
      <div className="data">
        <Variation
          last5Years={last5Years}
          last6Years={last6Years}
          data={data}
        />
      </div>
      <div className="data">
        {type &&
          (type === "social" ? (
            <SocialInsurance last5Years={last5Years} data={data} />
          ) : (
            <EmploymentIncrease last5Years={last5Years} />
          ))}
      </div>
    </StyledCalculator>
  );
};

const StyledCalculator = styled.div`
  display: flex;
  flex-direction: column;
  & .header {
    display: flex;
    flex-direction: row;
    & .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      min-width: 200px;
      padding: 1rem;
      & > h1 {
        display: inline-block;
        margin: 0;
        color: ${colors.main};
      }
      & > span {
        margin-top: 0.5rem;
        font-size: ${font.size.medium};
      }
    }
  }
  & > .data {
    display: flex;
    flex-direction: row;
  }
`;
export default Calculator;
