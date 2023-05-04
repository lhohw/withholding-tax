import { useMemo } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { whiteNeumorphism } from "styles/neumorphism";

import useCorporate from "hooks/useCorporate";
import useCalculator from "hooks/useCalculator";

import { getLastYears } from "lib/utils/values";
import { withDividedByMonth } from "lib/utils";

import Row from "./Row";
import Heading from "./Row/Heading";

const Variation = () => {
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  const last6Years = useMemo(() => getLastYears(6), []);
  const width = useMemo(() => [80, 120, 120, 120, 120, 120, 120], []);
  const titles = useMemo(
    () => ({
      total: "전체",
      youth: "청년",
      manhood: "장년",
    }),
    []
  );
  const { sum, variation, months } = useCalculator({ RN });
  const resultSumData = useMemo(
    () =>
      Object.entries(sum).map(([type, yearlyData]) => [
        `${titles[type as keyof typeof titles]} (합)`,
        ...Object.entries(yearlyData).map(([year, { totalGeneration }]) =>
          withDividedByMonth(totalGeneration, months[year])
        ),
      ]),
    [sum, months, titles]
  );
  const resultvariationData = useMemo(
    () =>
      Object.entries(variation).map(([type, yearlyData]) => [
        `${titles[type as keyof typeof titles]} (증감)`,
        "",
        ...Object.entries(yearlyData).map(([year, { totalGeneration }]) =>
          withDividedByMonth(totalGeneration, months[year])
        ),
      ]),
    [variation, months, titles]
  );
  return (
    <VariationWrapper width={width}>
      <Heading width={width} data={["", ...last6Years]} />
      {resultSumData.map((data, i) => (
        <Row key={i} data={data} width={width} />
      ))}
      {resultvariationData.map((data, i) => (
        <Row
          key={i}
          data={data}
          width={width}
          css={css`
            margin-top: ${i === 0 ? "1px" : 0};
            ${i === 0 && `border-top: 1px dashed var(--navy);`};
          `}
        />
      ))}
    </VariationWrapper>
  );
};

const VariationWrapper = styled.div<{ width: number[] }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width.reduce((x, y) => x + y) + 50}px;
  margin: 2rem;
  ${whiteNeumorphism("0")}
`;
export default Variation;
