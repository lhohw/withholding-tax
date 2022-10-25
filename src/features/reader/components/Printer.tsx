import React, { useCallback } from "react";
import { css } from "@emotion/react";

import * as font from "constants/font";

import { AiFillPrinter } from "react-icons/ai";

const Printer = () => {
  const onPrint = useCallback(() => window.print(), []);
  return (
    <button onClick={onPrint}>
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
    </button>
  );
};

export default React.memo(Printer);
