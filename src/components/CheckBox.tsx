import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Item from "./Item";
import { css } from "@emotion/react";

export type CheckBoxProps = {
  id: string;
  checked: boolean[];
  onToggle: (id: string) => void;
};
const CheckBox = ({ id, checked, onToggle }: CheckBoxProps) => (
  <Item
    css={css`
      width: 50px;
      /* cursor: pointer; */
    `}
  >
    {checked.findIndex((e) => e === false) === -1 ? (
      <MdCheckBox
        css={css`
          cursor: pointer;
        `}
        size={25}
        onClick={() => onToggle(id)}
      />
    ) : (
      <MdCheckBoxOutlineBlank
        css={css`
          cursor: pointer;
        `}
        size={25}
        onClick={() => onToggle(id)}
      />
    )}
  </Item>
);

export default CheckBox;
