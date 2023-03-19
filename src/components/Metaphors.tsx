import { css } from "@emotion/react";
import Printer from "./Printer";
import Darkmode from "./Darkmode";
import Reader from "./Reader";

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
