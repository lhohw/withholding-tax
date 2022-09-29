import { css } from "@emotion/react";
import * as font from "constants/font";
import colors from "constants/colors";

const Title = ({ title }: { title: string }) => (
  <h1
    css={css`
      font-weight: ${font.weight.bold};
      margin: 0.5rem 0;
      color: ${colors.main};
    `}
  >
    {title}
  </h1>
);

export default Title;
