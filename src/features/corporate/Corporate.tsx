import React, { useCallback, useEffect, useMemo } from "react";
import colors from "constants/colors";

import {
  CorporateContainer,
  CorporateHeader,
  CorporateRow,
} from "./components";

import { setPersonnel, toggle } from "./corporateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ReaderState } from "features/reader/readerSlice";
import { getDefaultGeneration } from "lib/values";
import styled from "@emotion/styled";

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

  const paymentTitle = useMemo(() => ({ youth: -1, manhood: -1 }), []);
  const generationTitle = useMemo(
    () => new Array(12).fill(0).map((_, i) => `${i + 1}월`),
    []
  );
  const { data: _d } = useAppSelector((state) => state.corporate);
  if (!_d[year]) return <div>loading...</div>;

  const {
    personnel,
    total: { payment, generation },
  } = _d[year];
  const prev = _d[+year - 1]?.total.generation || {
    youth: getDefaultGeneration(),
    manhood: getDefaultGeneration(),
    total: getDefaultGeneration(),
  };
  const variation = {
    youth: generation.youth.map((val, i) => val - prev.youth[i]),
    manhood: generation.manhood.map((val, i) => val - prev.manhood[i]),
    total: generation.total.map((val, i) => val - prev.total[i]),
  };
  return (
    <CorporateContainer>
      <CorporateHeader
        corporateName={name}
        year={year}
        total={generation}
        variation={variation}
      />
      <CorporateRow
        isHeading
        type={"heading"}
        payments={paymentTitle}
        generations={generationTitle}
      />
      <CorporateList>
        {Object.entries(personnel).map(
          ([id, { info, payment, generation }]) => {
            return (
              <CorporateRow
                key={id}
                info={info}
                id={id}
                onToggle={onToggle}
                payments={payment}
                generations={generation}
              />
            );
          }
        )}
      </CorporateList>
      {["total", "youth", "manhood"].map((type) => (
        <CorporateRow
          key={type}
          isHeading
          type={type}
          payments={payment}
          generations={generation[type as keyof typeof generation].map((v) =>
            v.toString()
          )}
        />
      ))}
    </CorporateContainer>
  );
};

const CorporateList = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: auto;
  max-height: 420px;
  width: 1175px;
  overflow-y: scroll;
  border-bottom: 1px dotted ${colors.main};
`;

export default Corporate;
