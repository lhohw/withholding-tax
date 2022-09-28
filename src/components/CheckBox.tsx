import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Item from "./Item";

export type CheckBoxProps = {
  id: string;
  checked: boolean;
  onToggle: (id: string) => void;
};
const CheckBox = ({ id, checked, onToggle }: CheckBoxProps) => (
  <Item width={50}>
    {checked ? (
      <MdCheckBox size={25} onClick={() => onToggle(id)} />
    ) : (
      <MdCheckBoxOutlineBlank size={25} onClick={() => onToggle(id)} />
    )}
  </Item>
);

export default CheckBox;
