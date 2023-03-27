import { useMemo } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

import { CorporateSizes } from "constants/deduction";

import CorporateButtons from "components/CorporateButtons";
import CapitalButtons from "components/CapitalButtons";
import TextFallback from "components/TextFallback";
import EmploymentIncreaseTable from "components/EmploymentIncreaseTable";

const EmploymentIncrease = () => {
  const [params] = useSearchParams();
  const size = params.get("size") || null;
  const isCapital = params.get("isCapital") || null;
  const message = useMemo(
    () =>
      `Please Select ${
        isCapital === null ? "CAPITAL STATUS" : "CORPORATE SIZE"
      }`,
    [isCapital]
  );
  return (
    <EmploymentIncreaseWrapper>
      <ButtonsWrapper>
        <CapitalButtons />
        <CorporateButtons />
      </ButtonsWrapper>
      <TableWrapper>
        {String(size) === "null" || String(isCapital) === "null" ? (
          <TextFallback message={message} />
        ) : (
          <EmploymentIncreaseTable
            size={size as CorporateSizes}
            isCapital={isCapital!}
          />
        )}
      </TableWrapper>
    </EmploymentIncreaseWrapper>
  );
};
const EmploymentIncreaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  @media (max-width: 1240px) {
    align-items: flex-start;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 1rem;
  & > div + div {
    margin-left: 4rem;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
`;

export default EmploymentIncrease;
