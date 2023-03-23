import { css } from "@emotion/react";
import { BiChevronDown } from "react-icons/bi";

import { whiteNeumorphism } from "styles/neumorphism";

export type AccordianProps = {
  width?: string;
  isOpen: boolean;
  options: string[];
  selected: number;
  placeholder: string;
  disable?: boolean;
  toggle: () => void;
  onSelect: (idx: number) => void;
};
const Accordian = ({
  width,
  isOpen,
  options,
  selected,
  placeholder,
  disable = false,
  toggle,
  onSelect,
}: AccordianProps) => {
  return (
    <AccordianWrapper
      isOpen={isOpen}
      width={width}
      disable={disable}
      toggle={toggle}
    >
      <AccordianButton
        selected={selected}
        toggle={toggle}
        options={options}
        placeholder={placeholder}
      />
      <AccordianOptions isOpen={isOpen} onSelect={onSelect} options={options} />
    </AccordianWrapper>
  );
};

const AccordianWrapper = ({
  isOpen,
  width,
  disable,
  toggle,
  children,
}: Pick<AccordianProps, "isOpen" | "width" | "disable" | "toggle"> & {
  children: React.ReactNode;
}) => (
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
      margin: 1.5rem 1rem;
      position: relative;
      transition: 0.4s border-radius ease-in-out, 0.8s border-color ease-in-out,
        0.125s background-color ease-in-out;
      border-radius: ${isOpen ? "8px 8px 0 0" : "8px"};
      background-color: var(--background);
      width: ${width};
      ${disable &&
      css`
        opacity: 0;
        pointer-events: none;
      `}
    `}
    onMouseLeave={() => isOpen && toggle()}
  >
    {children}
  </div>
);

const AccordianButton = ({
  selected,
  toggle,
  options,
  placeholder,
}: Pick<AccordianProps, "selected" | "toggle" | "options" | "placeholder">) => (
  <button
    css={css`
      min-height: 40px;
      width: 100%;
      border-radius: 8px;
      margin: 0 1rem;
      padding: 0;
      border: none;
      color: ${selected === -1 ? "var(--placeholder)" : "var(--orange)"};
      cursor: pointer;
      font-weight: bold;
      font-family: inherit;
      background-color: inherit;
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
        font-size: ${options[selected]?.length >= 11 ? "0.8rem" : "1rem"};
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
  </button>
);

const AccordianOptions = ({
  isOpen,
  options,
  onSelect,
}: Pick<AccordianProps, "isOpen" | "options" | "onSelect">) => (
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
      z-index: 2;
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
          font-size: ${option.length >= 11 ? "0.8rem" : "1rem"};
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
);
export default Accordian;
