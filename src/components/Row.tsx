import { css } from "@emotion/react";
import List from "./List";
import Item from "./Item";
import styled from "@emotion/styled";
import { weight } from "constants/font";
import { CSSProperties } from "react";

const width = [80, 80, 80, 80, 130, 130, ...new Array(12).fill(50)];

export type RowProps = {
  style?: CSSProperties;
  className?: string;
  data: React.ReactNode[];
  isHeading?: boolean;
  isTotal?: boolean;
  isAllChecked?: boolean;
  checked?: boolean[];
  handler?: React.ReactNode;
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
}: RowProps) => {
  return (
    <div
      className={className}
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(254, 254, 254, 0.376);
        transition: color 0.25s ease-in-out;
        &:nth-of-type(even) {
          background: linear-gradient(
            113deg,
            rgb(245, 232, 232) 0%,
            rgba(255, 143, 118, 0.125) 100%
          );
        }
      `}
    >
      <List width={1240}>
        {handler}
        {width.map((e, i) => {
          const Cell = isHeading
            ? styled(Item)`
                font-weight: ${weight.semibold};
              `
            : styled(Item)`
                color: ${isAllChecked || (i >= 6 && checked[i - 6])
                  ? "inherit"
                  : data[i] === "청년"
                  ? "var(--blue)"
                  : "inherit"};
              `;
          return (
            <Cell
              key={i}
              width={isTotal && i === 4 ? 0 : isTotal && i === 5 ? 260 : e}
            >
              {data[i]}
            </Cell>
          );
        })}
      </List>
    </div>
  );
};

export default Row;
