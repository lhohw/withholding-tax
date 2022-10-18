import React, { useCallback, useEffect } from "react";

import {
  CorporateContainer,
  CorporateHeader,
  CorporateRoll,
  CorporateResult,
} from "./components";

import { setPersonnel, toggle, toggleItem } from "./corporateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ReaderState } from "features/reader/readerSlice";

export type CorporateProps = {
  data: ReaderState["list"][string];
  year: string;
  RN: string;
};

const Corporate = ({ data, year, RN }: CorporateProps) => {
  const dispatch = useAppDispatch();
  const { name } = data;

  const corporates = useAppSelector((state) => state.corporate);
  const corporate = corporates[RN]?.data;

  const onToggle = useCallback(
    (id: string) => {
      dispatch(toggle({ id, year, RN }));
    },
    [dispatch, year, RN]
  );
  const onToggleItem = useCallback(
    (id: string, idx: number, content: "청년" | "장년" | "-" | "퇴사") => {
      dispatch(toggleItem({ id, year, RN, idx, content }));
    },
    [RN, dispatch, year]
  );

  useEffect(() => {
    dispatch(setPersonnel({ RN, data }));
  }, [dispatch, RN, data]);

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
      <CorporateRoll
        onToggle={onToggle}
        onToggleItem={onToggleItem}
        personnel={personnel}
      />
      <CorporateResult payment={payment} generation={generation} />
    </CorporateContainer>
  );
};

export default React.memo(
  Corporate,
  (prevProps, nextProps) =>
    prevProps.RN === nextProps.RN &&
    prevProps.data === nextProps.data &&
    prevProps.year === nextProps.year
);
