import React, { useCallback, useMemo } from "react";
import { css } from "@emotion/react";

import Employee from "models/Employee";

import useYear from "hooks/useYear";
import useEmployee from "hooks/useEmployee";

import Row from ".";
import CheckBox from "../CheckBox";

export type RowRendererProps = {
  style: React.CSSProperties;
  employee: InstanceType<typeof Employee>;
};
const RowRenderer = ({ style, employee }: RowRendererProps) => {
  const { id } = employee;
  const {
    selectedYear: { selected: year },
  } = useYear();

  const { checked, setChecked, workingDays } = useEmployee({ employee, year });
  const isAllChecked = useMemo(
    () => checked.every((ch) => ch === true),
    [checked]
  );

  const onToggle = useCallback(
    (condition: (idx: number) => boolean) => {
      const nextChecked = [...checked];
      for (let idx = 0; idx < 12; idx++) {
        if (condition(idx)) {
          nextChecked[idx] = !nextChecked[idx];
        }
      }
      setChecked(nextChecked);
    },
    [checked, setChecked]
  );

  const onToggleData = useCallback(
    (idx: number) => onToggle((i) => i === idx),
    [onToggle]
  );
  const onToggleCheckBox = useCallback(() => {
    const flag = checked.some((check) => check === false);
    return onToggle((idx: number) => checked[idx] === !flag);
  }, [onToggle, checked]);

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
      handler={
        <CheckBox id={id} checked={checked} onToggle={onToggleCheckBox} />
      }
      data={employee.getTableData(year)}
      checked={checked}
      isAllChecked={isAllChecked}
      onToggle={onToggleData}
    />
  );
};

export default React.memo(RowRenderer);
