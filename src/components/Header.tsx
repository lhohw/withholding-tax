import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Metaphors from "./Metaphors";

import Logo from "./Logo";
import CorporateSelector from "./CorporateSelector";
import YearSelector from "./YearSelector";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  border-bottom: 1px solid var(--yellow);
  padding: 1rem;
  flex-wrap: wrap;
  @media print {
    display: none;
  }
`;
const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: auto;
          margin-right: 2rem;
          flex-wrap: wrap-reverse;
        `}
      >
        <CorporateSelector />
        <YearSelector />
        <Metaphors />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
