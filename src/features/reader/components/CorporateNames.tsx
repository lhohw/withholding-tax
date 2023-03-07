import type { ReaderState } from "../readerSlice";
import { useAppSelector } from "app/hooks";

import Item from "components/Item";
import * as font from "constants/font";
import colors from "constants/colors";
import styled from "@emotion/styled";

type CorporatesProps = {
  corporates: ReaderState["list"];
  onSelect: (props: { type: "year" | "corporate"; data: string }) => void;
  selectedCorporate: string;
};
const CorporateNames = ({
  corporates,
  selectedCorporate,
  onSelect,
}: CorporatesProps) => {
  const { theme } = useAppSelector((state) => state.darkMode);
  return (
    <StyledCorporates>
      {Object.entries(corporates).map(([key, value]) => (
        <StyledCorporateItem
          tabIndex={0}
          key={key}
          RN={key}
          theme={theme}
          selectedCorporate={selectedCorporate}
          onClick={() => onSelect({ type: "corporate", data: key })}
          onKeyDown={(e) => {
            if (e.code === "Enter") onSelect({ type: "corporate", data: key });
          }}
        >
          {value.name}
        </StyledCorporateItem>
      ))}
    </StyledCorporates>
  );
};

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
    props.RN === props.selectedCorporate
      ? colors.main
      : colors.placeholder[props.theme as "dark" | "light"]};
  border: ${(props) =>
    props.RN === props.selectedCorporate
      ? `1px solid ${colors.main}`
      : `1px solid ${colors.placeholder[props.theme as "dark" | "light"]}`};
  box-shadow: ${(props) =>
    `1px 1px 2px ${
      props.RN === props.selectedCorporate
        ? colors.main
        : colors.placeholder[props.theme as "dark" | "light"]
    }`};
  border-radius: 6px;
  cursor: pointer;
  & + li {
    margin-top: 1rem;
  }
`;

export default CorporateNames;
