import { useRecoilState } from "recoil";

import Corporate from "models/Corporate";
import Employee from "models/Employee";
import { accordianState } from "recoil/base";
import useCorporates from "./useCorporates";

const useCorporate = () => {
  const [selectedCorporate, setSelectedCorporate] = useRecoilState(
    accordianState("corporate")
  );
  const { corporates, setCorporates } = useCorporates();

  const addEmployees = async (employees: Employee[]) => {
    const nextCorporates: {
      [RN: string]: InstanceType<typeof Corporate>;
    } = { ...corporates };
    for (const employee of employees) {
      const { id, corporate, year } = employee;
      const { RN } = corporate;
      if (!nextCorporates[RN]) {
        nextCorporates[RN] = createCorporate({ employee });
      } else if (!nextCorporates[RN].employees[id]) {
        nextCorporates[RN] = addEmployeeToCorporate({
          corporate: nextCorporates[RN],
          employee,
        });
      } else {
        nextCorporates[RN] = addEmployeeYearlyDataToCorporate({
          corporate: nextCorporates[RN],
          employee,
          year,
        });
      }
    }
    setCorporates(nextCorporates);
  };

  const filterEmployees = (employees: Corporate["employees"], year: string) => {
    const employeesArr = Object.values(employees) as Employee[];
    return employeesArr.filter((employee) => !!employee.date[year]);
  };
  return {
    selectedCorporate,
    setSelectedCorporate,
    addEmployees,
    filterEmployees,
  };
};

type CreateCorporateProps = {
  employee: InstanceType<typeof Employee>;
};
const createCorporate = ({ employee }: CreateCorporateProps) => {
  return new Corporate({
    ...employee.corporate,
    employees: {
      [employee.id]: employee,
    },
  });
};

type AddEmployeeToCorporateProps = CreateCorporateProps & {
  corporate: InstanceType<typeof Corporate>;
};
const addEmployeeToCorporate = ({
  corporate,
  employee,
}: AddEmployeeToCorporateProps) => {
  const { address, name, employees } = corporate;
  return new Corporate({
    ...corporate,
    address: address || employee.corporate.address,
    name: name || employee.corporate.name,
    employees: {
      ...employees,
      [employee.id]: employee,
    },
  });
};

type AddEmployeeYearlyDataToCorporateProps = AddEmployeeToCorporateProps & {
  year: string;
};
const addEmployeeYearlyDataToCorporate = ({
  corporate,
  employee,
  year,
}: AddEmployeeYearlyDataToCorporateProps) => {
  const { id, birth, date, earnedIncomeWithholdingDepartment, salary } =
    employee;
  return new Corporate({
    ...corporate,
    employees: {
      ...corporate.employees,
      [id]: new Employee(
        corporate.employees[id].id,
        corporate.employees[id].birth || birth,
        corporate.employees[id].name,
        corporate.employees[id].corporate,
        {
          ...corporate.employees[id].date,
          [year]: date[year],
        },
        {
          ...corporate.employees[id].earnedIncomeWithholdingDepartment,
          [year]: earnedIncomeWithholdingDepartment[year],
        },
        year,
        {
          ...corporate.employees[id].salary,
          [year]: salary[year],
        }
      ),
    },
  });
};

export default useCorporate;
