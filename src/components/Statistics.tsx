import { useMemo } from "react";
import styled from "@emotion/styled";

import useTable from "hooks/useTable";
import Corporate from "models/Corporate";
import { withDividedByMonth } from "lib/utils";

import Row from "./Row";

import MonthCounter from "./MonthCounter";
import Heading from "./Row/Heading";
import { whiteNeumorphism } from "styles/neumorphism";

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
    <StatisticsWrapper>
      <StatisticsTableWrapper>
        <Heading data={["", "전체", "청년", "장년"]} width={width} />
        <Row data={sumData} width={width} />
        <Row data={variationData} width={width} />
      </StatisticsTableWrapper>
      <MonthCounter year={year} RN={corporate.RN} />
    </StatisticsWrapper>
  );
};

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 3rem;
  ${whiteNeumorphism("0")};
`;

const StatisticsTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Statistics;
