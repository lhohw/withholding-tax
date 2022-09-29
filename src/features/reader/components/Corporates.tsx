import { css } from "@emotion/react";
import type { CorporateState } from "features/corporate/corporateSlice";
import Item from "components/Item";
import * as font from "constants/font";
import colors from "constants/colors";

type CorporatesProps = {
  corporates: CorporateState["list"];
  onCorporateClick: (id: string) => void;
  selected?: string;
};
const Corporates = ({
  corporates,
  onCorporateClick,
  selected,
}: CorporatesProps) => (
  <ul
    css={css`
      padding: 1rem;
      font-weight: bold;
      font-size: ${font.size.medium};
      display: flex;
      flex-direction: column;
      /* flex-direction: row;
      flex-wrap: wrap; */
      /* margin-left: 2rem; */
      /* max-width: 50vw; */
    `}
  >
    {Object.entries(corporates).map(([key, value]) => (
      <Item
        key={key}
        css={css`
          color: ${key === selected ? colors.main : colors.black400};
          border: 1px solid ${colors.main};
          border-radius: 6px;
          cursor: pointer;
          & + li {
            margin-top: 1rem;
          }
        `}
        onClick={() => onCorporateClick(key)}
      >
        {value.name}
      </Item>
    ))}
  </ul>
);

export default Corporates;
