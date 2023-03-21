import { css } from "@emotion/react";

import Input from "components/Input";
import Variation from "components/Variation";

const SocialInsurance = () => {
  return (
    <SocialInsuranceWrapper>
      <Input stateKey="socialInsuranceCode" title="사회보험요율" />
      <Variation />
    </SocialInsuranceWrapper>
  );
};

const SocialInsuranceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    css={css`
      padding: 2rem;
    `}
  >
    {children}
  </div>
);

export default SocialInsurance;
