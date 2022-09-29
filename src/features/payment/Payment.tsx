import React, { useCallback } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Item from "components/Item";
import List from "components/List";
import Info from "features/info/Info";

import * as font from "constants/font";
import colors from "constants/colors";

import { getLastYears, parseMoney } from "lib/utils";

import { InfoState, toggle } from "features/info/infoSlice";
import { check } from "features/payment/paymentSlice";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { PaymentState } from "./paymentSlice";

type PaymentItemProps = {
  contents: string[];
  year?: string;
};
export const PaymentItem = ({ contents }: PaymentItemProps) => (
  <List
    css={css`
      width: 200px;
      /* border-left: 0.5px dotted ${colors.base}; */
    `}
  >
    {contents.map((content, idx) => (
      <Item key={content + idx} width={200 / contents.length}>
        {content}
      </Item>
    ))}
  </List>
);

type PaymentRowYearProps = {
  years: string[];
};
export const PaymentRowYear = ({ years }: PaymentRowYearProps) => (
  <List
    css={css`
      font-weight: ${font.weight.semibold};
      min-width: 1570px;
    `}
  >
    <Info.Heading data={[]} />
    {years.map((year) => (
      <PaymentItem key={year} contents={[year]} />
    ))}
  </List>
);

type PaymentRowProps = {
  id: string;
  onToggle: (id: string) => void;
  info: InfoState[keyof InfoState];
  payment: PaymentState["payment"][keyof PaymentState["payment"]];
  years: string[];
};
export const PaymentRowHeading = ({ years }: { years: string[] }) => (
  <List
    css={css`
      font-weight: ${font.weight.bold};
      min-width: 1570px;
    `}
  >
    <Info.Heading />
    {years.map((year) => (
      <PaymentItem key={year} year={year} contents={["청년", "장년"]} />
    ))}
  </List>
);

export const PaymentRow = ({
  id,
  onToggle,
  info,
  payment,
  years,
}: PaymentRowProps) => {
  const { checked } = info;
  return (
    <List
      css={css`
        min-width: 1570px;
        color: ${checked ? colors.red600 : colors.base};
        text-decoration: ${checked ? "line-through" : "none"};
      `}
    >
      <Info id={id} info={info} onToggle={onToggle} />
      {years.map((year) => (
        <PaymentItem
          key={year}
          contents={Object.values(payment[year]).map((p) => parseMoney(p))}
        />
      ))}
    </List>
  );
};
type PaymentTotalProps = {
  years: string[];
  total: PaymentState["total"];
};
const PaymentTotal = ({ years, total }: PaymentTotalProps) => (
  <List
    css={css`
      font-weight: ${font.weight.semibold};
      min-width: 1570px;
    `}
  >
    <Info.Heading data={["합계"]} />
    {years.map((year) => (
      <PaymentItem
        key={year}
        contents={Object.values(total[year]).map((v) => parseMoney(v))}
      />
    ))}
  </List>
);

const Payment = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.info);
  const { payment, total } = useAppSelector((state) => state.payment);
  const years = getLastYears(6);

  const onToggle = useCallback(
    (id: string) => {
      dispatch(check({ id, checked: info[id].checked }));
      dispatch(toggle(id));
    },
    [dispatch, info]
  );
  return (
    <ul
      css={css`
        min-width: 1570px;
        margin-top: 40px;
      `}
    >
      <PaymentRowYear years={years} />
      <PaymentRowHeading years={years} />
      <li
        css={css`
          max-height: 220px;
          overflow-y: scroll;
          border: 1px dotted ${colors.base};
        `}
      >
        {Object.keys(info).map((id) => (
          <PaymentRow
            key={id}
            id={id}
            onToggle={onToggle}
            info={info[id]}
            payment={payment[id]}
            years={years}
          />
        ))}
      </li>
      {Object.keys(total).length && (
        <PaymentTotal years={years} total={total} />
      )}
    </ul>
  );
};

export default Payment;
