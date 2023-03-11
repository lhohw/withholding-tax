import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { ListRowRenderer, List } from "react-virtualized";

import colors from "constants/colors";

import { CorporateRow } from "./index";
import { CorporateState } from "../corporateSlice";

type CorporateRollProps = {
  onToggle: (id: string) => void;
  onToggleItem: (
    id: string,
    idx: number,
    content: "청년" | "장년" | "-" | "퇴사"
  ) => void;
  employees: CorporateState[string]["data"][string]["employees"];
};
const CorporateRoll = ({
  onToggle,
  onToggleItem,
  employees,
}: CorporateRollProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const datas: [
    string,
    CorporateState[string]["data"][string]["employees"][string]
  ][] = useMemo(() => {
    const p = Object.entries(employees);
    return [
      ...p.filter((person) => !!person[1].info.date.start),
      ...p.filter((person) => !person[1].info.date.start),
    ];
  }, [employees]);
  const salaryTitle = useMemo(() => ({ youth: -1, manhood: -1 }), []);
  const generationTitle = useMemo(
    () => new Array(12).fill(0).map((_, i) => `${i + 1}월`),
    []
  );
  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      const [id, { info, salary, generation }] = datas[index];
      return (
        <div style={style} key={key}>
          <CorporateRow
            index={index}
            info={info}
            id={id}
            onToggleItem={onToggleItem}
            onToggle={onToggle}
            payments={salary}
            generations={generation}
          />
        </div>
      );
    },
    [datas, onToggle, onToggleItem]
  );
  return (
    <CorporateRollContainer isExpand={isExpand} maxLen={datas.length}>
      <CorporateRow
        isExpand={isExpand}
        setIsExpand={setIsExpand}
        isHeading
        type={"heading"}
        payments={salaryTitle}
        generations={generationTitle}
      />
      {/*@ts-ignore*/}
      <List
        width={1175}
        height={isExpand ? datas.length * 40 : Math.min(datas.length * 40, 420)}
        rowCount={datas.length}
        rowHeight={40}
        rowRenderer={rowRenderer}
        list={datas}
        style={{ overflowY: "scroll", transition: "all 0.4s ease-in-out" }}
      />
    </CorporateRollContainer>
  );
};

const CorporateRollContainer = styled.ul<{ isExpand: boolean; maxLen: number }>`
  display: flex;
  flex-direction: column;
  width: 1175px;
  overflow-y: hidden;
  border-bottom: 1px dotted ${colors.main};
`;

export default React.memo(CorporateRoll);
