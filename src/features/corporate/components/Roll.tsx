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
  personnel: CorporateState[string]["data"][string]["personnel"];
};
const CorporateRoll = ({
  onToggle,
  onToggleItem,
  personnel,
}: CorporateRollProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const datas = useMemo(() => Object.entries(personnel), [personnel]);
  const paymentTitle = useMemo(() => ({ youth: -1, manhood: -1 }), []);
  const generationTitle = useMemo(
    () => new Array(12).fill(0).map((_, i) => `${i + 1}월`),
    []
  );
  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      const [id, { info, payment, generation }] = datas[index];
      return (
        <div style={style} key={key}>
          <CorporateRow
            info={info}
            id={id}
            onToggleItem={onToggleItem}
            onToggle={onToggle}
            payments={payment}
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
        payments={paymentTitle}
        generations={generationTitle}
      />
      {datas.length < 10 ? (
        datas.map(([id, { info, payment, generation }]) => {
          return (
            <CorporateRow
              key={id}
              info={info}
              id={id}
              onToggleItem={onToggleItem}
              onToggle={onToggle}
              payments={payment}
              generations={generation}
            />
          );
        })
      ) : (
        // @ts-ignore
        <List
          width={1175}
          height={isExpand ? datas.length * 40 + 1 : 421}
          rowCount={datas.length}
          rowHeight={40}
          rowRenderer={rowRenderer}
          list={datas}
          style={{ overflowY: "scroll" }}
        />
      )}
    </CorporateRollContainer>
  );
};

const CorporateRollContainer = styled.ul<{ isExpand: boolean; maxLen: number }>`
  display: flex;
  flex-direction: column;
  max-height: ${(props) =>
    props.isExpand ? (props.maxLen + 1) * 40 + 1 + "px" : "420px"};
  width: 1175px;
  overflow-y: scroll;
  border-bottom: 1px dotted ${colors.main};
  transition: all 0.4s ease-in-out;
`;

export default React.memo(CorporateRoll);
