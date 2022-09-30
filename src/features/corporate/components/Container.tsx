import React from "react";
import { css } from "@emotion/react";

const CorporateContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;
      padding-top: 2rem;
      width: 1175px;
    `}
  >
    {children}
  </div>
);

export default CorporateContainer;
