export const getBirthCentury = (id: string) => {
  const firstRearDigit = id.split("-")[1][0];
  return (
    19 +
    (firstRearDigit === "3" ||
    firstRearDigit === "4" ||
    firstRearDigit === "7" ||
    firstRearDigit === "8"
      ? 1
      : 0)
  ).toString();
};

export const getLastYears = (len: number) => {
  const year = parseInt(new Date().toLocaleString().split(". ")[0]);
  return new Array(len)
    .fill(undefined)
    .map((_, i) => (year - (len - i)).toString());
};

export const getDefaultPayment = () => ({ youth: 0, manhood: 0 });

export const getDefaultGeneration = () => new Array(12).fill(0);
