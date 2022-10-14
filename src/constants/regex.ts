export const withholdingTaxRegex = new RegExp(
  "소득자별\\s*근로소득\\s*원천징수부|" +
    "귀속연도\\s*\\d+|" +
    "주민등록번호\\s*\\d+\\-\\d+|" +
    "성명:\\s*([\\(\\)가-힣a-zA-Z]+)?|" +
    "입사일\\s*(\\d+년\\d+월\\d+일\\s?)?|" +
    "퇴사일\\s*(\\d+년\\d+월\\d+일\\s?)?|" +
    "법\\s*인\\s*명\\(상호\\)\\s*[가-힣\\(\\)\\s\\d\\w\\-]+|" +
    "사업자등록번호[\\s\\d-]+|" +
    "근무처\\s*[가-힣\\w\\d\\s\\(\\)-]+(소 득 자)?|" +
    "1월[,~\\-/\\d\\s가-힣]+소",
  "g"
);

export const taxLoveWithholdingTaxRegex = new RegExp(
  "소득자별\\s*근로소득\\s*원천징수부|" +
    "귀속연도\\s*\\d+|" +
    "주민등록번호\\s*\\d+\\-\\d+|" +
    "성\\s*명\\s*([()가-힣a-zA-Z]+)?|" +
    "입사일\\s*[\\d+/]*|" +
    "퇴사일\\s*[\\d+/]*|" +
    "법\\s*인\\s*명\\(상호\\)\\s*[가-힣\\(\\)\\s\\d\\w\\-]+|" +
    "사업자등록번호[\\s\\d-]+|" +
    "근무처\\s*[가-힣\\w\\d\\s\\(\\)-]+(소 득 자)?|" +
    "35[,~\\-/\\d\\s가-힣a-zA-Z\\(\\)]+계",
  "g"
);

export const yearRegex = /귀속연도\s?/;
export const RRNRegex = /주민등록번호\s?/;
export const nameRegex = /성명:\s?/;
export const corporateRegex = /법인명\(상호\)\s?/;
export const RNRegex = /사업자등록번호\s?/;
export const addressRegex = /근무처\s?/;
export const dateRegex = {
  start: /입사일\s?/,
  retirement: /퇴사일\s?/,
};
export const monthlyStatementRegex = new RegExp(
  new Array(12)
    .fill(0)
    .map((_, i) => i + 1 + "월")
    .join("|") + "|연말|종전|납세|소",
  "g"
);

export const taxLoveMonthlyStatementRegex = (year: number) =>
  new RegExp(
    new Array(12)
      .fill(0)
      .map((_, i) => `${year}/${(i + 1).toString().padStart(2, "0")}`)
      .join("|") + "|연말|계",
    "g"
  );

export const exceptNumberRegex = /[^\d+]/g;
