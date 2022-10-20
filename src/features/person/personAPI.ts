import { v4 as uuidv4 } from "uuid";
import { parseMoney, isYouth } from "lib/utils";
import { getBirthCentury } from "lib/values";
import {
  getDefaultStatement,
  range,
  taxLoveRange,
  titles,
} from "./personVariable";
import {
  yearRegex,
  RRNRegex,
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
  RRN: string = "";
  name: string = "";
  corporate: PersonCorporate = {
    name: null!,
    RN: null!,
    address: null!,
  };
  earnedIncomeWithholdingDepartment: {
    [year: string]: MonthlyStatementOfPaymentOfWageAndSalary[];
  } = {};
  birth: string = "";
  date: PersonDate = {};
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
      RRN,
      startDate,
      retirementDate,
    ] = data;
    if (isTaxLove) {
      [RRN, startDate, retirementDate, earnedIncomeWithholdingDepartment] = [
        earnedIncomeWithholdingDepartment,
        RRN,
        startDate,
        retirementDate,
      ];
    }
    this.id = uuidv4();
    const year = parseInt(_year[0].replace(yearRegex, ""));
    this.RRN = RRN[0].replace(RRNRegex, "");
    this.name = name[0].replace(nameRegex, "");
    this.corporate = {
      name: corporate[0].replace(corporateRegex, ""),
      RN: corporateRN[0].replace(RNRegex, ""),
      address: address[0].replace(addressRegex, ""),
    };
    this.date = {
      [year]: {
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
      },
    };
    this.birth = getBirthCentury(this.RRN) + this.RRN.slice(0, 8);
    this.earnedIncomeWithholdingDepartment[year] = createStatement(
      earnedIncomeWithholdingDepartment,
      left,
      year,
      this.RRN,
      this.payment,
      isTaxLove
    );
  }
}

const findPositionForParsingStatement = (x: number, isTaxLove: boolean) => {
  const _range = isTaxLove ? taxLoveRange : range;
  let i = 0;
  while (i < _range.length && x > _range[i]) i++;
  if (i === _range.length) {
    console.log("Can not find position for statement", x);
    i--;
  }
  return titles[i];
};

const createMonthlyStatement = (
  line: string,
  left: number[],
  startIndex: number,
  RRN: string,
  tag: string,
  yearPrefix: number,
  isTaxLove: boolean,
  expectedMonth: number
): MonthlyStatementOfPaymentOfWageAndSalary => {
  if (isTaxLove && expectedMonth <= 11 && line) {
    line = line.slice(0, line.lastIndexOf((expectedMonth + 1).toString()));
  }
  const obj = getDefaultStatement();
  let prev = -1;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!char.trim()) continue;
    let x = left[startIndex + i];
    console.log(char, x);
    if (x === -1) {
      if (i !== 0 && !line[i - 1].trim()) {
        let tmp = 1;
        while (
          startIndex + i + tmp < left.length &&
          left[startIndex + i + tmp] === -1
        )
          tmp++;
        x = left[startIndex + i + tmp];
      } else x = prev;
    } else prev = x;
    const title = findPositionForParsingStatement(x, isTaxLove);
    obj[title as keyof typeof obj] += char;
  }

  const monthlyStatement: MonthlyStatementOfPaymentOfWageAndSalary = {
    payment: {
      youth: 0,
      manhood: 0,
    },
    paymentDate: `${yearPrefix}/${tag}` as PaymentDate,
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
        payRange: !obj.payRange
          ? [0, 0]
          : isTaxLove
          ? (obj.payRange
              .split(/이상\s*|미만\s*/g)
              .slice(0, 2)
              .map(parseMoney) as [number, number])
          : (obj.payRange.split("~").map(parseMoney) as [number, number]),
        incomeTax: parseMoney(obj.incomeTax),
      },
      etc: {
        incomeTax: parseMoney(obj.externalIncomeTax),
      },
      totalIncomeTax: parseMoney(obj.totalIncomeTax),
      localIncomeTax: parseMoney(obj.localIncomeTax),
    },
  };
  if (isYouth(RRN, monthlyStatement.paymentDate))
    monthlyStatement.payment.youth = monthlyStatement.totalPay.total;
  else monthlyStatement.payment.manhood = monthlyStatement.totalPay.total;
  return monthlyStatement;
};

const createStatement = (
  input: [string, number],
  left: number[],
  yearPrefix: number,
  RRN: string,
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
  let expectedMonth = 1;
  while ((match = regex.exec(text))) {
    if (here === -1) {
      tag = isTaxLove
        ? match[0].split("/")[1]
        : match[0].replace("월", "").padStart(2, "0");
      here = match.index;
      continue;
    }
    while (parseInt(tag) !== expectedMonth && expectedMonth <= 12) {
      if (parseInt(tag) < expectedMonth)
        throw new Error("invalid month, check pdf and reader.");
      const monthlyStatement = createMonthlyStatement(
        "",
        left,
        index + here,
        RRN,
        expectedMonth.toString().padStart(2, "0"),
        yearPrefix,
        isTaxLove,
        expectedMonth++
      );
      statement.push(monthlyStatement);
    }
    const monthlyStatement = createMonthlyStatement(
      text.slice(here, match.index),
      left,
      index + here,
      RRN,
      tag,
      yearPrefix,
      isTaxLove,
      expectedMonth++
    );
    statement.push(monthlyStatement);
    payment[yearPrefix].youth += monthlyStatement.payment.youth;
    payment[yearPrefix].manhood += monthlyStatement.payment.manhood;

    tag =
      (isTaxLove
        ? match[0].split("/")[1]
        : match[0].replace("월", "").padStart(2, "0")) || match[0];
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
// export type PersonDate = Record<"start" | "retirement", YYYYMMDD> & {
//   birth: string;
// };
export type PersonDate = {
  [year: string]: Record<"start" | "retirement", YYYYMMDD>;
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
