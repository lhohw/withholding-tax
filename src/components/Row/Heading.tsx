import type { RowProps } from ".";

import { css } from "@emotion/react";

import { darkOrangeGradient } from "styles/gradient";

import Row from ".";

const Heading = (props: RowProps) => (
  <Row
    {...props}
    isHeading
    css={css`
      border-bottom: 1.2px dashed var(--navy);
      ${darkOrangeGradient}
    `}
  />
);

export default Heading;
