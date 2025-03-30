import { capitalize } from "lodash";
import { getLoggedInCustomer, readCustomersFromLocalStorage } from "../utils";

const EmployeeList = () => {
  const customers = readCustomersFromLocalStorage();

  if (!customers) {
    return <div>No customers found</div>;
  }
  const loggedInCustomer = getLoggedInCustomer(customers);
  if (!loggedInCustomer) {
    return <div>No logged-in customer found</div>;
  }
  const employees = loggedInCustomer.employees;
  if (employees.length === 0) {
    return <div>No employees found</div>;
  }
  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {capitalize(employee.name)} - {capitalize(employee.role)} -{" "}
            {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EmployeeList;
