import React, { useCallback, useEffect } from "react";
import { css } from "@emotion/react";
import colors from "constants/colors";

import {
  CorporateContainer,
  CorporateHeader,
  CorporateRow,
} from "./components";

import { parseMoney } from "lib/utils";
import { setPersonnel, toggle } from "./corporateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ReaderState } from "features/reader/readerSlice";

export type CorporateProps = {
  data: ReaderState["list"][string];
  year: string;
};
const Corporate = ({ data, year }: CorporateProps) => {
  const dispatch = useAppDispatch();
  const onToggle = useCallback(
    (id: string) => {
      dispatch(toggle({ id, year }));
    },
    [dispatch, year]
  );
  const { name, personnel: _p } = data;
  useEffect(() => {
    dispatch(setPersonnel(_p));
  }, [dispatch, _p]);

  const { data: _d } = useAppSelector((state) => state.corporate);
  if (!_d[year]) return <div>loading...</div>;

  const { personnel, total } = _d[year];
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
          border-bottom: 1px dotted ${colors.main};
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
