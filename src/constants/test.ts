import type { YYYYMMDD } from "models/Employee";
import type { CorporateProps } from "features/corporate/Corporate";
import { CorporateState, Generation } from "features/corporate/corporateSlice";

import { getLastYears } from "lib/values";
import { createMockSalary } from "lib/test-utils";

export const RN: string = "000-00-00000";
export type PersonnelData = CorporateProps["data"];
export type CorporateData = CorporateState[string]["data"];

export const personId = ["A", "B", "C", "D", "E"];
export const last6Years = getLastYears(6);
export const thisYear = +last6Years[5] + 1;
export const personnelData: PersonnelData = {
  RN: "",
  name: "Test",
  address: "부산광역시연제구 경기장로13 (거제동)",
  employees: {
    // 청년에서 장년으로 바뀌는 경우 (첫 해)
    [personId[0]]: {
      year: "",
      id: `${(thisYear - 30).toString().slice(2)}1017-1234567`,
      birth: `${thisYear - 30}.10.17`,
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
            resign: "" as YYYYMMDD,
          },
        }),
        {}
      ),
      name: "A",
      salary: {
        [last6Years[0]]: { youth: 200, manhood: 600 },
        [last6Years[1]]: { youth: 0, manhood: 2400 },
        [last6Years[2]]: { youth: 0, manhood: 2400 },
        [last6Years[3]]: { youth: 0, manhood: 2400 },
        [last6Years[4]]: { youth: 0, manhood: 2400 },
        [last6Years[5]]: { youth: 0, manhood: 2400 },
      },
      earnedIncomeWithholdingDepartment: {
        [last6Years[0]]: createMockSalary(
          last6Years[0],
          "- - - - - - - 청년 청년 장년 장년 장년".split(" ") as Generation[]
        ),
        ...last6Years.slice(1).reduce(
          (data, year) => ({
            ...data,
            [year]: createMockSalary(
              year,
              "장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년".split(
                " "
              ) as Generation[]
            ),
          }),
          {}
        ),
      },
    },
    // 1달 근무, 27일 초과 31일 이하 (보라색)
    [personId[1]]: {
      year: "",
      birth: `${thisYear - 40}.05.17`,
      corporate: {
        RN: "000-00-00000",
        address: "부산광역시연제구 경기장로13 (거제동)",
        name: "Test",
      },
      date: {
        [last6Years[1]]: {
          start: `${last6Years[1]}.11.01` as YYYYMMDD,
          resign: `${last6Years[1]}.11.30` as YYYYMMDD,
        },
        [last6Years[2]]: {
          start: `${last6Years[2]}.11.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
        [last6Years[3]]: {
          start: `${last6Years[2]}.11.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
        [last6Years[4]]: {
          start: `${last6Years[2]}.11.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
      },
      id: personId[1],
      name: "B",
      salary: {
        [last6Years[1]]: { youth: 0, manhood: 200 },
        [last6Years[2]]: { youth: 0, manhood: 400 },
        [last6Years[3]]: { youth: 0, manhood: 2400 },
        [last6Years[4]]: { youth: 0, manhood: 2400 },
      },
      earnedIncomeWithholdingDepartment: {
        [last6Years[1]]: createMockSalary(
          last6Years[1],
          "- - - - - - - - - - 장년 -".split(" ") as Generation[]
        ),
        [last6Years[2]]: createMockSalary(
          last6Years[2],
          "- - - - - - - - - - 장년 장년".split(" ") as Generation[]
        ),
        [last6Years[3]]: createMockSalary(
          last6Years[3],
          "장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년".split(
            " "
          ) as Generation[]
        ),
        [last6Years[4]]: createMockSalary(
          last6Years[4],
          "장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년".split(
            " "
          ) as Generation[]
        ),
      },
    },
    // 1달 미만(27일 이하) 근무
    [personId[2]]: {
      year: "",
      birth: `${thisYear - 22}.05.17`,
      corporate: {
        RN: "000-00-00000",
        address: "부산광역시연제구 경기장로13 (거제동)",
        name: "Test",
      },
      date: {
        [last6Years[1]]: {
          start: `${last6Years[1]}.02.24` as YYYYMMDD,
          resign: `${last6Years[1]}.03.11` as YYYYMMDD,
        },
        [last6Years[2]]: {
          start: `${last6Years[2]}.12.24` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
        [last6Years[3]]: {
          start: `${last6Years[2]}.12.24` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
        [last6Years[4]]: {
          start: `${last6Years[2]}.12.24` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
      },
      id: personId[2],
      name: "C",
      salary: {
        [last6Years[1]]: { youth: 200, manhood: 0 },
        [last6Years[2]]: { youth: 100, manhood: 0 },
        [last6Years[3]]: { youth: 1200, manhood: 0 },
        [last6Years[4]]: { youth: 1200, manhood: 0 },
      },
      earnedIncomeWithholdingDepartment: {
        [last6Years[1]]: createMockSalary(
          last6Years[1],
          "- 청년 청년 - - - - - - - - -".split(" ") as Generation[]
        ),
        [last6Years[2]]: createMockSalary(
          last6Years[2],
          "- - - - - - - - - - - 청년".split(" ") as Generation[]
        ),
        [last6Years[3]]: createMockSalary(
          last6Years[3],
          "청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년".split(
            " "
          ) as Generation[]
        ),
        [last6Years[4]]: createMockSalary(
          last6Years[4],
          "청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년".split(
            " "
          ) as Generation[]
        ),
      },
    },
    // 급여가 없지만 원천징수부가 있는 경우
    [personId[3]]: {
      year: "",
      birth: `${thisYear - 22}.05.17`,
      corporate: {
        RN: "000-00-00000",
        address: "부산광역시연제구 경기장로13 (거제동)",
        name: "Test",
      },
      date: {
        [last6Years[1]]: {
          start: `${last6Years[1]}.12.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
        [last6Years[2]]: {
          start: `${last6Years[1]}.12.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
      },
      id: personId[3],
      name: "D",
      salary: {
        [last6Years[1]]: { youth: 100, manhood: 0 },
        [last6Years[2]]: { youth: 0, manhood: 0 },
      },
      earnedIncomeWithholdingDepartment: {
        [last6Years[1]]: createMockSalary(
          last6Years[1],
          "- - - - - - - - - - - 청년".split(" ") as Generation[]
        ),
        [last6Years[2]]: createMockSalary(
          last6Years[2],
          "- - - - - - - - - - - -".split(" ") as Generation[]
        ),
      },
    },
    [personId[4]]: {
      year: "",
      birth: `${thisYear - 2 - 30}.07.23`,
      corporate: {
        RN: "000-00-00000",
        address: "부산광역시연제구 경기장로13 (거제동)",
        name: "Test",
      },
      date: {
        [last6Years[4]]: {
          start: `${last6Years[4]}.01.01` as YYYYMMDD,
          resign: "" as YYYYMMDD,
        },
      },
      id: personId[4],
      name: "E",
      salary: {
        [last6Years[4]]: { youth: 600, manhood: 1200 },
      },
      earnedIncomeWithholdingDepartment: {
        [last6Years[4]]: createMockSalary(
          last6Years[4],
          "청년 청년 청년 청년 청년 청년 장년 장년 장년 장년 장년 장년".split(
            " "
          ) as Generation[]
        ),
      },
    },
  },
};
export const corporateData: CorporateData = {
  [last6Years[0]]: {
    total: {
      salary: { youth: 200, manhood: 600 },
      generation: {
        youth: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        manhood: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        total: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      },
      sum: { youth: 2, manhood: 3, total: 5 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 200, manhood: 600 },
        generation: "- - - - - - - 청년 청년 장년 장년 장년".split(
          " "
        ) as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
    },
    monthCnt: 12,
  },
  [last6Years[1]]: {
    total: {
      salary: { youth: 100, manhood: 2600 },
      generation: {
        youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
      },
      sum: { youth: 1, manhood: 13, total: 14 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: {
            start: `${last6Years[1].slice(2)}.11.01` as YYYYMMDD,
            resign: `${last6Years[1].slice(2)}.11.30` as YYYYMMDD,
          },
          workingDays: 29,
        },
        salary: { youth: 0, manhood: 200 },
        generation: "- - - - - - - - - - 장년 -".split(" ") as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[1].slice(2)}.02.24` as YYYYMMDD,
            resign: `${last6Years[1].slice(2)}.03.11` as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: "- - - - - - - - - - - -".split(" ") as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[1].slice(2)}.12.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 100, manhood: 0 },
        generation: "- - - - - - - - - - - 청년".split(" ") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
    },
    monthCnt: 12,
  },
  [last6Years[2]]: {
    total: {
      salary: { youth: 100, manhood: 2800 },
      generation: {
        youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      },
      sum: { youth: 1, manhood: 14, total: 15 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.11.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 400 },
        generation: "- - - - - - - - - - 장년 장년".split(" ") as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.12.24` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 100, manhood: 0 },
        generation: "- - - - - - - - - - - 청년".split(" ") as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(true),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[1].slice(2)}.12.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("청년") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
    },
    monthCnt: 12,
  },
  [last6Years[3]]: {
    total: {
      salary: { youth: 1200, manhood: 4800 },
      generation: {
        youth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        manhood: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        total: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      },
      sum: { youth: 12, manhood: 24, total: 36 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.11.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.12.24` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 1200, manhood: 0 },
        generation: new Array(12).fill("청년") as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: "" as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
    },
    monthCnt: 12,
  },
  [last6Years[4]]: {
    total: {
      salary: { youth: 1800, manhood: 6000 },
      generation: {
        youth: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
        manhood: [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
        total: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      },
      sum: { youth: 18, manhood: 30, total: 48 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.11.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation:
          "장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년 장년".split(
            " "
          ) as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: `${last6Years[2].slice(2)}.12.24` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 1200, manhood: 0 },
        generation:
          "청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년 청년".split(
            " "
          ) as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: "" as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: {
            start: `${last6Years[4].slice(2)}.01.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 600, manhood: 1200 },
        generation:
          "청년 청년 청년 청년 청년 청년 장년 장년 장년 장년 장년 장년".split(
            " "
          ) as Generation[],
      },
    },
    monthCnt: 12,
  },
  [last6Years[5]]: {
    total: {
      salary: { youth: 0, manhood: 2400 },
      generation: {
        youth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        manhood: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      sum: { youth: 0, manhood: 12, total: 12 },
    },
    employees: {
      [personId[0]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "A",
          birth: `${thisYear - 30}.10.17`,
          date: {
            start: `${last6Years[0].slice(2)}.08.01` as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 2400 },
        generation: new Array(12).fill("장년") as Generation[],
      },
      [personId[1]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "B",
          birth: `${thisYear - 40}.05.17`,
          date: {
            start: "" as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: "- - - - - - - - - - - -".split(" ") as Generation[],
      },
      [personId[2]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "C",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: "" as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: "- - - - - - - - - - - -".split(" ") as Generation[],
      },
      [personId[3]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "D",
          birth: `${thisYear - 22}.05.17`,
          date: {
            start: "" as YYYYMMDD,
            resign: "" as YYYYMMDD,
          },
        },
        salary: { youth: 0, manhood: 0 },
        generation: new Array(12).fill("-") as Generation[],
      },
      [personId[4]]: {
        info: {
          checked: new Array(12).fill(false),
          name: "E",
          birth: `${thisYear - 2 - 30}.07.23`,
          date: { start: "" as YYYYMMDD, resign: "" as YYYYMMDD },
        },
        salary: { youth: 0, manhood: 0 },
        generation: "- - - - - - - - - - - -".split(" ") as Generation[],
      },
    },
    monthCnt: 12,
  },
};
