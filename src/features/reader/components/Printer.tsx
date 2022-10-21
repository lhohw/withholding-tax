import { css } from "@emotion/react";

import * as font from "constants/font";

import { AiFillPrinter } from "react-icons/ai";

const Printer = () => {
  return (
    <div
      css={css`
        display: flex;
        padding: 0.3rem;
        margin: 1rem 2rem;
        align-items: center;
        justify-content: center;
        border: 0.5px solid var(--text);
        border-radius: 6px;
        box-shadow: 1px 1px 2px var(--text);
        cursor: pointer;
      `}
      onClick={() => window.print()}
    >
      <AiFillPrinter size={20} />
      <span
        css={css`
          margin-left: 1rem;
          font-weight: ${font.weight.bold};
          font-size: ${font.size.base};
        `}
      >
        print
      </span>
    </div>
  );
};

export default Printer;
