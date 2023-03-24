import { useRecoilState, useRecoilValue } from "recoil";

import Employee from "models/Employee";

import { employeeCheckedState } from "recoil/employee";
import { workingDaysState } from "recoil/employee/atom";

export type UseEmployeeProps = {
  employee: InstanceType<typeof Employee>;
  year: string;
};
const useEmployee = ({ employee, year }: UseEmployeeProps) => {
  const [checked, setChecked] = useRecoilState(
    employeeCheckedState({
      id: employee.id,
      year,
      date: employee.date,
      mappedEarnedIncomeWithholdingDepartment:
        employee.earnedIncomeWithholdingDepartment[year]?.map(
          (e) => e.totalSalary.total
        ),
    })
  );
  const workingDays = useRecoilValue(
    workingDaysState({ date: employee.date, year })
  );
  return {
    checked,
    setChecked,
    workingDays,
  };
};

export default useEmployee;
