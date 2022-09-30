import { css } from "@emotion/react";

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
const CorporateHeader = ({ corporateName, year, total }: HeaderProps) => (
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
    <Stats total={total} />
    <CalculateButton />
  </header>
);

export default CorporateHeader;
