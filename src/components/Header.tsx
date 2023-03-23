import styled from "@emotion/styled";

import Logo from "./Logo";

import HomeButton from "./MetaphorButton/HomeButton";
import SocialInsuranceButton from "./MetaphorButton/SocialInsuranceButton";
import EmploymentIncreaseButton from "./MetaphorButton/EmploymentIncreaseButton";

import CorporateAccordian from "./Accordian/CorporateAccordian";
import YearAccordian from "./Accordian/YearAccordian";
import Metaphors from "./Metaphors";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <ContentWrapper>
        <HomeButton />
        <SocialInsuranceButton />
        <EmploymentIncreaseButton />
        <AccordianWrapper>
          <CorporateAccordian />
          <YearAccordian />
        </AccordianWrapper>
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
  flex-wrap: wrap;
`;

const AccordianWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export default Header;
