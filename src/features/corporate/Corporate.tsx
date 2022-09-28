import React, { useCallback, useEffect } from "react";
import { css } from "@emotion/react";

import { useAppSelector, useAppDispatch } from "app/hooks";

import { setInfo, InfoState, toggle } from "features/info/infoSlice";
import {
  setPayment,
  PaymentState,
  check as paymentCheck,
} from "features/payment/paymentSlice";
import {
  GenerationState,
  setGeneration,
  check as generationCheck,
} from "features/generation/generationSlice";

import * as font from "constants/font";
import colors from "constants/colors";

import Payment from "features/payment/Payment";
import Generation from "features/generation/Generation";

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => (
  <div
    css={css`
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: ${font.weight.bold};
      color: ${colors.main};
    `}
  >
    {title}
  </div>
);

const Corporate = () => {
  const dispatch = useAppDispatch();
  const { list, selected } = useAppSelector((state) => state.corporate);
  useEffect(() => {
    if (selected) {
      const info: InfoState = {};
      const payment: PaymentState["payment"] = {};
      const generation: GenerationState["generation"] = {};

      const { personnel } = list[selected];
      Object.entries(personnel).forEach(([id, person]) => {
        const {
          name,
          date,
          payment: p,
          earnedIncomeWithholdingDepartment: ei,
        } = person;
        info[id] = { checked: false, name, date };
        payment[id] = p;
        generation[id] = Object.entries(ei).reduce(
          (obj, [year, ms]) => ({
            ...obj,
            [year]: ms
              .slice(0, 12)
              .map((s) =>
                s.payment.youth ? "청년" : s.payment.manhood ? "장년" : "-"
              ),
          }),
          {}
        );
      });
      dispatch(setInfo(info));
      dispatch(setPayment(payment));
      dispatch(setGeneration(generation));
    }
  }, [dispatch, list, selected]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
      `}
    >
      {selected && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: scroll;
            padding-bottom: 2rem;
          `}
        >
          <Title title={list[selected].name} />
          <Payment />
          <Generation />
        </div>
      )}
    </div>
  );
};

export default Corporate;
