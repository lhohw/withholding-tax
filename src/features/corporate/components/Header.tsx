import React, { useCallback } from "react";

import Stats from "./Stats";
import CalculateButton from "./CalculateButton";
import styled from "@emotion/styled";

import * as font from "constants/font";
import colors from "constants/colors";

import { numberRegex } from "constants/regex";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { CorporateState, setMonthCnt } from "../corporateSlice";

type HeaderProps = {
  RN: string;
  corporateName: string;
  year: string;
  sum: CorporateState[string]["data"][string]["total"]["sum"];
  variation: CorporateState[string]["data"][string]["total"]["sum"];
};
const CorporateHeader = ({
  RN,
  corporateName,
  year,
  sum,
  variation,
}: HeaderProps) => {
  const dispatch = useAppDispatch();

  const { monthCnt } = useAppSelector(
    (state) => state.corporate[RN].data[year]
  );
  const onMonthCntChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const monthCnt = e.target.value;
      if (numberRegex.exec(monthCnt) || parseInt(monthCnt) > 12) return;
      const storageMonthCnts = JSON.parse(
        sessionStorage.getItem("monthCnts") || "{}"
      );
      sessionStorage.setItem(
        "monthCnts",
        JSON.stringify({
          ...storageMonthCnts,
          [RN]: {
            ...storageMonthCnts[RN],
            [year]: parseInt(monthCnt || "0"),
          },
        })
      );
      dispatch(setMonthCnt({ year, monthCnt: parseInt(monthCnt || "0"), RN }));
    },
    [year, dispatch, RN]
  );
  return (
    <StyledHeader>
      <div className="column">
        <h1>{corporateName}</h1>
        <h2>{year}</h2>
      </div>
      <Stats
        sum={sum}
        variation={variation}
        monthCnt={monthCnt}
        onMonthCntChange={onMonthCntChange}
      />
      <CalculateButton RN={RN} />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  & .column {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-width: 300px;
    & h1 {
      font-weight: ${font.weight.bold};
      color: ${colors.main};
      margin: 0;
    }
    & h2 {
      font-weight: ${font.weight.semibold};
      color: ${colors.sub};
      margin: 0;
    }
  }
`;

export default CorporateHeader;
