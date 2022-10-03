import Stats from "./Stats";
import CalculateButton from "./CalculateButton";
import { CorporateState } from "../corporateSlice";
import styled from "@emotion/styled";
import * as font from "constants/font";
import colors from "constants/colors";

type HeaderProps = {
  corporateName: string;
  year: string;
  total: CorporateState["data"][string]["total"]["generation"];
  variation: CorporateState["data"][string]["total"]["generation"];
};
const CorporateHeader = ({
  corporateName,
  year,
  total,
  variation,
}: HeaderProps) => (
  <StyledHeader>
    <div className="column">
      <h1>{corporateName}</h1>
      <h2>{year}</h2>
    </div>
    <Stats total={total} variation={variation} />
    <CalculateButton />
  </StyledHeader>
);

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  & .column {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-width: 300px;
    & h1 {
      font-weight: ${font.weight.bold};
      color: ${colors.main};
      margin: 0;
    }
    & h2 {
      font-weight: ${font.weight.semibold};
      color: ${colors.sub};
      margin: 0;
    }
  }
`;

export default CorporateHeader;
