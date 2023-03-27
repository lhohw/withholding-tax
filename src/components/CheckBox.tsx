import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Item from "./Item";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { focus } from "lib/dom";

export type CheckBoxProps = {
  width?: number;
  id: string;
  checked: boolean[];
  onToggle: (idx?: number) => void;
};
const CheckBox = ({ width = 50, id, checked, onToggle }: CheckBoxProps) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGElement>) => {
      if (e.code === "Enter") {
        onToggle();
        focus("next", e, 'svg[tabindex="0"]');
      }
      if (e.code === "ArrowDown" || e.code === "ArrowUp") {
        e.preventDefault();
        if (e.code === "ArrowDown") focus("next", e, 'svg[tabindex="0"]');
        else focus("prev", e, 'svg[tabindex="0"]');
      }
    },
    [onToggle]
  );
  return (
    <Item width={width}>
      {checked.findIndex((e) => e === false) === -1 ? (
        <MdCheckBox
          css={css`
            cursor: pointer;
          `}
          tabIndex={0}
          size={25}
          onClick={() => onToggle()}
          onKeyDown={onKeyDown}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          css={css`
            cursor: pointer;
          `}
          tabIndex={0}
          size={25}
          onClick={() => onToggle()}
          onKeyDown={onKeyDown}
        />
      )}
    </Item>
  );
};

export default CheckBox;
