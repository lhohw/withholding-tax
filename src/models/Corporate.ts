import Employee from "./Employee";

export type CorporateT = {
  RN: string;
  name: string;
  address: string;
  employees: {
    [id: string]: Employee;
  };
};

class Corporate implements CorporateT {
  public RN: string;
  public name: string;
  public address: string;
  public employees: {
    [id: string]: Employee;
  };
  constructor(props: CorporateT) {
    const { RN, name, address, employees } = props;
    this.RN = RN;
    this.name = name;
    this.address = address;
    this.employees = employees;
  }
}

export default Corporate;
