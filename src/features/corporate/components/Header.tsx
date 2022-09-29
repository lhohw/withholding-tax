import { css } from "@emotion/react";
import * as font from "constants/font";
import colors from "constants/colors";

import Title from "./Title";
import Year from "./Year";
import Stats from "./Stats";
import CalculateButton from "./CalculateButton";
import { CorporateState } from "../corporateSlice";

type HeaderProps = {
  corporateName: string;
  year: string;
  total: CorporateState["data"][string]["total"]["generation"];
};
const CorporateHeader = ({ corporateName, year }: HeaderProps) => (
  <header
    css={css`
      width: 100%;
      display: flex;
      flex-direction: row;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        justify-content: space-around;
      `}
    >
      <Title title={corporateName} />
      <Year year={year} />
    </div>
    <Stats />
    <CalculateButton />
  </header>
);

export default CorporateHeader;
