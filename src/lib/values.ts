export const getBirthCentury = (RRN: string) => {
  const [front, rear] = RRN.split("-");
  const firstRearDigit = rear[0];
  if (firstRearDigit === "*")
    return 19 + Number(parseInt(front.slice(0, 2)) - (getThisYear() % 100) < 0);
  return (
    19 +
    Number(
      firstRearDigit === "3" ||
        firstRearDigit === "4" ||
        firstRearDigit === "7" ||
        firstRearDigit === "8"
    )
  ).toString();
};

export const getThisYear = () =>
  parseInt(new Date().toLocaleString().split(". ")[0]);

export const getLastYears = (len: number) => {
  const year = getThisYear();
  return new Array(len)
    .fill(undefined)
    .map((_, i) => (year - (len - i)).toString());
};

export const getDefaultPayment = () => ({ youth: 0, manhood: 0 });

export const getDefaultGeneration = (): number[] => new Array(12).fill(0);
