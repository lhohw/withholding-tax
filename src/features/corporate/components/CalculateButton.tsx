import { css } from "@emotion/react";

const CalculateButton = () => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      cursor: pointer;
      padding: 1rem;
    `}
  >
    Calculate
  </div>
);

export default CalculateButton;
