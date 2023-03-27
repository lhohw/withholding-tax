import { useMemo } from "react";
import { css } from "@emotion/react";
import { BsBuildingsFill } from "react-icons/bs";

import { CorporateSizes } from "constants/deduction";

import MetaphorButton from ".";

export type CorporateButtonProps = {
  size: CorporateSizes;
  activeSize: CorporateSizes;
  onClick: () => void;
};
const CorporateButton = ({
  size,
  activeSize,
  onClick,
}: CorporateButtonProps) => {
  const info = useMemo(
    () =>
      ({
        small: {
          size: 16,
          title: "중소",
        },
        medium: {
          size: 28,
          title: "중견",
        },
        large: {
          size: 40,
          title: "대기업",
        },
      } as const),
    []
  );
  return (
    <MetaphorButton
      css={css`
        color: ${size === activeSize ? "var(--light-orange)" : "inherit"};
        transition: color 0.25s ease-in-out;
      `}
      title={info[size].title}
      onClick={onClick}
    >
      <BsBuildingsFill size={info[size].size} />
    </MetaphorButton>
  );
};

export default CorporateButton;
