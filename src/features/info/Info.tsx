import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CheckBox from "components/CheckBox";
import Item from "components/Item";
import { InfoState } from "./infoSlice";

import colors from "constants/colors";

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: row;
`;

export type InfoProps = {
  id: string;
  info: InfoState[string];
  onToggle: (id: string) => void;
};
const Info = ({ id, info, onToggle }: InfoProps) => {
  const {
    name,
    checked,
    date: { start, retirement, birth },
  } = info;
  return (
    <InfoContainer>
      <CheckBox id={id} checked={checked} onToggle={onToggle} />
      <Item width={60}>{name}</Item>
      <Item width={80}>{start}</Item>
      <Item width={80}>{retirement}</Item>
      <Item width={100}>{birth}</Item>
    </InfoContainer>
  );
};

Info.Heading = ({
  data = ["이름", "입사", "퇴사", "생년월일"],
}: {
  data?: string[];
}) => (
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
);

export default Info;