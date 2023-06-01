import React, { CSSProperties, useMemo } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { weight } from "constants/font";

import List from "../List";
import Item from "../Item";
import { lightOrangeGradient } from "styles/gradient";

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
  title?: string;
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
  title,
  width: w = [80, 80, 80, 80, 130, 130, ...new Array(12).fill(50)],
  onToggle,
}: RowProps) => {
  const totalWidth = useMemo(() => w.reduce((x, y) => x + y) + 50, [w]);
  return (
    <RowWrapper
      className={className}
      style={style}
      isHeading={isHeading}
      title={title}
    >
      <List width={totalWidth}>
        {handler}
        {data.map((d, i) => {
          const Cell = isHeading
            ? styled(Item)`
                font-weight: ${weight.semibold};
              `
            : styled(Item)`
                color: ${isAllChecked || (i >= 6 && checked && checked[i - 6])
                  ? "var(--orange)"
                  : d === "청년"
                  ? i >= 6
                    ? "var(--blue)"
                    : "inherit"
                  : typeof d === "string" && /-\d/.exec(d)
                  ? "var(--red)"
                  : "inherit"};
                text-decoration: ${isAllChecked ||
                (i >= 6 && checked && checked[i - 6])
                  ? "line-through"
                  : "none"};
                cursor: ${onToggle && i >= 6 ? "pointer" : "default"};
              `;
          return (
            <Cell
              key={i}
              width={isTotal && i === 4 ? 0 : isTotal && i === 5 ? 260 : w[i]}
              onClick={onToggle && i >= 6 ? () => onToggle(i - 6) : null!}
            >
              {d}
            </Cell>
          );
        })}
      </List>
    </RowWrapper>
  );
};

const RowWrapper = ({
  className,
  style,
  isHeading,
  children,
  title,
}: Pick<RowProps, "className" | "style" | "isHeading" | "title"> & {
  children: React.ReactNode;
}) => (
  <div
    className={className}
    style={style}
    title={title}
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: rgba(254, 254, 254, 0.376);
      transition: color 0.15s ease-in-out;
      &:nth-of-type(odd) {
        ${!isHeading && lightOrangeGradient};
      }
    `}
  >
    {children}
  </div>
);
export default React.memo(Row);
