import { css } from "@emotion/react";
import * as font from "constants/font";

import type { InfoState } from "features/info/infoSlice";

import Item from "components/Item";
import List from "components/List";

import Info from "features/info/Info";
import colors from "constants/colors";

type RowItemProps = {
  type: "payment" | "generation";
  contents: string[];
};
const CorporateItem = ({ type, contents }: RowItemProps) => (
  <List>
    {contents.map((content, idx) => (
      <Item
        key={type + idx}
        css={css`
          width: ${type === "generation" ? 50 : 200 / contents.length}px;
        `}
      >
        {content}
      </Item>
    ))}
  </List>
);

type RowProps = {
  type?: string;
  isHeading?: boolean;
  checked?: boolean;
  id?: string;
  onToggle?: any;
  info?: InfoState[string];
  payments: string[];
  generations: string[];
};
const CorporateRow = ({
  type,
  isHeading = false,
  id,
  onToggle,
  info,
  payments,
  generations,
}: RowProps) => {
  return (
    <List
      css={css`
        font-weight: ${isHeading ? font.weight.bold : 400};
        color: ${info?.checked ? colors.red600 : colors.base};
        text-decoration: ${info?.checked ? "line-through" : "none"};
      `}
    >
      {info && id && onToggle ? (
        <Info id={id} info={info} onToggle={onToggle} />
      ) : type === "heading" ? (
        <Info.Heading />
      ) : (
        <Info.Heading
          data={[
            type === "total"
              ? "합계"
              : type === "youth"
              ? "청년"
              : type === "manhood"
              ? "장년"
              : "",
          ]}
        />
      )}
      <CorporateItem type="payment" contents={payments} />
      <CorporateItem type="generation" contents={generations} />
    </List>
  );
};

export default CorporateRow;
