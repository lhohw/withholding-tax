import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import { inputState } from "recoil/base";

import * as font from "constants/font";

export type InputProps = {
  stateKey: string;
  title: string;
  width?: number;
  placeholder?: string;
  RN?: string;
  className?: string;
};
const Input = ({
  stateKey,
  title,
  width = 100,
  placeholder,
  className,
  ...props
}: InputProps) => {
  const [value, setValue] = useRecoilState(inputState({ stateKey, ...props }));
  return (
    <label
      className={className}
      css={css`
        display: flex;
        font-weight: ${font.weight.bold};
        font-size: ${font.size.big};
      `}
    >
      {title}:
      <input
        css={css`
          margin-left: 1rem;
          width: ${width}px;
          background: transparent;
          border: none;
          border-bottom: 2px solid var(--placeholder);
          text-align: center;
          font-size: ${font.size.big};
          &:focus {
            outline: none;
          }
        `}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
