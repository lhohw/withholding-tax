import type { ReaderState } from "../readerSlice";

import { css } from "@emotion/react";
import Item from "components/Item";
import * as font from "constants/font";
import colors from "constants/colors";

type CorporatesProps = {
  corporates: ReaderState["list"];
  onSelect: (props: { type: "year" | "corporate"; data: string }) => void;
  selectedCorporate: string;
};
const Corporates = ({
  corporates,
  selectedCorporate,
  onSelect,
}: CorporatesProps) => (
  <ul
    css={css`
      padding: 1rem;
      font-weight: bold;
      font-size: ${font.size.medium};
      display: flex;
      flex-direction: column;
    `}
  >
    {Object.entries(corporates).map(([key, value]) => (
      <Item
        key={key}
        css={css`
          color: ${key === selectedCorporate ? colors.main : colors.black400};
          border: 1px solid ${colors.main};
          border-radius: 6px;
          cursor: pointer;
          & + li {
            margin-top: 1rem;
          }
        `}
        onClick={() => onSelect({ type: "corporate", data: key })}
      >
        {value.name}
      </Item>
    ))}
  </ul>
);

export default Corporates;
