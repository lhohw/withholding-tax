import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import CheckBox from "components/CheckBox";
import Item from "components/Item";
import { CorporateState } from "features/corporate/corporateSlice";

import { AiOutlineExpandAlt, AiOutlineShrink } from "react-icons/ai";

export type InfoProps = {
  id: string;
  info: CorporateState[string]["data"][string]["personnel"][string]["info"];
  onToggle: (id: string) => void;
};
const Info = ({ id, info, onToggle }: InfoProps) => {
  const {
    name,
    checked,
    birth,
    date: { start, retirement },
  } = info;
  const sizes = useMemo(() => [60, 80, 80, 100], []);
  return (
    <InfoContainer>
      <CheckBox id={id} checked={checked} onToggle={onToggle} />
      {[name, start, retirement, birth].map((d, i) => (
        <Item
          key={i}
          css={css`
            width: ${sizes[i] + "px"};
            font-size: 0.75rem;
            &:nth-of-type(2) {
              align-items: flex-start;
            }
          `}
        >
          {d}
        </Item>
      ))}
    </InfoContainer>
  );
};

type InfoHeadingProps = {
  data?: string[];
  isExpand?: boolean;
  setIsExpand?: (isExpand: boolean) => void;
};
export const InfoHeading = React.memo(
  ({
    data = ["", "이름", "입사", "퇴사", "생년월일"],
    isExpand,
    setIsExpand,
  }: InfoHeadingProps) => (
    <InfoContainer>
      {[50, 60, 80, 80, 100].map((width, idx) => (
        <Item
          key={idx}
          css={css`
            width: ${width}px;
            cursor: ${idx === 0 && setIsExpand ? "pointer" : "default"};
          `}
          tabIndex={idx === 0 && setIsExpand ? 0 : undefined}
          onClick={() => {
            if (idx === 0 && setIsExpand) {
              setIsExpand(!isExpand);
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && idx === 0 && setIsExpand) {
              setIsExpand(!isExpand);
            }
          }}
        >
          {idx === 0 ? (
            isExpand === undefined ? (
              ""
            ) : isExpand === true ? (
              <AiOutlineShrink size={30} />
            ) : (
              <AiOutlineExpandAlt size={30} />
            )
          ) : 5 - data.length <= idx ? (
            data[idx - (5 - data.length)]
          ) : (
            ""
          )}
        </Item>
      ))}
    </InfoContainer>
  )
);

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: row;
`;

export default React.memo(
  Info,
  (prevProps, nextProps) => prevProps.info === nextProps.info
);
