import styled from "@emotion/styled";

import * as font from "constants/font";

export type ItemProps = {
  width?: number;
};

const Item = styled.li<ItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: ${(props) => props.width + "px"};
  width: ${(props) => props.width + "px"};
  font-size: ${font.size.medium};
  padding: 0.5rem;
  white-space: nowrap;
  overflow-x: scroll;
`;

export default Item;
