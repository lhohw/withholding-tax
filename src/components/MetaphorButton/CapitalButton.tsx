import { css } from "@emotion/react";
import { GiModernCity, GiFarmer } from "react-icons/gi";

import MetaphorButton from ".";

export type CapitalButtonProps = {
  isCapital: boolean;
  activeCapital: string;
  onClick: () => void;
};
const CapitalButton = ({
  isCapital,
  activeCapital,
  onClick,
}: CapitalButtonProps) => {
  return (
    <MetaphorButton
      css={css`
        color: ${isCapital.toString() === activeCapital
          ? "var(--light-orange)"
          : "inherit"};
        transition: color 0.25s ease-in-out;
      `}
      title={`${isCapital ? "" : "비"}수도권`}
      onClick={onClick}
    >
      {isCapital ? <GiModernCity size={30} /> : <GiFarmer size={30} />}
    </MetaphorButton>
  );
};

export default CapitalButton;
