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
import styled from "@emotion/styled";

export type CorporateProps = {
  data: ReaderState["list"][string];
  year: string;
  RN: string;
};
const Corporate = ({ data, year, RN }: CorporateProps) => {
  const dispatch = useAppDispatch();
  const { name } = data;

  const onToggle = useCallback(
    (id: string) => {
      dispatch(toggle({ id, year, RN }));
    },
    [dispatch, year, RN]
  );
  useEffect(() => {
    dispatch(setPersonnel({ data, RN }));
  }, [dispatch, data, RN]);

  const paymentTitle = useMemo(() => ({ youth: -1, manhood: -1 }), []);
  const generationTitle = useMemo(
    () => new Array(12).fill(0).map((_, i) => `${i + 1}월`),
    []
  );
  const corporates = useAppSelector((state) => state.corporate);
  const corporate = corporates[RN]?.data;

  if (!corporate || !corporate[year]) return <div>loading...</div>;

  const {
    personnel,
    total: { payment, generation, sum },
  } = corporate[year];
  const variation = {
    youth: sum.youth - (corporate[+year - 1]?.total.sum.youth || 0),
    manhood: sum.manhood - (corporate[+year - 1]?.total.sum.manhood || 0),
    total: sum.total - (corporate[+year - 1]?.total.sum.total || 0),
  };
  return (
    <CorporateContainer>
      <CorporateHeader
        corporateName={name}
        year={year}
        sum={sum}
        variation={variation}
        RN={RN}
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

export default React.memo(Corporate);
