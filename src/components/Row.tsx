import { CSSProperties, useMemo } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { weight } from "constants/font";

import List from "./List";
import Item from "./Item";
import { darkOrangeGradient, lightOrangeGradient } from "styles/gradient";

export type RowProps = {
  style?: CSSProperties;
  className?: string;
  data: React.ReactNode[];
  isHeading?: boolean;
  isTotal?: boolean;
  isAllChecked?: boolean;
  checked?: boolean[];
  handler?: React.ReactNode;
  width?: number[];
  onToggle?: (idx: number) => void;
};
const Row = ({
  style,
  className,
  data,
  isHeading = false,
  isTotal = false,
  isAllChecked = false,
  checked = null!,
  handler = <Item width={50} />,
  width: w = [80, 80, 80, 80, 130, 130, ...new Array(12).fill(50)],
  onToggle,
}: RowProps) => {
  const totalWidth = useMemo(() => w.reduce((x, y) => x + y) + 50, [w]);
  return (
    <div
      className={className}
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(254, 254, 254, 0.376);
        transition: color 0.15s ease-in-out;
        &:nth-of-type(even) {
          ${isHeading && !(data[3] === "청년")
            ? darkOrangeGradient
            : lightOrangeGradient};
        }
      `}
    >
      <List width={totalWidth}>
        {handler}
        {data.map((d, i) => {
          const Cell = isHeading
            ? styled(Item)`
                font-weight: ${weight.semibold};
              `
            : styled(Item)`
                color: ${isAllChecked || (i >= 6 && checked[i - 6])
                  ? "var(--orange)"
                  : data[i] === "청년"
                  ? "var(--blue)"
                  : "inherit"};
                text-decoration: ${isAllChecked || (i >= 6 && checked[i - 6])
                  ? "line-through"
                  : "none"};
                cursor: ${i >= 6 ? "pointer" : "default"};
              `;
          return (
            <Cell
              key={i}
              width={isTotal && i === 4 ? 0 : isTotal && i === 5 ? 260 : w[i]}
              onClick={onToggle ? () => onToggle(i - 6) : null!}
            >
              {d}
            </Cell>
          );
        })}
      </List>
    </div>
  );
};

export default Row;
