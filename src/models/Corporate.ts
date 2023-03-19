import Employee from "./Employee";

class Corporate {
  public RN: string;
  public name: string;
  public address: string;
  public employees: {
    [id: string]: Employee;
  };
  constructor(props: Corporate) {
    const { RN, name, address, employees } = props;
    this.RN = RN;
    this.name = name;
    this.address = address;
    this.employees = employees;
  }
}

export default Corporate;
