import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import { inputState } from "recoil/base";

import * as font from "constants/font";

export type InputProps = {
  stateKey: string;
  title: string;
  width?: number;
};
const Input = ({ stateKey, title, width = 100 }: InputProps) => {
  const [value, setValue] = useRecoilState(inputState({ stateKey }));
  return (
    <label
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
      />
    </label>
  );
};

export default Input;
