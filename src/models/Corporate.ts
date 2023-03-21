import Employee from "./Employee";

export type CorporateProps = {
  RN: string;
  name: string;
  address: string;
  employees: { [id: string]: Employee };
};
class Corporate {
  public RN: string;
  public name: string;
  public address: string;
  public employees: {
    [id: string]: Employee;
  };
  constructor({ RN, name, address, employees }: CorporateProps) {
    this.RN = RN;
    this.name = name;
    this.address = address;
    this.employees = employees;
  }
  getTableResult(year: string) {
    const { employees } = this;
    const ret = {
      total: new Array(14).fill(0),
      youth: new Array(14).fill(0),
      manhood: new Array(14).fill(0),
    };

    const PADDING = 2;

    for (const { salary, earnedIncomeWithholdingDepartment } of Object.values(
      employees
    )) {
      if (!(year in salary)) continue;
      const { youth, manhood } = salary[year];
      const monthlyData = earnedIncomeWithholdingDepartment[year];
      ret.total[1] += youth + manhood;
      for (let month = 0; month < 12; month++) {
        const {
          salary: { youth, manhood },
        } = monthlyData[month];
        const youthVal = Number(youth !== 0);
        const manhoodVal = Number(manhood !== 0);
        ret.total[PADDING + month] += youthVal + manhoodVal;
        ret.youth[PADDING + month] += youthVal;
        ret.youth[0] += youth;
        ret.manhood[PADDING + month] += manhoodVal;
        ret.manhood[1] += manhood;
      }
    }
    return ret;
  }
}

export default Corporate;
