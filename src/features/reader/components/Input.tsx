import { css } from "@emotion/react";
import * as font from "constants/font";

type InputProps = {
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ onClick, onFileChange }: InputProps) => (
  <div
    css={css`
      display: flex;
      padding: 0.5rem 0.5rem;
      margin: 2rem 1rem;
      align-items: center;
      justify-content: center;
      border: 0.5px solid var(--text);
      border-radius: 6px;
      box-shadow: 1px 1px 2px var(--text);
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
