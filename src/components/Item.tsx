import styled from "@emotion/styled";

import * as font from "constants/font";

export type ItemProps = {
  width?: number;
  children?: string | React.ReactNode;
};

const Item = styled.li<ItemProps>`
  overflow: hidden;
  display: ${(props) => (props.width === 0 ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: ${(props) => (props.width || 0) + "px"};
  width: ${(props) => (props.width || 0) + "px"};
  font-size: ${(props) =>
    props.children &&
    typeof props.children === "string" &&
    props.children.length >= 11
      ? font.size.small
      : font.size.medium};
  padding: 0.5rem;
  white-space: nowrap;
  transition: color 0.15s ease-in-out;
  &:nth-of-type(2) {
    align-items: flex-start;
  }
`;

export default Item;
