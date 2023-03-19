import Corporate from "./Corporate";
import { parseMoney } from "lib/utils";

export type YYYYMMDD = `${string}.${string}.${string}`;
export type WorkingDate = Record<"start" | "resign", YYYYMMDD>;
export type Salary = Record<"youth" | "manhood", number>;
export type YearlyData<T> = {
  [year: string]: T;
};

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

class Employee {
  constructor(
    public id: string,
    public birth: YYYYMMDD,
    public name: string,
    public corporate: Pick<Corporate, "name" | "RN" | "address">,
    public date: YearlyData<WorkingDate>,
    public earnedIncomeWithholdingDepartment: YearlyData<
      MonthlyStatementOfPaymentOfWageAndSalary[]
    >,
    public year: string,
    public salary: YearlyData<Salary> = {
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
    }
  ) {}
  getTableData(year: string) {
    const { name, date, birth, earnedIncomeWithholdingDepartment, salary } =
      this;
    if (!this.earnedIncomeWithholdingDepartment[year]) {
      return [
        name,
        "",
        "",
        birth.slice(2),
        "0",
        "0",
        ...new Array(12).fill("-"),
      ];
    }
    const { start, resign } = date[year];
    const { youth, manhood } = salary[year];
    return [
      name,
      birth.slice(2),
      start.slice(2),
      resign.slice(2),
      parseMoney(youth),
      parseMoney(manhood),
      ...earnedIncomeWithholdingDepartment[year].map((e) =>
        e.salary.youth ? "청년" : e.salary.manhood ? "장년" : "-"
      ),
    ];
  }
}

export default Employee;
