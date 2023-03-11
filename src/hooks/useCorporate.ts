import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  corporatesState,
  selectedCorporateIndexState,
  corporateNamesState,
  selectedCorporateState,
} from "recoil/corporates";
import Corporate from "models/Corporate";
import Employee from "models/Employee";

const useCorporate = () => {
  const [isCorporateListOpen, setIsCorporateListOpen] = useState(false);

  const [corporates, setCorporates] = useRecoilState(corporatesState);
  const [selectedCorporateIndex, setSelectedCorporateIndex] = useRecoilState(
    selectedCorporateIndexState
  );
  const corporateNames = useRecoilValue(corporateNamesState);
  const selectedCorporate = useRecoilValue(selectedCorporateState);

  const toggleCorporateList = () =>
    setIsCorporateListOpen(!isCorporateListOpen);

  const addEmployees = async (employees: Employee[]) => {
    const nextCorporates = { ...corporates };
    for (const employee of employees) {
      const {
        corporate,
        id,
        year,
        earnedIncomeWithholdingDepartment,
        date,
        birth,
        salary,
      } = employee;
      const { RN } = corporate;
      if (!nextCorporates[RN]) {
        nextCorporates[RN] = new Corporate({
          ...corporate,
          employees: { [id]: employee },
        });
      } else if (!nextCorporates[RN].employees[id]) {
        nextCorporates[RN] = {
          ...nextCorporates[RN],
          address: nextCorporates[RN].address || corporate.address,
          name: nextCorporates[RN].name || corporate.name,
          employees: {
            ...nextCorporates[RN].employees,
            [id]: employee,
          },
        };
      } else {
        nextCorporates[RN] = {
          ...nextCorporates[RN],
          employees: {
            ...nextCorporates[RN].employees,
            [id]: {
              ...nextCorporates[RN].employees[id],
              earnedIncomeWithholdingDepartment: {
                ...nextCorporates[RN].employees[id]
                  .earnedIncomeWithholdingDepartment,
                [year]: earnedIncomeWithholdingDepartment[year],
              },
              salary: {
                ...nextCorporates[RN].employees[id].salary,
                [year]: salary[year],
              },
              date: {
                ...nextCorporates[RN].employees[id].date,
                [year]: date[year],
              },
              birth: nextCorporates[RN].employees[id].birth || birth,
            },
          },
        };
      }
    }
    setCorporates(nextCorporates);
  };
  return {
    selectedCorporateIndex,
    setSelectedCorporateIndex,
    isCorporateListOpen,
    toggleCorporateList,
    addEmployees,
    corporates,
    setCorporates,
    corporateNames,
    selectedCorporate,
  };
};

export default useCorporate;
