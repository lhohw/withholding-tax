import styled from "@emotion/styled";

import Logo from "./Logo";
import CalculatorButton from "./CalculatorButton";
import CorporateAccordian from "./CorporateAccordian";
import YearAccordian from "./YearAccordian";
import Metaphors from "./Metaphors";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <ContentWrapper>
        <CalculatorButton />
        <CorporateAccordian />
        <YearAccordian />
        <Metaphors />
      </ContentWrapper>
    </HeaderWrapper>
  );
};

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
`;
export default Header;
