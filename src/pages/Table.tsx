import { useMemo } from "react";
import styled from "@emotion/styled";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";
import useCorporates from "hooks/useCorporates";

import TableHeading from "components/TableHeading";
import TableData from "components/TableData";
import TableResult from "components/TableResult";
import Statistics from "components/Statistics";
import { whiteNeumorphism } from "styles/neumorphism";

const Table = () => {
  const {
    selectedYear: { selected: year },
  } = useYear();
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  const { corporates } = useCorporates();

  const corporate = useMemo(() => corporates[RN], [corporates, RN]);
  return (
    <TablePageWrapper>
      <Statistics corporate={corporate} year={year} />
      <TableWrapper>
        <TableHeading />
        <TableData corporate={corporate} year={year} />
        <TableResult corporate={corporate} year={year} />
      </TableWrapper>
    </TablePageWrapper>
  );
};

const TablePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  @media (max-width: 1240px) {
    align-items: flex-start;
  }
`;

const TableWrapper = styled.div`
  ${whiteNeumorphism("0")};
`;

export default Table;
