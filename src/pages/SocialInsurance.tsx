import styled from "@emotion/styled";

import Input from "components/Input";
import Variation from "components/Variation";
import SocialInsuranceResult from "components/SocialInsuranceResult";

import { whiteNeumorphism } from "styles/neumorphism";
import useCorporate from "hooks/useCorporate";

const SocialInsurance = () => {
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  return (
    <SocialInsuranceWrapper>
      <Input
        stateKey="socialInsuranceCode"
        title="사회보험요율 코드"
        placeholder="Code"
        RN={RN}
      />
      <Variation />
      <SocialInsuranceResult />
    </SocialInsuranceWrapper>
  );
};

const SocialInsuranceWrapper = styled.div`
  padding: 3rem 6rem;
  margin: 2rem 0;
  min-width: 1150px;
  ${whiteNeumorphism("0")};
`;

export default SocialInsurance;
