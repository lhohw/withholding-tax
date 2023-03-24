import type { ResultState } from "recoil/table/atom";

import { useMemo } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";

import Employee from "models/Employee";

import useYear from "hooks/useYear";
import useTable from "hooks/useTable";
import { employeeCheckedState } from "recoil/table";

import Row from ".";
import CheckBox, { CheckBoxProps } from "../CheckBox";

export type RowRendererProps = {
  style: React.CSSProperties;
  employee: InstanceType<typeof Employee>;
};
const RowRenderer = ({ style, employee }: RowRendererProps) => {
  const {
    id,
    earnedIncomeWithholdingDepartment,
    date,
    corporate: { RN },
  } = employee;
  const {
    selectedYear: { selected: year },
  } = useYear();

  const [checked, setChecked] = useRecoilState(
    employeeCheckedState({ id, year, earnedIncomeWithholdingDepartment, date })
  );
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
      css={css`
        color: ${isAllChecked ? "var(--orange)" : "inherit"};
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

export default RowRenderer;
