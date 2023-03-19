import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Metaphors from "./Metaphors";

import Logo from "./Logo";
import CorporateAccordian from "./CorporateAccordian";
import YearAccordian from "./YearAccordian";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-width: 1420px;
  border-bottom: 1px solid var(--yellow);
  padding: 1rem;
  flex-wrap: wrap;
  @media print {
    flex-wrap: nowrap;
    padding: 0;
    & > h1 {
      color: black;
    }
    & > div {
      flex-wrap: nowrap;
      margin-right: 0;
      & > div:nth-of-type(3) {
        display: none;
      }
    }
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
        <CorporateAccordian />
        <YearAccordian />
        <Metaphors />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
