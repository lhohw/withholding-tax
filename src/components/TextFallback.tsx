import { css } from "@emotion/react";

export type TextFallbackProps = {
  message: string;
  className?: string;
};
const TextFallback = ({ message, className }: TextFallbackProps) => (
  <div
    className={className}
    css={css`
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      align-items: center;
      font-size: 2rem;
      color: var(--black);
      text-shadow: 1px 1px 5px var(--placeholder);
    `}
  >
    {message}
  </div>
);

export default TextFallback;
