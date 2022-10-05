import React, { useCallback } from "react";

import Stats from "./Stats";
import CalculateButton from "./CalculateButton";
import styled from "@emotion/styled";

import * as font from "constants/font";
import colors from "constants/colors";

import { numberRegex } from "constants/regex";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { CorporateState, setMonth } from "../corporateSlice";

type HeaderProps = {
  corporateName: string;
  year: string;
  sum: CorporateState["data"][string]["total"]["sum"];
  variation: CorporateState["data"][string]["total"]["sum"];
};
const CorporateHeader = ({
  corporateName,
  year,
  sum,
  variation,
}: HeaderProps) => {
  const dispatch = useAppDispatch();

  const { month } = useAppSelector((state) => state.corporate.data[year]);
  const onMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const month = e.target.value;
      if (numberRegex.exec(month) || parseInt(month) > 12) return;
      dispatch(setMonth({ year, month: parseInt(month || "0") }));
    },
    [year, dispatch]
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
        month={month}
        onMonthChange={onMonthChange}
      />
      <CalculateButton />
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
