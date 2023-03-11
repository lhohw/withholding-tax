// import type { Corporates } from "recoil/corporates/atom";
// @ts-ignore
import type Corporate from "models/Corporate";

import React, { useCallback, useEffect } from "react";

import {
  CorporateContainer,
  CorporateHeader,
  CorporateRoll,
  CorporateResult,
} from "./components";

import { setPersonnel, toggle, toggleItem } from "./corporateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

export type CorporateProps = {
  data: Corporate;
  year: string;
  RN: string;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
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
    employees,
    total: { salary, generation, sum },
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
        employees={employees}
      />
      <CorporateResult salary={salary} generation={generation} />
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
