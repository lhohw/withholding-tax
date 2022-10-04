import React from "react";
import { getLastYears } from "lib/values";

import * as font from "constants/font";
import colors from "constants/colors";
import styled from "@emotion/styled";

type YearsProps = {
  selectedYear: string;
  onSelect: (props: { type: "corporate" | "year"; data: string }) => void;
};
const Years = ({ selectedYear, onSelect }: YearsProps) => (
  <StyledYears>
    {getLastYears(6).map((year) => (
      <StyledYear
        key={year}
        year={year}
        selectedYear={selectedYear}
        onClick={() => onSelect({ type: "year", data: year })}
      >
        {year}
      </StyledYear>
    ))}
  </StyledYears>
);

const StyledYears = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  justify-content: space-around;
`;
type YearProps = {
  year: string;
  selectedYear: string;
};
const StyledYear = React.memo(
  styled.li<YearProps>`
    font-size: ${font.size.base};
    margin-top: 0.5rem;
    cursor: pointer;
    font-weight: ${(props) =>
      props.year === props.selectedYear
        ? font.weight.bold
        : font.weight.medium};
    color: ${(props) =>
      props.year === props.selectedYear ? colors.main : colors.base};
  `,
  (prevProps, nextProps) =>
    (prevProps.selectedYear === prevProps.year) ===
    (nextProps.selectedYear === nextProps.year)
);

export default React.memo(
  Years,
  (prevProps, nextProps) => prevProps.selectedYear === nextProps.selectedYear
);
