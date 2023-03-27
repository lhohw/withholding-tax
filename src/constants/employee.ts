export const defaultStatement = () => ({
  tag: "",
  salaryDate: "",
  salary: "",
  bonus: "",
  recognitionBonus: "",
  profitFromExerciseOfStockOption: "",
  withdrawalFromOurEmployeeStockOwnershipAssociation: "",
  exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: "",
  22: "",
  29: "",
  total: "",
  salaryRange: "",
  incomeTax: "",
  externalIncomeTax: "",
  totalIncomeTax: "",
  localIncomeTax: "",
});

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
 * 그외 소득세 ~2002
 * 소득세계 ~2156.42
 * 지방소득세 ~2327
 *
 * // tax love
 * 월별 ~170.5512
 * 지급 연월 ~278.5512
 * 급여 ~491.7069
 * 상여 ~644.7789
 * 인정 상여 ~789
 * 주식매수 선택권 행사이익 ~941.14
 * 우리사주 조합 인출금 ~1094.55
 * 임원퇴직 소득금액 한도초과액 ~1238.55
 * 22 ~1310.55
 * 29 ~1382.55
 * 계 ~1544.5512
 * 급여 구간 ~1851.7728
 * 소득세 ~1992.667
 * 그외 소득세 ~2142.8982
 * 소득세계 ~2294.5447
 * 지방소득세 ~2400
 */
export const range = [
  205.128, 348.282, 495.933, 640.149, 784.962, 997.158, 1125.53, 1247.78,
  1299.62, 1363.48, 1538.14, 1727.53, 1876.05, 2002, 2156.42, 2327,
];
export const taxLoveRange = [
  170.5512, 278.5512, 491.7069, 644.7789, 789, 941.14, 1094.55, 1238.55,
  1310.55, 1382.55, 1566.6, 1851.7728, 1992.667, 2142.8982, 2294.5447, 2400,
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
