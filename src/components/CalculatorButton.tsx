import { css } from "@emotion/react";
import { IoCalculator } from "react-icons/io5";

import MetaphorButton from "./MetaphorButton";

const CalculatorButton = () => {
  return (
    <MetaphorButton
      title="세액공제"
      to={"/calculator"}
      css={css`
        margin-right: 2.5rem;
      `}
    >
      <IoCalculator
        css={css`
          display: flex;
          flex: 1;
        `}
        size={40}
      />
    </MetaphorButton>
  );
};

export default CalculatorButton;
