import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { lightOrangeGradient } from "styles/gradient";
import { whiteNeumorphism } from "styles/neumorphism";

export type MetaphorButtonProps = {
  className?: string;
  title: string;
  to?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const MetaphorButton = ({
  className,
  title,
  to,
  children,
  onClick,
}: MetaphorButtonProps) => {
  const Button = (props: any) =>
    to ? <Link to={to} {...props} /> : <button {...props} onClick={onClick} />;
  return (
    <Button
      className={className}
      css={css`
        ${whiteNeumorphism("8px")};
        background-color: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        border: 1px solid var(--placeholder);
        padding: 0;
        text-decoration: none;
        color: inherit;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-bottom: 1px dashed var(--navy);
          border-radius: 8px 8px 0 0;
          background: ${lightOrangeGradient};
          font-size: 0.9rem;
          font-weight: bold;
          padding: 0.3rem 0.8rem;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          display: flex;
          padding: 0.5rem 0;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: rgba(254, 254, 254, 0.376);
          font-size: 1.5rem;
          border-radius: 0 0 8px 8px;
          cursor: pointer;
          transition: color 0.25s ease-in-out;
          color: var(--black);
          &:hover {
            color: var(--light-orange);
          }
        `}
      >
        {children}
      </div>
    </Button>
  );
};

export default MetaphorButton;
