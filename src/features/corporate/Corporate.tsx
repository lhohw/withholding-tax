import React from "react";
import { css } from "@emotion/react";

import { useAppSelector } from "app/hooks";

import * as font from "constants/font";
import colors from "constants/colors";

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => (
  <div
    css={css`
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: ${font.weight.bold};
      color: ${colors.main};
    `}
  >
    {title}
  </div>
);

const Corporate = () => {
  const { list, selected } = useAppSelector((state) => state.corporate);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        overflow-x: scroll;
      `}
    >
      {selected && (
        <>
          <Title title={list[selected].name} />
        </>
      )}
    </div>
  );
};

export default Corporate;
