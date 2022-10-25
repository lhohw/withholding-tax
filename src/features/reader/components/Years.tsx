import React from "react";
import { getLastYears } from "lib/values";
import { useAppSelector } from "app/hooks";

import * as font from "constants/font";
import colors from "constants/colors";
import styled from "@emotion/styled";

type YearsProps = {
  selectedYear: string;
  onSelect: (props: { type: "corporate" | "year"; data: string }) => void;
};
const Years = ({ selectedYear, onSelect }: YearsProps) => {
  const { theme } = useAppSelector((state) => state.darkMode);
  return (
    <StyledYears>
      {getLastYears(6).map((year) => (
        <StyledYear
          tabIndex={0}
          key={year}
          year={year}
          theme={theme}
          selectedYear={selectedYear}
          onClick={() => onSelect({ type: "year", data: year })}
          onKeyDown={(e) => {
            if (e.code === "Enter") onSelect({ type: "year", data: year });
          }}
        >
          {year}
        </StyledYear>
      ))}
    </StyledYears>
  );
};

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
      props.year === props.selectedYear
        ? colors.main
        : colors.placeholder[props.theme as "dark" | "light"]};
  `,
  (prevProps, nextProps) =>
    (prevProps.selectedYear === prevProps.year) ===
      (nextProps.selectedYear === nextProps.year) &&
    prevProps.theme === nextProps.theme
);

export default React.memo(
  Years,
  (prevProps, nextProps) => prevProps.selectedYear === nextProps.selectedYear
);
