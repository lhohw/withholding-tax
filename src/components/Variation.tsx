import { useMemo } from "react";
import { css } from "@emotion/react";

import useCorporate from "hooks/useCorporate";

import Row from "./Row";

import Heading from "./Row/Heading";
import useCalculator from "hooks/useCalculator";
import { getLastYears } from "lib/values";

const Variation = () => {
  const {
    selectedCorporate: { selected: RN },
  } = useCorporate();
  const last6Years = useMemo(() => getLastYears(6), []);
  const width = useMemo(() => new Array(7).fill(120), []);
  const { resultSum, resultDiff } = useCalculator({ RN });
  const shiftedResultDiff = useMemo(
    () => resultDiff.map((row) => [row[0], "", ...row.slice(1)]),
    [resultDiff]
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: ${width.reduce((x, y) => x + y) + 50}px;
        margin-top: 2rem;
      `}
    >
      <Heading width={width} data={["", ...last6Years]} />
      {resultSum.map((data, i) => (
        <Row key={i} data={data} width={width} />
      ))}
      {shiftedResultDiff.map((data, i) => (
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
    </div>
  );
};

export default Variation;
