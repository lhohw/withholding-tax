import styled from "@emotion/styled";

import useCorporate from "hooks/useCorporate";

import Input from "components/Input";
import SocialInsuranceResult from "components/SocialInsuranceResult";

const SocialInsurance = () => {
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  return (
    <SocialInsuranceWrapper>
      <SocialInsuranceCodeInput
        stateKey="socialInsuranceCode"
        title="사회보험요율 코드"
        placeholder="Code"
        RN={RN}
      />
      <SocialInsuranceResult />
    </SocialInsuranceWrapper>
  );
};

const SocialInsuranceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 6rem 3rem 6rem;
  margin: 2rem 0;
  @media (max-width: 1240px) {
    align-items: flex-start;
  }
`;

const SocialInsuranceCodeInput = styled(Input)`
  margin: 3rem 0;
`;

export default SocialInsurance;
