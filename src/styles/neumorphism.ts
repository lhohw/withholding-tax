import { css } from "@emotion/react";

export const whiteNeumorphism = (borderRadius = "50%") => css`
  border-radius: ${borderRadius};
  background: #eae8e8;
  box-shadow: 10px 10px 20px #969494, -10px -10px 20px #ffffff;
`;
