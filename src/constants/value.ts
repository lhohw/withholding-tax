export type GenerationTypes = "total" | "youth" | "manhood";
export const generationTypes: GenerationTypes[] = ["total", "youth", "manhood"];

export type EmploymentIncreaseTypes =
  | "thisYear"
  | "lastYear"
  | "last2Year"
  | "exPostFacto1"
  | "exPostFacto2";
export const employmentIncreaseTypes: EmploymentIncreaseTypes[] = [
  "thisYear",
  "lastYear",
  "last2Year",
  "exPostFacto1",
  "exPostFacto2",
];

export const employmentIncreaseTitles: {
  [key in EmploymentIncreaseTypes]: string;
} = {
  thisYear: "본 년도",
  lastYear: "전 년도",
  last2Year: "2년 전",
  exPostFacto1: "사후관리 1년",
  exPostFacto2: "사후관리 2년",
};
