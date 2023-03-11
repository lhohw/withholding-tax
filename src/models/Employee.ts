import type { CorporateT } from "./Corporate";

export type YYYYMMDD = `${string}.${string}.${string}`;
export type WorkingDate = Record<"start" | "resign", YYYYMMDD>;
export type Salary = Record<"youth" | "manhood", number>;

export type MonthlyStatementOfPaymentOfWageAndSalary = {
  salary: {
    youth: number;
    manhood: number;
  };
  salaryDate: number;
  totalSalary: {
    salary: number;
    bonus: number;
    recognitionBonus: number;
    profitFromExerciseOfStockOption: number;
    withdrawalFromOurEmployeeStockOwnershipAssociation: number;
    exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: number;
    total: number;
  };
  theAmountOfTaxCollected: {
    simplifiedTaxAmountApplicable: {
      salaryRange: [number, number];
      incomeTax: number;
    };
    etc: {
      incomeTax: number;
    };
    totalIncomeTax: number;
    localIncomeTax: number;
  };
};

export type EmployeeT = {
  id: string;
  name: string;
  birth: YYYYMMDD;
  corporate: Pick<CorporateT, "name" | "RN" | "address">;
  earnedIncomeWithholdingDepartment: {
    [year: string]: MonthlyStatementOfPaymentOfWageAndSalary[];
  };
  date: {
    [year: string]: WorkingDate;
  };
  salary: {
    [year: string]: Salary;
  };
};

class Employee implements EmployeeT {
  public salary: {
    [year: string]: Salary;
  };
  constructor(
    public id: string,
    public birth: YYYYMMDD,
    public name: string,
    public corporate: Pick<CorporateT, "name" | "RN" | "address">,
    public date: {
      [year: string]: WorkingDate;
    },
    public earnedIncomeWithholdingDepartment: {
      [year: string]: MonthlyStatementOfPaymentOfWageAndSalary[];
    },
    public year: string
  ) {
    this.salary = {
      [year]: {
        youth: earnedIncomeWithholdingDepartment[year].reduce(
          (acc, x) => acc + x.salary.youth,
          0
        ),
        manhood: earnedIncomeWithholdingDepartment[year].reduce(
          (acc, x) => acc + x.salary.manhood,
          0
        ),
      },
    };
  }
}

export default Employee;
