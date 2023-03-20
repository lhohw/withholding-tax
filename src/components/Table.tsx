import { css } from "@emotion/react";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";
import useCorporates from "hooks/useCorporates";

import TableHeading from "./TableHeading";
import TableData from "./TableData";
import TableResult from "./TableResult";
import Statistics from "./Statistics";

const Table = () => {
  const { selectedYear } = useYear();
  const { selectedCorporate } = useCorporate();
  const { corporates } = useCorporates();

  return (
    <TableWrapper>
      {!selectedYear.selected || !selectedCorporate.selected ? (
        <div
          css={css`
            font-size: 2rem;
            color: var(--black);
            background: var(--main-gradient);
            text-shadow: 1px 1px 5px var(--placeholder);
          `}
        >
          {`Please Select ${!selectedCorporate ? "CORPORATE" : "YEAR"}`}
        </div>
      ) : (
        <>
          <Statistics
            corporate={corporates[selectedCorporate.selected]}
            year={selectedYear.selected}
          />
          <TableHeading />
          <TableData
            corporate={corporates[selectedCorporate.selected]}
            year={selectedYear.selected}
          />
          <TableResult
            corporate={corporates[selectedCorporate.selected]}
            year={selectedYear.selected}
          />
        </>
      )}
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
