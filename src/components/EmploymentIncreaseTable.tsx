import type { EmploymentIncreaseTypes } from "constants/value";
import type { EmploymentIncreaseDataState } from "recoil/calculator";

import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";

import { parseMoney } from "lib/utils";
import { getLastYears } from "lib/utils/values";

import {
  employmentIncreaseTypes,
  employmentIncreaseTitles,
} from "constants/value";
import { CorporateSizes } from "constants/deduction";

import { employmentIncreaseDataState } from "recoil/calculator";

import Heading from "./Row/Heading";
import Row from "./Row";

import { whiteNeumorphism } from "styles/neumorphism";

export type EmploymentIncreaseTableProps = {
  size: CorporateSizes;
  isCapital: string;
};
const EmploymentIncreaseTable = ({
  size,
  isCapital,
}: EmploymentIncreaseTableProps) => {
  const width = useMemo(() => new Array(6).fill(140), []);
  const last5Years = getLastYears(5);
  const employmentIncreaseData = useRecoilValue(
    employmentIncreaseDataState({ size, isCapital })
  );
  const employmentIncreaseTotalData = useMemo(
    () => [
      "총합",
      ...last5Years.map((year) =>
        parseMoney(employmentIncreaseData.total[year])
      ),
    ],
    [last5Years, employmentIncreaseData]
  );
  return (
    <EmploymentIncreaseWrapper>
      <Heading width={width} data={["", ...last5Years]} />
      <EmploymentIncreaseData
        width={width}
        last5Years={last5Years}
        employmentIncreaseData={employmentIncreaseData}
      />
      <Row isHeading width={width} data={employmentIncreaseTotalData} />
    </EmploymentIncreaseWrapper>
  );
};

const EmploymentIncreaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  ${whiteNeumorphism("0")};
`;

type EmploymentIncreaseDataProps = {
  width: number[];
  last5Years: string[];
  employmentIncreaseData: EmploymentIncreaseDataState;
};
const EmploymentIncreaseData = ({
  width,
  last5Years,
  employmentIncreaseData,
}: EmploymentIncreaseDataProps) => (
  <>
    {employmentIncreaseTypes.map((type) => (
      <EmploymentIncreaseDataUnit
        key={type}
        type={type}
        width={width}
        last5Years={last5Years}
        employmentIncreaseData={employmentIncreaseData}
      />
    ))}
  </>
);

type EmploymentIncreaseDataUnitProps = EmploymentIncreaseDataProps & {
  type: EmploymentIncreaseTypes;
};
const EmploymentIncreaseDataUnit = ({
  type,
  width,
  last5Years,
  employmentIncreaseData,
}: EmploymentIncreaseDataUnitProps) => (
  <div
    css={css`
      border-bottom: 1px dashed var(--navy);
    `}
  >
    <Row
      width={width}
      data={[
        `청년 (${employmentIncreaseTitles[type]})`,
        ...last5Years.map((year) =>
          parseMoney(employmentIncreaseData.data[year][type].youth)
        ),
      ]}
    />
    <Row
      width={width}
      data={[
        `장년 (${employmentIncreaseTitles[type]})`,
        ...last5Years.map((year) =>
          parseMoney(employmentIncreaseData.data[year][type].manhood)
        ),
      ]}
    />
  </div>
);

export default React.memo(EmploymentIncreaseTable);
