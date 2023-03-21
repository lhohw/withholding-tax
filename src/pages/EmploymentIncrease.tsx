import { css } from "@emotion/react";

import Variation from "components/Variation";

const EmploymentIncrease = () => {
  return (
    <EmploymentIncreaseWrapper>
      <Variation />
    </EmploymentIncreaseWrapper>
  );
};

const EmploymentIncreaseWrapper = ({
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

export default EmploymentIncrease;
