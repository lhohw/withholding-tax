import type { YYYYMMDD } from "features/person/personAPI";
import type { CorporateState } from "./corporateSlice";

import { renderWithProviders } from "lib/test-utils";

import { uuid as uuidv4 } from "uuidv4";
import corporateReducer, {
  setPersonnel,
  toggle,
  toggleItem,
} from "./corporateSlice";
import { getLastYears } from "lib/values";

describe("corporate reducer", () => {
  const personId = new Array(4).fill(undefined).map((_) => uuidv4());
  const last6Years = getLastYears(6);
  const thisYear = +last6Years[5] + 1;

  const initialState: CorporateState = {};
  let preloadedState: CorporateState = {};

  it("should handle initial state", () => {
    expect(corporateReducer(undefined, { type: "unknown" })).toEqual({});
  });

  it("should handle set personnel", () => {
    const actual = corporateReducer(
      initialState,
      setPersonnel({
        RN: "000-00-00000",
        data: {
          name: "Test",
          address: "부산광역시연제구 경기장로13 (거제동)",
          personnel: {
            [personId[0]]: {
              init: () => {},
              RRN: `${(thisYear - 30).toString().slice(2)}1017-1234567`,
              birth: `${thisYear - 30}1017-1`,
              corporate: {
                RN: "000-00-00000",
                address: "부산광역시연제구 경기장로13 (거제동)",
                name: "Test",
              },
              date: last6Years.reduce(
                (date, year) => ({
                  ...date,
                  [year]: {
                    start: `${last6Years[0]}.08.01`,
                    retirement: "" as YYYYMMDD,
                  },
                }),
                {}
              ),
              id: personId[0],
              name: "A",
              payment: {
                [last6Years[0]]: { youth: 200, manhood: 600 },
                [last6Years[1]]: { youth: 0, manhood: 2400 },
                [last6Years[2]]: { youth: 0, manhood: 2400 },
                [last6Years[3]]: { youth: 0, manhood: 2400 },
                [last6Years[4]]: { youth: 0, manhood: 2400 },
                [last6Years[5]]: { youth: 0, manhood: 2400 },
              },
              earnedIncomeWithholdingDepartment: {
                [last6Years[0]]: [
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/01`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/02`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/03`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/04`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/05`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/06`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[0]}/07`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 100, manhood: 0 },
                    paymentDate: `${last6Years[0]}/08`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 100,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 100,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 100, manhood: 0 },
                    paymentDate: `${last6Years[0]}/09`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 100,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 100,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 200 },
                    paymentDate: `${last6Years[0]}/10`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 200,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 200,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 200,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 200 },
                    paymentDate: `${last6Years[0]}/11`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 200,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 200,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 200 },
                    paymentDate: `${last6Years[0]}/12`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 200,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 200,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                ],
                ...last6Years.slice(1).reduce(
                  (data, year) => ({
                    ...data,
                    [year]: [
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/01` as any,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/02`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/03`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/04`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/05`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/06`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/07`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/08`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/09`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/10`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/11`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                      {
                        payment: { youth: 0, manhood: 200 },
                        paymentDate: `${year}/12`,
                        theAmountOfTaxCollected: {
                          etc: { incomeTax: 0 },
                          localIncomeTax: 0,
                          simplifiedTaxAmountApplicable: {
                            payRange: [0, 0],
                            incomeTax: 0,
                          },
                          totalIncomeTax: 0,
                        },
                        totalPay: {
                          bonus: 0,
                          exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                          pay: 200,
                          profitFromExerciseOfStockOption: 0,
                          recognitionBonus: 0,
                          total: 200,
                          withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                        },
                      },
                    ],
                  }),
                  {}
                ),
              },
            },
            [personId[1]]: {
              init: () => {},
              RRN: `${(thisYear - 40).toString().slice(2)}0517-1234567`,
              birth: `${thisYear - 40}0517-1`,
              corporate: {
                RN: "000-00-00000",
                address: "부산광역시연제구 경기장로13 (거제동)",
                name: "Test",
              },
              date: {
                [last6Years[1]]: {
                  start: `${last6Years[1]}.11.01` as YYYYMMDD,
                  retirement: `${last6Years[1]}.11.30` as YYYYMMDD,
                },
              },
              id: personId[1],
              name: "B",
              payment: {
                [last6Years[1]]: { youth: 0, manhood: 200 },
              },
              earnedIncomeWithholdingDepartment: {
                [last6Years[1]]: [
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/01` as any,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/02`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/03`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/04`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/05`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/06`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/07`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/08`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/09`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/10`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 200 },
                    paymentDate: `${last6Years[1]}/11`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 200,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 200,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/12`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                ],
              },
            },
            [personId[2]]: {
              init: () => {},
              RRN: `${(thisYear - 22).toString().slice(2)}0517-1234567`,
              birth: `${thisYear - 22}0517-1`,
              corporate: {
                RN: "000-00-00000",
                address: "부산광역시연제구 경기장로13 (거제동)",
                name: "Test",
              },
              date: {
                [last6Years[1]]: {
                  start: `${last6Years[1]}.02.24` as YYYYMMDD,
                  retirement: `${last6Years[1]}.03.11` as YYYYMMDD,
                },
              },
              id: personId[2],
              name: "C",
              payment: {
                [last6Years[1]]: { youth: 100, manhood: 0 },
              },
              earnedIncomeWithholdingDepartment: {
                [last6Years[1]]: [
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/01` as any,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 100, manhood: 0 },
                    paymentDate: `${last6Years[1]}/02`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 100,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 100,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 100, manhood: 0 },
                    paymentDate: `${last6Years[1]}/03`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 100,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 100,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/04`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/05`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/06`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/07`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/08`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/09`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/10`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/11`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                  {
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/12`,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  },
                ],
              },
            },
            [personId[3]]: {
              init: () => {},
              RRN: `${(thisYear - 22).toString().slice(2)}0517-7654321`,
              birth: `${thisYear - 22}0517-1`,
              corporate: {
                RN: "000-00-00000",
                address: "부산광역시연제구 경기장로13 (거제동)",
                name: "Test",
              },
              date: {
                [last6Years[1]]: {
                  start: `${last6Years[1]}.12.01` as YYYYMMDD,
                  retirement: "" as YYYYMMDD,
                },
                [last6Years[2]]: {
                  start: `${last6Years[1]}.12.01` as YYYYMMDD,
                  retirement: "" as YYYYMMDD,
                },
              },
              id: personId[3],
              name: "D",
              payment: {
                [last6Years[1]]: { youth: 100, manhood: 0 },
                [last6Years[2]]: { youth: 0, manhood: 0 },
              },
              earnedIncomeWithholdingDepartment: {
                [last6Years[1]]: new Array(11)
                  .fill(undefined)
                  .map((_, i) => ({
                    payment: { youth: 0, manhood: 0 },
                    paymentDate: `${last6Years[1]}/${(i + 1)
                      .toString()
                      .padStart(2, "0")}` as any,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0] as [number, number],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 0,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 0,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  }))
                  .concat({
                    payment: { youth: 100, manhood: 0 },
                    paymentDate: `${last6Years[1]}/12` as any,
                    theAmountOfTaxCollected: {
                      etc: { incomeTax: 0 },
                      localIncomeTax: 0,
                      simplifiedTaxAmountApplicable: {
                        payRange: [0, 0],
                        incomeTax: 0,
                      },
                      totalIncomeTax: 0,
                    },
                    totalPay: {
                      bonus: 0,
                      exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                      pay: 100,
                      profitFromExerciseOfStockOption: 0,
                      recognitionBonus: 0,
                      total: 100,
                      withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                    },
                  }),
                [last6Years[2]]: new Array(12).fill(undefined).map((_, i) => ({
                  payment: { youth: 0, manhood: 0 },
                  paymentDate: `${last6Years[1]}/${(i + 1)
                    .toString()
                    .padStart(2, "0")}` as any,
                  theAmountOfTaxCollected: {
                    etc: { incomeTax: 0 },
                    localIncomeTax: 0,
                    simplifiedTaxAmountApplicable: {
                      payRange: [0, 0] as [number, number],
                      incomeTax: 0,
                    },
                    totalIncomeTax: 0,
                  },
                  totalPay: {
                    bonus: 0,
                    exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
                    pay: 0,
                    profitFromExerciseOfStockOption: 0,
                    recognitionBonus: 0,
                    total: 0,
                    withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
                  },
                })),
              },
            },
          },
        },
      })
    );
    const { name, address, data } = actual["000-00-00000"];
    expect(name).toBe("Test");
    expect(address).toBe("부산광역시연제구 경기장로13 (거제동)");
    expect(data[last6Years[0]]).toEqual({
      total: {
        payment: { youth: 200, manhood: 600 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
          manhood: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
          total: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        },
        sum: { youth: 2, manhood: 3, total: 5 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 200, manhood: 600 },
          generation: "- - - - - - - 청년 청년 장년 장년 장년".split(" "),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: { start: "" as YYYYMMDD, retirement: "" as YYYYMMDD },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: { start: "" as YYYYMMDD, retirement: "" as YYYYMMDD },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: { start: "" as YYYYMMDD, retirement: "" as YYYYMMDD },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
      },
      monthCnt: 12,
    });
    expect(data[last6Years[1]]).toEqual({
      total: {
        payment: { youth: 100, manhood: 2600 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
          total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        },
        sum: { youth: 1, manhood: 13, total: 14 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 2400 },
          generation: new Array(12).fill("장년"),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: {
              start: `${last6Years[1].slice(2)}.11.01` as YYYYMMDD,
              retirement: `${last6Years[1].slice(2)}.11.30` as YYYYMMDD,
            },
            workingDays: 29,
          },
          payment: { youth: 0, manhood: 200 },
          generation: "- - - - - - - - - - 장년 -".split(" "),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: `${last6Years[1].slice(2)}.02.24` as YYYYMMDD,
              retirement: `${last6Years[1].slice(2)}.03.11` as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: `${last6Years[1].slice(2)}.12.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 100, manhood: 0 },
          generation: "- - - - - - - - - - - 청년".split(" "),
        },
      },
      monthCnt: 12,
    });
    expect(data[last6Years[2]]).toEqual({
      total: {
        payment: { youth: 0, manhood: 2400 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        sum: { youth: 0, manhood: 12, total: 12 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 2400 },
          generation: new Array(12).fill("장년"),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(true),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: `${last6Years[1].slice(2)}.12.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("청년"),
        },
      },
      monthCnt: 12,
    });
    expect(data[last6Years[3]]).toEqual({
      total: {
        payment: { youth: 0, manhood: 2400 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        sum: { youth: 0, manhood: 12, total: 12 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 2400 },
          generation: new Array(12).fill("장년"),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
      },
      monthCnt: 12,
    });
    expect(data[last6Years[4]]).toEqual({
      total: {
        payment: { youth: 0, manhood: 2400 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        sum: { youth: 0, manhood: 12, total: 12 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 2400 },
          generation: new Array(12).fill("장년"),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
      },
      monthCnt: 12,
    });
    expect(data[last6Years[5]]).toEqual({
      total: {
        payment: { youth: 0, manhood: 2400 },
        generation: {
          youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        sum: { youth: 0, manhood: 12, total: 12 },
      },
      personnel: {
        [personId[0]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "A",
            birth: `${thisYear - 30}1017-1`,
            date: {
              start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 2400 },
          generation: new Array(12).fill("장년"),
        },
        [personId[1]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "B",
            birth: `${thisYear - 40}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[2]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "C",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: "- - - - - - - - - - - -".split(" "),
        },
        [personId[3]]: {
          info: {
            checked: new Array(12).fill(false),
            name: "D",
            birth: `${thisYear - 22}0517-1`,
            date: {
              start: "" as YYYYMMDD,
              retirement: "" as YYYYMMDD,
            },
          },
          payment: { youth: 0, manhood: 0 },
          generation: new Array(12).fill("-"),
        },
      },
      monthCnt: 12,
    });
    preloadedState = actual;
  });
});
