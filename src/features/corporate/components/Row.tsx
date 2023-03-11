import React from "react";
import { css } from "@emotion/react";
import * as font from "constants/font";

import Item from "components/Item";
import List from "components/List";

import Info, { InfoHeading } from "./Info";
import colors from "constants/colors";
import { parseMoney } from "lib/utils";
import { CorporateState } from "../corporateSlice";
import { useAppSelector } from "app/hooks";

type RowItemProps = {
  type: "payment" | "generation";
  contents: string[];
  checked?: boolean[];
  id?: string;
  onToggleItem?: RowProps["onToggleItem"];
};
const CorporateItem = React.memo(
  ({ type, contents, checked, id, onToggleItem }: RowItemProps) => (
    <List>
      {contents.map((content, idx) => (
        <Item
          key={type + idx}
          css={css`
            width: ${type === "generation" ? 50 : 200 / contents.length}px;
            cursor: ${type === "payment" || checked === undefined
              ? "default"
              : "pointer"};
            color: ${type === "payment" || checked === undefined
              ? "inherit"
              : checked[idx]
              ? colors.red600
              : content === "청년"
              ? colors.main
              : "inherit"};
            text-decoration: ${type === "generation" && checked && checked[idx]
              ? "line-through"
              : "inherit"};
            align-items: ${content.length < 13 || contents.length === 1
              ? "center"
              : "flex-start"};
          `}
          onClick={
            type === "payment" || checked === undefined || !onToggleItem || !id
              ? () => {}
              : () =>
                  onToggleItem(
                    id,
                    idx,
                    content as "청년" | "장년" | "-" | "퇴사"
                  )
          }
        >
          {content}
        </Item>
      ))}
    </List>
  ),
  (prevProps, nextProps) =>
    prevProps.checked === nextProps.checked &&
    prevProps.contents === nextProps.contents
);

type RowProps = {
  type?: string;
  isHeading?: boolean;
  checked?: boolean[];
  id?: string;
  index?: number;
  onToggleItem?: (
    id: string,
    idx: number,
    content: "청년" | "장년" | "-" | "퇴사"
  ) => void;
  onToggle?: (id: string) => void;
  info?: CorporateState[string]["data"][string]["employees"][string]["info"];
  payments: Record<"youth" | "manhood", number>;
  generations: string[];
  isExpand?: boolean;
  setIsExpand?: (isExpand: boolean) => void;
};
const CorporateRow = ({
  type,
  isHeading = false,
  id,
  onToggleItem,
  onToggle,
  info,
  payments,
  generations,
  isExpand,
  setIsExpand,
  index = 0,
}: RowProps) => {
  const _payments =
    type === undefined || type === "total"
      ? Object.values(payments)
      : type === "youth"
      ? [payments.youth, 0]
      : [0, payments.manhood];
  const { theme } = useAppSelector((state) => state.darkMode);
  return (
    <List
      css={css`
        font-weight: ${isHeading ? font.weight.bold : 400};
        color: ${info?.workingDays && info?.workingDays <= 31
          ? "#b354ee"
          : info && info.checked.findIndex((e) => e === false) === -1
          ? colors.red600
          : "inherit"};
        background-color: ${index % 2
          ? theme === "dark"
            ? "#dde1ff10"
            : "#dde1ff28"
          : "inherit"};
        text-decoration: ${info &&
        info.checked.findIndex((e) => e === false) === -1
          ? "line-through"
          : "none"};
      `}
      title={
        info?.checked.findIndex((e) => e === false) === -1
          ? "삭제됨. 급여 및 인원 미포함"
          : info?.workingDays && info?.workingDays <= 31
          ? "급여 및 인원 포함. 근무일 27일 초과 31일 이하"
          : type
          ? ""
          : "급여 및 인원 포함"
      }
    >
      {info && id && onToggle ? (
        <Info id={id} info={info} onToggle={onToggle} />
      ) : type === "heading" ? (
        <InfoHeading isExpand={isExpand} setIsExpand={setIsExpand} />
      ) : (
        <InfoHeading
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
      <CorporateItem
        type="payment"
        contents={
          type === "heading"
            ? ["청년", "장년"]
            : type === "total"
            ? [parseMoney(_payments.reduce((x, y) => x + y))]
            : _payments.map((v) => parseMoney(v))
        }
        checked={info?.checked}
      />
      <CorporateItem
        type="generation"
        contents={generations}
        checked={info?.checked}
        id={id}
        onToggleItem={onToggleItem}
      />
    </List>
  );
};

export default React.memo(CorporateRow);
