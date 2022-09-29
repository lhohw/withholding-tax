import { css } from "@emotion/react";

import colors from "constants/colors";
import * as font from "constants/font";

type InputProps = {
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ onClick, onFileChange }: InputProps) => (
  <div
    css={css`
      display: flex;
      /* width: 100px; */
      padding: 0.5rem 0.5rem;
      margin: 2rem 1rem;
      align-items: center;
      justify-content: center;
      border: 1px solid ${colors.black600};
      border-radius: 6px;
      /* position: relative; */
      font-size: ${font.size.medium};
      cursor: pointer;
    `}
    onClick={onClick}
  >
    <label
      css={css`
        cursor: pointer;
      `}
      htmlFor="reader"
    >
      PDF 불러오기
    </label>
    <input
      id="reader"
      css={css`
        display: none;
      `}
      name="reader"
      title="PDF 불러오기"
      type="file"
      accept=".pdf"
      onChange={onFileChange}
      multiple
    />
  </div>
);

export default Input;
