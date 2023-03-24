import { useRecoilState, useRecoilValue } from "recoil";

import Employee from "models/Employee";

import { employeeCheckedState } from "recoil/employee";
import { workingDaysState } from "recoil/employee/atom";

import { getDays, isRetired } from "lib/utils";
import { useEffect } from "react";

export type UseEmployeeProps = {
  employee: InstanceType<typeof Employee>;
  year: string;
};
const useEmployee = ({ employee, year }: UseEmployeeProps) => {
  const getDefaultEmployeeChecked = ({ employee, year }: UseEmployeeProps) => {
    const { earnedIncomeWithholdingDepartment, date } = employee;
    if (!(year in earnedIncomeWithholdingDepartment))
      return new Array(12).fill(false);

    const resign = date[year]?.resign;
    return earnedIncomeWithholdingDepartment[year].map(
      ({ totalSalary: { total } }, idx) => {
        if (!date[year]?.start) return false;

        const startDate = Date.parse(date[year].start);
        const monthsLastDay = Date.parse(
          `${year}.${(idx + 1).toString().padStart(2, "0")}.${getDays(
            +year,
            idx
          )}`
        );
        if (startDate > monthsLastDay) return false;
        if ((!resign || Date.parse(resign) > monthsLastDay) && total === 0)
          return true;
        if (resign && isRetired(resign, year, idx + 1)) return true;
        return false;
      }
    );
  };

  const [checked, setChecked] = useRecoilState(
    employeeCheckedState({ id: employee.id, year })
  );
  const workingDays = useRecoilValue(
    workingDaysState({ date: employee.date, year })
  );
  useEffect(() => {
    setChecked(getDefaultEmployeeChecked({ employee, year }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    checked,
    setChecked,
    workingDays,
  };
};

export default useEmployee;
