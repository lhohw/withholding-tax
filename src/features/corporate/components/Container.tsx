import React from "react";
import { css } from "@emotion/react";

const CorporateContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      margin: 1rem 0 3rem 0;
      width: 1175px;
    `}
  >
    {children}
  </div>
);

export default CorporateContainer;
