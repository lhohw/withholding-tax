import type { ReaderState } from "../readerSlice";

import Item from "components/Item";
import * as font from "constants/font";
import colors from "constants/colors";
import styled from "@emotion/styled";

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
  <StyledCorporates>
    {Object.entries(corporates).map(([key, value]) => (
      <StyledCorporateItem
        key={key}
        RN={key}
        selectedCorporate={selectedCorporate}
        onClick={() => onSelect({ type: "corporate", data: key })}
      >
        {value.name}
      </StyledCorporateItem>
    ))}
  </StyledCorporates>
);

const StyledCorporates = styled.ul`
  padding: 1rem;
  font-weight: bold;
  font-size: ${font.size.medium};
  display: flex;
  flex-direction: column;
`;
type CorporateItemProps = {
  selectedCorporate: string;
  RN: string;
};
const StyledCorporateItem = styled(Item)<CorporateItemProps>`
  color: ${(props) =>
    props.RN === props.selectedCorporate ? colors.main : colors.black400};
  border: 1px solid ${colors.main};
  border-radius: 6px;
  cursor: pointer;
  & + li {
    margin-top: 1rem;
  }
`;

export default Corporates;
