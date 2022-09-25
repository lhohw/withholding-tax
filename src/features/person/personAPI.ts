import { parseMoney, isYouth, getBirthCentury } from "lib/utils";
import { getDefaultStatement, range, titles } from "./personVariable";
import {
  yearRegex,
  idRegex,
  nameRegex,
  corporateRegex,
  RNRegex,
  addressRegex,
  dateRegex,
  monthlyStatementRegex,
} from "constants/regex";

const findPositionForParsingStatement = (x: number) => {
  let i = 0;
  while (i < range.length && x > range[i]) i++;
  if (i === range.length)
    throw new Error("Can not find position for statement");
  return titles[i];
};

const createMonthlyStatement = (
  line: string,
  left: number[],
  startIndex: number,
  id: string,
  tag: string,
  yearPrefix: number
): MonthlyStatementOfPaymentOfWageAndSalary => {
  const obj = getDefaultStatement();

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!char.trim()) continue;
    const x = left[startIndex + i];
    const title = findPositionForParsingStatement(x);
    obj[title as keyof typeof obj] += char;
  }

  const monthlyStatement: MonthlyStatementOfPaymentOfWageAndSalary = {
    generation: {
      youth: 0,
      manhood: 0,
    },
    paymentDate: `${yearPrefix}/${tag
      .replace("월", "")
      .padStart(2, "0")}` as PaymentDate,
    totalPay: {
      pay: parseMoney(obj.pay),
      bonus: parseMoney(obj.bonus),
      recognitionBonus: parseMoney(obj.recognitionBonus),
      profitFromExerciseOfStockOption: parseMoney(
        obj.profitFromExerciseOfStockOption
      ),
      withdrawalFromOurEmployeeStockOwnershipAssociation: parseMoney(
        obj.withdrawalFromOurEmployeeStockOwnershipAssociation
      ),
      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: parseMoney(
        obj.exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement
      ),
      total: parseMoney(obj.total),
    },
    theAmountOfTaxCollected: {
      simplifiedTaxAmountApplicable: {
        payRange: obj.payRange.split("~").map((num) => parseMoney(num)) as [
          number,
          number
        ],
        incomeTax: parseMoney(obj.incomeTax),
      },
      etc: {
        incomeTax: parseMoney(obj.externalIncomeTax),
      },
      totalIncomeTax: parseMoney(obj.totalIncomeTax),
      localIncomeTax: parseMoney(obj.localIncomeTax),
    },
  };
  if (isYouth(id, monthlyStatement.paymentDate))
    monthlyStatement.generation.youth = monthlyStatement.totalPay.total;
  else monthlyStatement.generation.manhood = monthlyStatement.totalPay.total;

  return monthlyStatement;
};

export class Person {
  id: string = "";
  name: string = "";
  checked: boolean = false;
  corporate: PersonCorporate = {
    name: null!,
    RN: null!,
    address: null!,
  };
  earnedIncomeWithholdingDepartment: {
    [year: string]: MonthlyStatementOfPaymentOfWageAndSalary[];
  } = {};
  date: PersonDate = {
    start: null!,
    retirement: null!,
    birth: null!,
  };
  generation: PersonGeneration = {};
  constructor({ data, left }: { data: [string, number][]; left: number[] }) {
    this.init({ data, left });
  }
  init({ data, left }: { data: [string, number][]; left: number[] }) {
    const [
      _year,
      corporate,
      corporateRN,
      address,
      name,
      earnedIncomeWithholdingDepartment,
      id,
      startDate,
      retirementDate,
    ] = data;
    const year = parseInt(_year[0].replace(yearRegex, ""));
    this.id = id[0].replace(idRegex, "");
    this.name = name[0].replace(nameRegex, "");
    this.corporate = {
      name: corporate[0].replace(corporateRegex, ""),
      RN: corporateRN[0].replace(RNRegex, ""),
      address: address[0].replace(addressRegex, ""),
    };
    this.date = {
      start: startDate[0]
        .replace(dateRegex.start, "")
        .split(/[가-힣]+/g)
        .slice(0, 3)
        .join(".") as YYYYMMDD,
      retirement: retirementDate[0]
        .replace(dateRegex.retirement, "")
        .split(/[가-힣]+/g)
        .slice(0, 3)
        .join(".") as YYYYMMDD,
      birth: getBirthCentury(this.id) + this.id.slice(0, 8),
    };
    this.earnedIncomeWithholdingDepartment[year] = createStatement(
      earnedIncomeWithholdingDepartment,
      left,
      year,
      this.id,
      this.generation
    );
  }
}

const createStatement = (
  input: [string, number],
  left: number[],
  yearPrefix: number,
  id: string,
  generation: PersonGeneration
) => {
  const [text, index] = input;
  let match;
  let here = 0;
  const statement: MonthlyStatementOfPaymentOfWageAndSalary[] = [];

  generation[yearPrefix] = { youth: 0, manhood: 0 };
  let tag: string = "";
  while ((match = monthlyStatementRegex.exec(text))) {
    if (match.index === 0) {
      tag = match[0];
      continue;
    }
    const monthlyStatement = createMonthlyStatement(
      text.slice(here, match.index),
      left,
      index + here,
      id,
      tag,
      yearPrefix
    );
    statement.push(monthlyStatement);
    generation[yearPrefix].youth += monthlyStatement.generation.youth;
    generation[yearPrefix].manhood += monthlyStatement.generation.manhood;

    tag = match[0];
    here = match.index;
  }
  return statement;
};

export type PaymentDate = `${number}/${
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "연말"
  | "종전"
  | "납세"}`;
export type YYYYMMDD = `${number}.${number}.${number}`;
export type PersonDate = Record<"start" | "retirement", YYYYMMDD> & {
  birth: string;
};
export type PersonCorporate = Record<"name" | "RN" | "address", string>;
export type PersonGeneration = {
  [year: string]: Record<"youth" | "manhood", number>;
};

export type MonthlyStatementOfPaymentOfWageAndSalary = {
  generation: {
    youth: number;
    manhood: number;
  };
  paymentDate: PaymentDate;
  totalPay: {
    pay: number;
    bonus: number;
    recognitionBonus: number;
    profitFromExerciseOfStockOption: number;
    withdrawalFromOurEmployeeStockOwnershipAssociation: number;
    exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: number;
    total: number;
  };
  theAmountOfTaxCollected: {
    simplifiedTaxAmountApplicable: {
      payRange: [number, number];
      incomeTax: number;
    };
    etc: {
      incomeTax: number;
    };
    totalIncomeTax: number;
    localIncomeTax: number;
  };
};
