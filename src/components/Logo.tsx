import { css } from "@emotion/react";
import logo from "assets/favicon.png";
import { orangeGradient } from "styles/gradient";

const Logo = () => {
  return (
    <h1
      css={css`
        font-weight: bold;
        display: flex;
        align-items: center;
        height: 40px;
        margin: 1rem;
        ${orangeGradient}
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        text-shadow: #f2eaaa 3px 3px 10px;
      `}
    >
      <img
        src={logo}
        alt="logo"
        css={css`
          height: 80%;
          width: auto;
          object-fit: contain;
          margin-right: 1rem;
        `}
      />
      <span
        css={css`
          display: flex;
          flex: 1;
          justify-content: center;
        `}
      >
        WiTax
      </span>
    </h1>
  );
};

export default Logo;
