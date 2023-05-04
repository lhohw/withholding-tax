import type { MonthlyStatementOfPaymentOfWageAndSalary } from "models/Employee";

import { dateToNumber } from "./date";

export function createMockSalary(
  year: string,
  generation: ("청년" | "장년" | "-")[]
): MonthlyStatementOfPaymentOfWageAndSalary[] {
  return generation.map((gen, idx) => {
    const youth = gen === "청년" ? 100 : 0,
      manhood = gen === "장년" ? 200 : 0;
    return {
      salary: { youth, manhood },
      salaryDate: dateToNumber(`${year}/${idx.toString().padStart(2, "0")}`),
      theAmountOfTaxCollected: {
        etc: { incomeTax: 0 },
        localIncomeTax: 0,
        simplifiedTaxAmountApplicable: {
          salaryRange: [0, 0],
          incomeTax: 0,
        },
        totalIncomeTax: 0,
      },
      totalSalary: {
        bonus: 0,
        exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
        salary: youth + manhood,
        profitFromExerciseOfStockOption: 0,
        recognitionBonus: 0,
        total: youth + manhood,
        withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
      },
    };
  });
}
