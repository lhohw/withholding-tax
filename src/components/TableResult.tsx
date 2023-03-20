import type { GenerationTypes } from "constants/value";

import { useMemo } from "react";
import { css } from "@emotion/react";

import useTable from "hooks/useTable";
import Corporate from "models/Corporate";
import { parseMoney } from "lib/utils";
import { generationTypes } from "constants/value";

import Row from "./Row";

export type TableResultProps = {
  corporate: Corporate;
  year: string;
};
const TableResult = ({ corporate, year }: TableResultProps) => {
  const { resultData } = useTable({ RN: corporate.RN, year });
  const data = useMemo(
    () =>
      generationTypes.reduce(
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
    [resultData]
  ) as Record<GenerationTypes, string[]>;
  return (
    <div
      css={css`
        border-top: 1.3px dashed var(--navy);
      `}
    >
      {generationTypes.map((type) => (
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
