import { css } from "@emotion/react";

import Reader from "./Metaphor/Reader";
import Darkmode from "./Metaphor/Darkmode";
import Printer from "./Metaphor/Printer";

const Metaphors = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-left: 3rem;
        @media (max-width: 768px) {
          margin: 1rem;
        }
      `}
    >
      <Reader />
      <Darkmode />
      <Printer />
    </div>
  );
};

export default Metaphors;
