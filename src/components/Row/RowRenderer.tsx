import type { ResultState } from "recoil/table/atom";

import React, { useMemo } from "react";
import { css } from "@emotion/react";

import Employee from "models/Employee";

import useYear from "hooks/useYear";
import useTable from "hooks/useTable";
import useEmployee from "hooks/useEmployee";

import Row from ".";
import CheckBox, { CheckBoxProps } from "../CheckBox";

export type RowRendererProps = {
  style: React.CSSProperties;
  employee: InstanceType<typeof Employee>;
};
const RowRenderer = ({ style, employee }: RowRendererProps) => {
  const {
    id,
    corporate: { RN },
  } = employee;
  const {
    selectedYear: { selected: year },
  } = useYear();

  const { checked, setChecked, workingDays } = useEmployee({ employee, year });
  const { resultData, setResultData } = useTable({ RN, year });

  const onToggle: CheckBoxProps["onToggle"] = (idx) => {
    const nextChecked = [...checked];
    const nextResultData = {
      total: [...resultData.total],
      youth: [...resultData.youth],
      manhood: [...resultData.manhood],
    };
    if (idx !== undefined) {
      toggle((i: number) => i === idx, nextChecked, nextResultData);
    } else {
      const hasUnchecked = checked.some((checked) => checked === false);
      if (hasUnchecked) {
        toggle(
          (idx: number) => checked[idx] === false,
          nextChecked,
          nextResultData
        );
      } else
        toggle(
          (idx: number) => checked[idx] === true,
          nextChecked,
          nextResultData
        );
    }
    setChecked(nextChecked);
    setResultData(nextResultData);
  };

  const toggle = (
    condition: (idx: number) => boolean,
    nextChecked: boolean[],
    nextResultData: ResultState
  ) => {
    const PADDING = 2;
    const salary = employee.earnedIncomeWithholdingDepartment[year];
    const isAllChecked = checked.every((ch) => ch === true);
    for (let idx = 0; idx < 12; idx++) {
      if (condition(idx)) {
        nextChecked[idx] = !nextChecked[idx];
        const { salary: monthlySalary } = salary[idx];
        const { youth, manhood } = monthlySalary;
        const nextFlag = nextChecked[idx] ? -1 : 1;
        if (youth) {
          nextResultData.total[PADDING + idx] += nextFlag;
          nextResultData.youth[PADDING + idx] += nextFlag;
        } else if (manhood) {
          nextResultData.total[PADDING + idx] += nextFlag;
          nextResultData.manhood[PADDING + idx] += nextFlag;
        }
      }
    }
    const isAllNextChecked = nextChecked.every((ch) => ch === true);
    const nextFlag =
      isAllChecked && !isAllNextChecked
        ? 1
        : !isAllChecked && isAllNextChecked
        ? -1
        : 0;

    const { youth, manhood } = salary.reduce(
      (acc, { salary }) => ({
        youth: acc.youth + salary.youth,
        manhood: acc.manhood + salary.manhood,
      }),
      { youth: 0, manhood: 0 }
    );

    nextResultData.youth[0] += youth * nextFlag;
    nextResultData.manhood[1] += manhood * nextFlag;
    nextResultData.total[1] += (youth + manhood) * nextFlag;
  };
  const isAllChecked = useMemo(
    () => checked.every((ch) => ch === true),
    [checked]
  );
  return (
    <Row
      title={
        isAllChecked
          ? "삭제됨. 급여 및 인원 미포함"
          : workingDays && workingDays <= 31
          ? "근무일 수 31일 이하. 급여 및 인원 포함"
          : "급여 및 인원 포함"
      }
      css={css`
        color: ${isAllChecked
          ? "var(--orange)"
          : workingDays && workingDays <= 31
          ? "var(--purple)"
          : "inherit"};
        text-decoration: ${isAllChecked ? "line-through" : "none"};
      `}
      style={style}
      handler={<CheckBox id={id} checked={checked} onToggle={onToggle} />}
      data={employee.getTableData(year)}
      checked={checked}
      isAllChecked={isAllChecked}
      onToggle={onToggle}
    />
  );
};

export default React.memo(RowRenderer);
