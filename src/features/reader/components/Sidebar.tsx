import { css } from "@emotion/react";
import colors from "constants/colors";

type SidebarProps = {
  children: React.ReactNode;
};
const Sidebar = ({ children }: SidebarProps) => (
  <header
    css={css`
      /* width: 100%; */
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
      @media (max-width: 1200px) {
        display: none;
      }
      & .column {
        flex-direction: column;
      }
    `}
  >
    {children}
  </header>
);

export default Sidebar;
