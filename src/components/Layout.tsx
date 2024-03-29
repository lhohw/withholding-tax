import { css } from "@emotion/react";

export type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      @media (max-width: 1260px) {
        overflow-x: scroll;
      }
    `}
  >
    <div
      css={css`
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  </div>
);

export default Layout;
