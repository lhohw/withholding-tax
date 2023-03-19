import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { accordianState } from "recoil/base";
import useTable from "hooks/useTable";

import Row from "./Row";
import Corporate from "models/Corporate";
import { useMemo } from "react";
import { parseMoney } from "lib/utils";

export type ResultTypes = "total" | "youth" | "manhood";
export type TableResultProps = {
  corporate: Corporate;
};
const TableResult = ({ corporate }: TableResultProps) => {
  const types: ResultTypes[] = useMemo(() => ["total", "youth", "manhood"], []);
  const [{ selected: year }] = useRecoilState(accordianState("year"));
  const { resultData } = useTable({ RN: corporate.RN, year });
  const data = useMemo(
    () =>
      types.reduce(
        (acc, type) => ({
          ...acc,
          [type]: [
            ...new Array(3).fill(""),
            type === "total" ? "합계" : type === "youth" ? "청년" : "장년",
            ...resultData[type].map((d) => parseMoney(d)),
          ],
        }),
        {}
      ),
    [types, resultData]
  ) as {
    [key in ResultTypes]: string[];
  };
  return (
    <div
      css={css`
        border-top: 1.3px dashed var(--navy);
      `}
    >
      {types.map((type) => (
        <Row
          key={type}
          isHeading
          isTotal={type === "total"}
          data={data[type]}
        />
      ))}
    </div>
  );
};

export default TableResult;
