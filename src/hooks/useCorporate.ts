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
      const {
        id,
        birth,
        corporate,
        year,
        earnedIncomeWithholdingDepartment,
        date,
        salary,
      } = employee;
      const { RN } = corporate;
      if (!nextCorporates[RN]) {
        nextCorporates[RN] = new Corporate({
          ...corporate,
          employees: {
            [id]: employee,
          },
        });
      } else if (!nextCorporates[RN].employees[id]) {
        nextCorporates[RN] = new Corporate({
          ...nextCorporates[RN],
          address: nextCorporates[RN].address || corporate.address,
          name: nextCorporates[RN].name || corporate.name,
          employees: {
            ...nextCorporates[RN].employees,
            [id]: employee,
          },
        });
      } else {
        nextCorporates[RN] = new Corporate({
          ...nextCorporates[RN],
          employees: {
            ...nextCorporates[RN].employees,
            [id]: new Employee(
              nextCorporates[RN].employees[id].id,
              nextCorporates[RN].employees[id].birth || birth,
              nextCorporates[RN].employees[id].name,
              nextCorporates[RN].employees[id].corporate,
              {
                ...nextCorporates[RN].employees[id].date,
                [year]: date[year],
              },
              {
                ...nextCorporates[RN].employees[id]
                  .earnedIncomeWithholdingDepartment,
                [year]: earnedIncomeWithholdingDepartment[year],
              },
              year,
              {
                ...nextCorporates[RN].employees[id].salary,
                [year]: salary[year],
              }
            ),
          },
        });
      }
    }
    setCorporates(nextCorporates);
  };

  const filterEmployees = (employees: Corporate["employees"], year: string) => {
    const employeesArr = Object.values(employees) as Employee[];
    return [
      ...employeesArr.filter((employee) => !!employee.date[year]),
      ...employeesArr.filter((employee) => !employee.date[year]),
    ];
  };
  return {
    selectedCorporate,
    setSelectedCorporate,
    addEmployees,
    filterEmployees,
  };
};

export default useCorporate;
