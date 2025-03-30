export interface Employee {
    name: string;
    role: string;
    email: string;
  }
  
  export interface Customer {
    fullName: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    employees: Employee[];
  }