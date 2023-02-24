type Generation = Record<"youth" | "manhood", number>;
export type EmploymentIncrease = {
  [year: string]: {
    small: {
      capital: Generation;
      nonCapital: Generation;
    };
    medium: Generation;
    large: Generation;
  };
};
const _2017: EmploymentIncrease[string] = {
  small: {
    capital: {
      youth: 10000000,
      manhood: 0,
    },
    nonCapital: {
      youth: 10000000,
      manhood: 0,
    },
  },
  medium: {
    youth: 7000000,
    manhood: 0,
  },
  large: {
    youth: 3000000,
    manhood: 0,
  },
};
const _2018: EmploymentIncrease[string] = {
  small: {
    capital: {
      youth: 12000000,
      manhood: 7700000,
    },
    nonCapital: {
      youth: 11000000,
      manhood: 7000000,
    },
  },
  medium: {
    youth: 8000000,
    manhood: 4500000,
  },
  large: {
    youth: 4000000,
    manhood: 0,
  },
};
export const employmentIncrease: EmploymentIncrease = {
  "2017": _2017,
  "2018": _2018,
  "2019": _2018,
  "2020": _2018,
  "2021": _2018,
  "2022": _2018,
};
