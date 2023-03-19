import styled from "@emotion/styled";

import * as font from "constants/font";

export type ItemProps = {
  width?: number;
};

const Item = styled.li<ItemProps>`
  display: ${(props) => (props.width === 0 ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: ${(props) => (props.width || 0) + "px"};
  width: ${(props) => (props.width || 0) + "px"};
  font-size: ${font.size.medium};
  padding: 0.5rem;
  white-space: nowrap;
  overflow-x: scroll;
  transition: color 0.25s ease-in-out;
  &:nth-of-type(2) {
    align-items: flex-start;
  }
`;

export default Item;
