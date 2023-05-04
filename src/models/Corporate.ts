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
}

export default Corporate;
