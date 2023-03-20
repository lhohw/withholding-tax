import { useCallback } from "react";
import { css } from "@emotion/react";
import { ListRowRenderer, List } from "react-virtualized";
import { useRecoilState } from "recoil";

import Corporate from "models/Corporate";
import { toggleState } from "recoil/base";

import useCorporate from "hooks/useCorporate";

import RowRenderer from "./RowRenderer";

export type TableDataProps = {
  corporate: Corporate;
  year: string;
};
const TableData = ({ corporate, year }: TableDataProps) => {
  const [isSpread] = useRecoilState(toggleState("spread"));

  const { filterEmployees } = useCorporate();
  const filteredEmployees = filterEmployees(corporate.employees, year);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ key, index, style }) => {
      const employee = filteredEmployees[index];
      return <RowRenderer key={key} style={style} employee={employee} />;
    },
    [filteredEmployees]
  );

  return (
    // @ts-ignore
    <List
      css={css`
        overflow-y: scroll;
        transition: 0.4s height ease-in-out;
      `}
      width={1240}
      height={
        isSpread
          ? filteredEmployees?.length * 40
          : Math.min(filteredEmployees.length * 40, 400)
      }
      rowCount={filteredEmployees.length}
      rowHeight={40}
      rowRenderer={rowRenderer}
      list={filteredEmployees}
    />
  );
};
export default TableData;
