import React, { useCallback } from "react";
import { css } from "@emotion/react";

import {
  CorporateContainer,
  CorporateHeader,
  CorporateRow,
} from "./components";

import { parseMoney } from "lib/utils";
import { CorporateState, toggle } from "./corporateSlice";
import { useAppDispatch } from "app/hooks";

export type CorporateProps = {
  name: string;
  data: CorporateState["data"][string];
  year: string;
};
const Corporate = ({ name, data, year }: CorporateProps) => {
  const dispatch = useAppDispatch();
  const onToggle = useCallback(
    (id: string) => {
      dispatch(toggle(id));
    },
    [dispatch]
  );
  if (!data)
    return (
      <div
        css={css`
          margin: 1rem;
          font-size: 2rem;
        `}
      >
        PDF 데이터가 필요합니다
      </div>
    );

  const { personnel, total } = data;
  return (
    <CorporateContainer>
      <CorporateHeader
        corporateName={name}
        year={year}
        total={total.generation}
      />
      <CorporateRow
        isHeading
        type={"heading"}
        payments={["청년", "장년"]}
        generations={new Array(12).fill(0).map((_, i) => `${i + 1}월`)}
      />
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          max-height: auto;
          max-height: 420px;
          width: 1175px;
          overflow-y: scroll;
        `}
      >
        {Object.entries(personnel).map(
          ([id, { info, payment, generation }]) => {
            return (
              <CorporateRow
                key={id}
                info={info}
                id={id}
                onToggle={onToggle}
                payments={Object.values(payment).map((v) => parseMoney(v))}
                generations={generation}
              />
            );
          }
        )}
      </ul>
      {["total", "youth", "manhood"].map((type) => (
        <CorporateRow
          key={type}
          isHeading
          type={type}
          payments={
            type === "total"
              ? Object.values(total.payment).map((v) => parseMoney(v))
              : type === "youth"
              ? [parseMoney(total.payment.youth), "0"]
              : ["0", parseMoney(total.payment.manhood)]
          }
          generations={total.generation[
            type as keyof typeof total.generation
          ].map((v) => v.toString())}
        />
      ))}
    </CorporateContainer>
  );
};

export default Corporate;
