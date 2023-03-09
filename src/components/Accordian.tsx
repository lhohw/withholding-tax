import { css } from "@emotion/react";
import { BiChevronDown } from "react-icons/bi";
import { whiteNeumorphism } from "styles/neumorphism";

export type AccordianProps = {
  isOpen: boolean;
  options: string[];
  selected: number;
  placeholder: string;
  toggle: () => void;
  onSelect: (idx: number) => void;
};
const Accordian = ({
  isOpen,
  options,
  selected,
  placeholder,
  toggle,
  onSelect,
}: AccordianProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 40px;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
        color: inherit;
        font-weight: bolder;
        ${whiteNeumorphism("8px")}
        cursor: pointer;
        margin: 0.5rem 1rem;
        position: relative;
        transition: 0.4s border-radius ease-in-out,
          0.8s border-color ease-in-out, 0.125s background-color ease-in-out;
        border-radius: ${isOpen ? "8px 8px 0 0" : "8px"};
        background-color: var(--background);
        &:hover {
          border-color: var(--orange);
        }
      `}
      onMouseLeave={() => isOpen && toggle()}
    >
      <div
        css={css`
          min-height: 40px;
          width: 100%;
          border-radius: 8px;
          margin: 0 1rem;
          color: var(--orange);
        `}
        onClick={toggle}
      >
        <span
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding-right: calc(0.5rem + 25px);
          `}
        >
          {options[selected] || placeholder}
        </span>
        <BiChevronDown
          size={25}
          css={css`
            position: absolute;
            right: 0.5rem;
            top: 20px;
            transform: translateY(-50%);
          `}
        />
      </div>
      <ul
        css={css`
          position: absolute;
          top: 40px;
          display: flex;
          flex-direction: column;
          height: ${isOpen ? 40 * options.length : 0}px;
          background-color: inherit;
          width: 100%;
          border-radius: 0 0 8px 8px;
          transition: 0.4s all ease-in-out;
          overflow: hidden;
        `}
      >
        {options.map((option, idx) => (
          <li
            key={option}
            css={css`
              display: flex;
              flex: 1;
              padding: 0.5rem calc(1.5rem + 25px) 0.5rem 1rem;
              height: 40px;
              width: 100%;
              border-radius: 8px;
              align-items: center;
              justify-content: center;
              color: var(--placeholder);
              &:hover {
                background-color: var(--yellow);
                color: white;
              }
            `}
            onClick={() => onSelect(idx)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordian;
