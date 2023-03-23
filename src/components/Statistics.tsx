import { useMemo } from "react";
import { css } from "@emotion/react";

import useTable from "hooks/useTable";
import Corporate from "models/Corporate";
import { withDividedByMonth } from "lib/utils";

import Row from "./Row";

import MonthCounter from "./MonthCounter";
import Heading from "./Row/Heading";

export type StatisticsProps = {
  corporate: Corporate;
  year: string;
};
const Statistics = ({ corporate, year }: StatisticsProps) => {
  const width = useMemo(() => [50, 150, 150, 150], []);
  const {
    statistics: { sum, variation },
    month,
  } = useTable({ RN: corporate.RN, year });
  const sumData = useMemo(
    () => [
      "합계",
      ...Object.values(sum).map((data) =>
        withDividedByMonth(data.totalGeneration, month)
      ),
    ],
    [sum, month]
  );
  const variationData = useMemo(
    () => [
      "증감",
      ...Object.values(variation).map((data) =>
        withDividedByMonth(data.totalGeneration, month)
      ),
    ],
    [variation, month]
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          align-items: flex-start;
        `}
      >
        <Heading data={["", "전체", "청년", "장년"]} width={width} />
        <Row data={sumData} width={width} />
        <Row data={variationData} width={width} />
      </div>
      <MonthCounter year={year} RN={corporate.RN} />
    </div>
  );
};

export default Statistics;
