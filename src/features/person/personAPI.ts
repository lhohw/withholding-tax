import { parseMoney, isYouth } from "lib/utils";
import { getBirthCentury } from "lib/values";
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
  taxLoveMonthlyStatementRegex,
} from "constants/regex";

export class Person {
  id: string = "";
  name: string = "";
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
  payment: PersonPayment = {};
  constructor({
    data,
    left,
    isTaxLove,
  }: {
    data: [string, number][];
    left: number[];
    isTaxLove: boolean;
  }) {
    this.init({ data, left, isTaxLove });
    // console.log(data, left);
    // const [s, idx] = data[8];
    // for (let i = 0; i < s.length; i++) {
    //   console.log(s[i], left[idx + i]);
    // }
  }
  init({
    data,
    left,
    isTaxLove,
  }: {
    data: [string, number][];
    left: number[];
    isTaxLove: boolean;
  }) {
    let [
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
    if (isTaxLove) {
      [id, startDate, retirementDate, earnedIncomeWithholdingDepartment] = [
        earnedIncomeWithholdingDepartment,
        id,
        startDate,
        retirementDate,
      ];
    }

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
      this.payment,
      isTaxLove
    );
  }
}

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
  yearPrefix: number,
  isTaxLove: boolean
): MonthlyStatementOfPaymentOfWageAndSalary => {
  const obj = getDefaultStatement();
  // console.log(line);
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!char.trim()) continue;
    const x = left[startIndex + i];

    // console.log(char, x);

    const title = findPositionForParsingStatement(x);
    obj[title as keyof typeof obj] += char;
  }

  const monthlyStatement: MonthlyStatementOfPaymentOfWageAndSalary = {
    payment: {
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
    monthlyStatement.payment.youth = monthlyStatement.totalPay.total;
  else monthlyStatement.payment.manhood = monthlyStatement.totalPay.total;

  return monthlyStatement;
};

const createStatement = (
  input: [string, number],
  left: number[],
  yearPrefix: number,
  id: string,
  payment: PersonPayment,
  isTaxLove: boolean
) => {
  const [text, index] = input;
  let match;
  let here = -1;
  const statement: MonthlyStatementOfPaymentOfWageAndSalary[] = [];

  payment[yearPrefix] = { youth: 0, manhood: 0 };
  let tag: string = "";
  const regex = isTaxLove
    ? taxLoveMonthlyStatementRegex(yearPrefix)
    : monthlyStatementRegex;
  while ((match = regex.exec(text))) {
    if (here === -1) {
      tag = match[0];
      here = match.index;
      continue;
    }
    const monthlyStatement = createMonthlyStatement(
      text.slice(here, match.index),
      left,
      index + here,
      id,
      tag,
      yearPrefix,
      isTaxLove
    );
    statement.push(monthlyStatement);
    payment[yearPrefix].youth += monthlyStatement.payment.youth;
    payment[yearPrefix].manhood += monthlyStatement.payment.manhood;

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
export type PersonPayment = {
  [year: string]: Record<"youth" | "manhood", number>;
};

export type MonthlyStatementOfPaymentOfWageAndSalary = {
  payment: {
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
