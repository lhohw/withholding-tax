import { css } from "@emotion/react";
import { IoMdHome } from "react-icons/io";

import MetaphorButton from ".";

const HomeButton = () => {
  return (
    <MetaphorButton
      title="홈"
      to={"/"}
      css={css`
        margin-right: 2.5rem;
      `}
    >
      <IoMdHome
        css={css`
          display: flex;
          flex: 1;
        `}
        size={40}
      />
    </MetaphorButton>
  );
};

export default HomeButton;
