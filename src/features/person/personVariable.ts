const defaultStatement = {
  tag: "",
  paymentDate: "",
  pay: "",
  bonus: "",
  recognitionBonus: "",
  profitFromExerciseOfStockOption: "",
  withdrawalFromOurEmployeeStockOwnershipAssociation: "",
  exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: "",
  22: "",
  29: "",
  total: "",
  payRange: "",
  incomeTax: "",
  externalIncomeTax: "",
  totalIncomeTax: "",
  localIncomeTax: "",
};

/*
 * 월별 ~205.128
 * 지급 연월 ~348.282
 * 급여 ~495.933
 * 상여 ~640.149
 * 인정 상여 ~784.962
 * 주식매수 선택권 행사이익 ~997.158
 * 우리사주 조합 인출금 ~1125.53
 * 임원퇴직 소득금액 한도초과액 ~1247.78
 * 22 ~1299.62
 * 29 ~1363.48
 * 계 ~1538.14
 * 급여 구간 ~1727.53
 * 소득세 ~1876.05
 * 그외 소득세 ~2003.62
 * 소득세계 ~2156.42
 * 지방소득세 ~2325
 */
export const range = [
  205.128, 348.282, 495.933, 640.149, 784.962, 997.158, 1125.53, 1247.78,
  1299.62, 1363.48, 1538.14, 1727.53, 1876.05, 2003.62, 2156.42, 2325,
];
export const titles = [
  "tag",
  "paymentDate",
  "pay",
  "bonus",
  "recognitionBonus",
  "profitFromExerciseOfStockOption",
  "withdrawalFromOurEmployeeStockOwnershipAssociation",
  "exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement",
  "22",
  "29",
  "total",
  "payRange",
  "incomeTax",
  "externalIncomeTax",
  "totalIncomeTax",
  "localIncomeTax",
];

export const getDefaultStatement = () => ({ ...defaultStatement });
