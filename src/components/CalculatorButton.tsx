import { css } from "@emotion/react";
import { IoCalculator } from "react-icons/io5";

import MetaphorButton from "./MetaphorButton";

const CalculatorButton = () => {
  return (
    <MetaphorButton
      title="세액공제"
      to={"/calculator"}
      css={css`
        margin-left: 2.5rem;
      `}
    >
      <IoCalculator
        css={css`
          display: flex;
          flex: 1;
          width: 100%;
          height: 100%;
          margin: 1.2rem;
        `}
      />
    </MetaphorButton>
  );
};

export default CalculatorButton;
