import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import * as font from "constants/font";
import { IoCalculator } from "react-icons/io5";
import colors from "constants/colors";

type CalculateButtonProps = {
  RN: string;
};
const CalculateButton = ({ RN }: CalculateButtonProps) => (
  <Link
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border: 0.5px solid ${colors.black600};
      border-radius: 10px;
      cursor: pointer;
      padding: 0.5rem 1rem;
      margin: 1rem 0;
      font-size: ${font.size.medium};
      text-decoration: none;
      color: ${colors.main};
      font-weight: ${font.weight.bold};
      & > span {
        margin-bottom: 0.5rem;
      }
    `}
    to={"calculator"}
    state={{ RN }}
  >
    <span>세액공제</span>
    <IoCalculator
      css={css`
        font-size: 3rem;
        color: ${colors.main};
      `}
    />
  </Link>
);

export default CalculateButton;
