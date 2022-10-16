import { css } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useCallback } from "react";

import { exceptNumberRegex } from "constants/regex";
import { setCode } from "../calculatorSlice";

import * as font from "constants/font";
import colors from "constants/colors";

const Code = () => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.calculator);

  const onCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (exceptNumberRegex.exec(value)) return;
      dispatch(setCode(value));
    },
    [dispatch]
  );
  return (
    <div
      css={css`
        display: flex;
        margin-left: 1rem;
      `}
    >
      <input
        css={css`
          /* width: 200px; */
          text-align: center;
          padding: 0.5rem;
          border: none;
          border-bottom: 0.5px solid ${colors.base};
          outline: none;
          font-size: ${font.size.large};
          font-weight: ${font.weight.semibold};
          &:focus {
            border-bottom-color: ${colors.main};
          }
        `}
        onChange={onCodeChange}
        value={code}
        placeholder="사회보험요율 코드"
      />
    </div>
  );
};

export default Code;
