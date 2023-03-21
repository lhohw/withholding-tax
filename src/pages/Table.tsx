import { useMemo } from "react";
import { css } from "@emotion/react";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";
import useCorporates from "hooks/useCorporates";

import TableHeading from "components/TableHeading";
import TableData from "components/TableData";
import TableResult from "components/TableResult";
import Statistics from "components/Statistics";

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
    <TableWrapper>
      <Statistics corporate={corporate} year={year} />
      <TableHeading />
      <TableData corporate={corporate} year={year} />
      <TableResult corporate={corporate} year={year} />
    </TableWrapper>
  );
};

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 0;
    `}
  >
    <div
      css={css`
        background: #eae8e8;
        box-shadow: 22px 22px 66px #b2b0b0, -22px -22px 66px #ffffff;
        @media print {
          box-shadow: none;
        }
      `}
    >
      {children}
    </div>
  </div>
);

export default Table;
