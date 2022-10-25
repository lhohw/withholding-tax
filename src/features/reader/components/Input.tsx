import { css } from "@emotion/react";

type InputProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ onClick, onFileChange }: InputProps) => (
  <button onClick={onClick}>
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
  </button>
);

export default Input;
