import { css } from "@emotion/react";
import { whiteNeumorphism } from "styles/neumorphism";

export type MetaphorProps = {
  title: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Metaphor = ({ title, children, onClick }: MetaphorProps) => {
  return (
    <button
      title={title}
      css={css`
        width: 35px;
        height: 35px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        color: var(--orange);
        cursor: pointer;
        transition: 0.4s transform ease-in-out, 0.4s border-color ease-in-out;
        border: 1px solid transparent;
        ${whiteNeumorphism()}
        &:hover {
          transform: scale(1.1);
          border-color: var(--orange);
        }
        & + & {
          margin-left: 1rem;
        }
        padding: 0.3rem;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Metaphor;
