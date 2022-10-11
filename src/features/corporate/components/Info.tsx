import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import CheckBox from "components/CheckBox";
import Item from "components/Item";
import { CorporateState } from "features/corporate/corporateSlice";

export type InfoProps = {
  id: string;
  info: CorporateState[string]["data"][string]["personnel"][string]["info"];
  onToggle: (id: string) => void;
};
const sizes = [60, 80, 80, 100];
const Info = ({ id, info, onToggle }: InfoProps) => {
  const {
    name,
    checked,
    date: { start, retirement, birth },
  } = info;
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

export const InfoHeading = React.memo(
  ({ data = ["이름", "입사", "퇴사", "생년월일"] }: { data?: string[] }) => (
    <InfoContainer>
      {[50, 60, 80, 80, 100].map((width, idx) => (
        <Item
          key={idx}
          css={css`
            width: ${width}px;
          `}
        >
          {5 - data.length <= idx ? data[idx - (5 - data.length)] : ""}
        </Item>
      ))}
    </InfoContainer>
  ),
  () => true
);

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: row;
`;

export default React.memo(
  Info,
  (prevProps, nextProps) => prevProps.info === nextProps.info
);
