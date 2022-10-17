import React from "react";
import { css } from "@emotion/react";

import colors from "constants/colors";
import * as font from "constants/font";

import { AiFillPrinter } from "react-icons/ai";

const Printer = () => {
  return (
    <div
      css={css`
        display: flex;
        padding: 0.3rem;
        margin: 0.5rem 2rem;
        align-items: center;
        justify-content: center;
        border: 1px solid ${colors.black600};
        border-radius: 6px;
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
