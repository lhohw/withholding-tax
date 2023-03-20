import { useMemo } from "react";
import { css } from "@emotion/react";

import useTable from "hooks/useTable";
import Corporate from "models/Corporate";
import { getStatisticsData } from "lib/utils";

import Row from "./Row";
import MonthCounter from "./MonthCounter";

export type StatisticsProps = {
  corporate: Corporate;
  year: string;
};
const Statistics = ({ corporate, year }: StatisticsProps) => {
  const width = useMemo(() => [50, 150, 150, 150], []);
  const {
    statistics: { sum, diff },
    month,
  } = useTable({ RN: corporate.RN, year });
  const sumData = useMemo(
    () => getStatisticsData("합계", sum, month),
    [sum, month]
  );
  const diffData = useMemo(
    () => getStatisticsData("증감", diff, month),
    [diff, month]
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
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
        <Dummy />
        <Row
          isHeading
          data={["", "전체", "청년", "장년"]}
          css={css`
            background: linear-gradient(
              113deg,
              rgb(245, 232, 232) 0%,
              rgba(255, 143, 118, 0.125) 100%
            );
            border-bottom: 1.2px dashed var(--navy);
          `}
          width={width}
        />
        <Row data={sumData} width={width} />
        <Row data={diffData} width={width} />
      </div>
      <MonthCounter year={year} RN={corporate.RN} />
    </div>
  );
};

const Dummy = () => (
  <Row
    css={css`
      display: none;
    `}
    data={[]}
  />
);
export default Statistics;
