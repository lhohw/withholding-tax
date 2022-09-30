import { css } from "@emotion/react";
import { getLastYears } from "lib/values";

import * as font from "constants/font";
import colors from "constants/colors";

type YearsProps = {
  selectedYear: string;
  onSelect: (props: { type: "corporate" | "year"; data: string }) => void;
};
const Years = ({ selectedYear, onSelect }: YearsProps) => (
  <ul
    css={css`
      display: flex;
      flex-direction: column;
      padding: 1rem;
      align-items: center;
      justify-content: space-around;
    `}
  >
    {getLastYears(6).map((year) => (
      <li
        key={year}
        css={css`
          font-size: ${font.size.base};
          font-weight: ${year === selectedYear
            ? font.weight.bold
            : font.weight.medium};
          color: ${year === selectedYear ? colors.main : colors.base};
          margin-top: 0.5rem;
          cursor: pointer;
        `}
        onClick={() => onSelect({ type: "year", data: year })}
      >
        {year}
      </li>
    ))}
  </ul>
);

export default Years;
