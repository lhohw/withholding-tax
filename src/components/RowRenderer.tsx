import type { ResultState } from "recoil/table/atom";

import { useMemo } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";

import Employee from "models/Employee";
import useYear from "hooks/useYear";
import { employeeCheckedState, resultState } from "recoil/table";

import Row from "./Row";
import CheckBox, { CheckBoxProps } from "./CheckBox";

export type RowRendererProps = {
  style: React.CSSProperties;
  employee: Employee;
};
const RowRenderer = ({ style, employee }: RowRendererProps) => {
  const {
    id,
    corporate: { RN },
  } = employee;
  const {
    selectedYear: { selected: year },
  } = useYear();

  const [checked, setChecked] = useRecoilState(
    employeeCheckedState({ id, year, RN })
  );
  const [resultData, setResultData] = useRecoilState(resultState({ RN, year }));

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
    for (let idx = 0; idx < 12; idx++) {
      if (condition(idx)) {
        nextChecked[idx] = !nextChecked[idx];
        const { salary } =
          employee.earnedIncomeWithholdingDepartment[year][idx];
        const { youth, manhood } = salary;
        const nextFlag = nextChecked[idx] ? -1 : 1;
        nextResultData.total[1] += (youth + manhood) * nextFlag;
        if (youth) {
          nextResultData.total[PADDING + idx] += nextFlag;
          nextResultData.youth[PADDING + idx] += nextFlag;
          nextResultData.youth[0] += youth * nextFlag;
        } else if (manhood) {
          nextResultData.total[PADDING + idx] += nextFlag;
          nextResultData.manhood[PADDING + idx] += nextFlag;
          nextResultData.manhood[1] += manhood * nextFlag;
        }
      }
    }
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
    />
  );
};

export default RowRenderer;
