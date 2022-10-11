import { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";
import { getLastYears } from "lib/values";

import { setType } from "./calculatorSlice";

import Variation from "./Variation";
import Controller from "./Controller";
import SocialInsurance from "./SocialInsurance";

const Calculator = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  const { RN } = loc.state;

  const dispatch = useAppDispatch();
  // const { name, data } = useAppSelector((state) => state.corporate[RN]);
  const corporates = useAppSelector((state) => state.corporate);
  const corporate = corporates[RN];

  const { type } = useAppSelector((state) => state.calculator);

  const last6Years = useMemo(() => getLastYears(6), []);
  const last5Years = useMemo(() => getLastYears(5), []);

  const paymentSum = useMemo(
    () =>
      corporate
        ? last6Years.reduce(
            (s, year) => ({ ...s, [year]: corporate.data[year].total.payment }),
            {}
          )
        : {},
    [corporate, last6Years]
  );
  const generationSum = useMemo(
    () =>
      corporate
        ? last6Years.reduce(
            (s, year) => ({ ...s, [year]: corporate.data[year].total.sum }),
            {}
          )
        : {},
    [corporate, last6Years]
  );
  const variation = useMemo(
    () =>
      corporate
        ? last5Years.reduce(
            (v, year) => ({
              ...v,
              [year]: {
                total:
                  corporate.data[year].total.sum.total -
                  corporate.data[+year - 1].total.sum.total,
                youth:
                  corporate.data[year].total.sum.youth -
                  corporate.data[+year - 1].total.sum.youth,
                manhood:
                  corporate.data[year].total.sum.manhood -
                  corporate.data[+year - 1].total.sum.manhood,
              },
            }),
            {}
          )
        : {},
    [corporate, last5Years]
  );
  const monthCnts = useMemo(
    () =>
      corporate
        ? last6Years.reduce(
            (s, year) => ({
              ...s,
              [year]: corporate.data[year].monthCnt,
            }),
            {}
          )
        : {},
    [last6Years, corporate]
  );

  const onItemClick = useCallback(
    (type: string) => dispatch(setType(type)),
    [dispatch]
  );
  useEffect(() => {
    if (!corporate) {
      navigate("/", { replace: true });
    }
  }, [corporate, navigate]);
  if (!corporate) return <></>;
  return (
    <StyledCalculator>
      <h1>{corporate.name}</h1>
      <div className="info">
        <Variation
          monthCnts={monthCnts}
          last5Years={last5Years}
          last6Years={last6Years}
          sum={generationSum}
          variation={variation}
        />
        <Controller type={type} onItemClick={onItemClick} />
      </div>
      {type &&
        (type === "social" ? (
          <SocialInsurance
            last5Years={last5Years}
            data={{ paymentSum, generationSum, variation }}
            monthCnts={monthCnts}
          />
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
