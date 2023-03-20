import { css } from "@emotion/react";
import { AiFillInsurance } from "react-icons/ai";

import MetaphorButton from ".";

const SocialInsuranceButton = () => {
  return (
    <MetaphorButton
      title="사회보험"
      to={"/calculator"}
      css={css`
        margin-right: 2.5rem;
      `}
    >
      <AiFillInsurance
        css={css`
          display: flex;
          flex: 1;
        `}
        size={40}
      />
    </MetaphorButton>
  );
};

export default SocialInsuranceButton;
