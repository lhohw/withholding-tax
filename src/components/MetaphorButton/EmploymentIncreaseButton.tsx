import { css } from "@emotion/react";
import { BsPersonUp } from "react-icons/bs";

import MetaphorButton from ".";

const EmploymentIncreaseButton = () => {
  return (
    <MetaphorButton
      title="고용증대"
      to={"/employmentIncrease"}
      css={css`
        margin-right: 2.5rem;
      `}
    >
      <BsPersonUp
        css={css`
          display: flex;
          flex: 1;
        `}
        size={40}
      />
    </MetaphorButton>
  );
};

export default EmploymentIncreaseButton;
