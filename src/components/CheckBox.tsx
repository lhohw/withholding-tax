import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Item from "./Item";
import { css } from "@emotion/react";
import React, { useCallback } from "react";

export type CheckBoxProps = {
  id: string;
  checked: boolean[];
  onToggle: (id: string) => void;
};
const CheckBox = ({ id, checked, onToggle }: CheckBoxProps) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGElement>) => {
      if (e.code === "Enter") {
        onToggle(id);
        const filtered = Array.prototype.filter.call(
          document.querySelectorAll('svg[tabindex="0"]'),
          (elem: SVGElement) =>
            // @ts-ignore
            e.target.getClientRects()[0].y < elem.getClientRects()[0].y
        );
        if (filtered.length) filtered[0].focus();
      }
      if (e.code === "ArrowDown" || e.code === "ArrowUp") {
        e.preventDefault();
        if (e.code === "ArrowDown") {
          const filtered = Array.prototype.filter.call(
            document.querySelectorAll('svg[tabindex="0"]'),
            (elem: SVGElement) =>
              // @ts-ignore
              e.target.getClientRects()[0].y < elem.getClientRects()[0].y
          );
          if (filtered.length) filtered[0].focus();
        } else {
          const filtered = Array.prototype.filter.call(
            document.querySelectorAll('svg[tabindex="0"]'),
            (elem: SVGElement) =>
              // @ts-ignore
              e.target.getClientRects()[0].y > elem.getClientRects()[0].y
          );
          if (filtered.length) filtered[filtered.length - 1].focus();
        }
      }
    },
    [id, onToggle]
  );
  return (
    <Item
      css={css`
        width: 50px;
      `}
    >
      {checked.findIndex((e) => e === false) === -1 ? (
        <MdCheckBox
          css={css`
            cursor: pointer;
          `}
          tabIndex={0}
          size={25}
          onClick={() => onToggle(id)}
          onKeyDown={onKeyDown}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          css={css`
            cursor: pointer;
          `}
          tabIndex={0}
          size={25}
          onClick={() => onToggle(id)}
          onKeyDown={onKeyDown}
        />
      )}
    </Item>
  );
};

export default CheckBox;
