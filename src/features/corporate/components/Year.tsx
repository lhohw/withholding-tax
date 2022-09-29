import { css } from "@emotion/react";
import * as font from "constants/font";
import colors from "constants/colors";

const Year = ({ year }: { year: string }) => (
  <h2
    css={css`
      font-weight: ${font.weight.semibold};
      margin: 0.5rem 0 1rem 0;
      color: ${colors.sub};
    `}
  >
    {year}
  </h2>
);

export default Year;
