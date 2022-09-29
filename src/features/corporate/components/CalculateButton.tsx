import { css } from "@emotion/react";

const CalculateButton = () => (
  <div
    css={css`
      display: flex;
      justify-self: flex-end;
      border: 1px solid black;
      cursor: pointer;
      padding: 1rem;
    `}
  >
    Calculate
  </div>
);

export default CalculateButton;
