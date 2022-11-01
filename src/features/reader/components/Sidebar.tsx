import { css } from "@emotion/react";
import colors from "constants/colors";
import * as font from "constants/font";

type SidebarProps = {
  children: React.ReactNode;
};
const Sidebar = ({ children }: SidebarProps) => (
  <nav
    css={css`
      position: fixed;
      right: 0;
      padding: 1rem;
      margin: 0;
      border-bottom: 0.5px solid ${colors.black700};
      box-shadow: 0 3px 3px ${colors.blue700};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      @media (max-width: 1400px) {
        display: none;
      }
      @media print {
        display: none;
      }
      & .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: 2rem;
        & > button {
          display: flex;
          width: 60%;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          margin-top: 1.5rem;
          border: 0.5px solid var(--text);
          border-radius: 6px;
          box-shadow: 1px 1px 2px var(--text);
          font-size: ${font.size.medium};
          color: var(--text);
          background-color: var(--background);
          cursor: pointer;
          &:last-of-type {
            margin-top: 3rem;
          }
        }
      }
    `}
  >
    {children}
  </nav>
);

export default Sidebar;
