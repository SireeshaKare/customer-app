import { Customer, Employee } from "./types/types";

export const readCustomersFromLocalStorage = () => {
  const customers = localStorage.getItem("customers");
  if (!customers) {
    return [];
  }
  return JSON.parse(customers) as Customer[];
}

export const writeCustomersToLocalStorage = (customers: Customer[]) => {
  localStorage.setItem("customers", JSON.stringify(customers));
}

export const getLoggedInCustomer = (customers: Customer[]) => {
  return customers.find((customer) => customer.isLoggedIn);
}

export const getCustomerByEmail = (customers: Customer[], email: string) => {
  return customers.find((customer) => customer.email === email);
}

export const updateCustomerLoginStatus = (customers: Customer[], email: string, status: boolean) => {
  return customers.map((customer) => {
    if (customer.email === email) {
      return { ...customer, isLoggedIn: status };
    }
    return customer;
  });
}

export const getEmployeeByEmail = (employees: Employee[], email: string) => {
  return employees.find((employee) => employee.email === email);
}

export const addEmployee = (customer: Customer, employee: Employee) => {
  customer.employees.push(employee);
  return customer;
}