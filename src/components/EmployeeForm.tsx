import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { EmployeeFormData, employeeSchema } from "../schema/schema";
import { Customer, Employee } from "../types/types";
import {
  addEmployee,
  getEmployeeByEmail,
  getLoggedInCustomer,
  readCustomersFromLocalStorage,
  writeCustomersToLocalStorage,
} from "../utils";

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data: EmployeeFormData) => {
    const employee: Employee = {
      name: data.name,
      role: data.role,
      email: data.email,
    };

    const customers: Customer[] = readCustomersFromLocalStorage();
    const customer = getLoggedInCustomer(customers);

    if (customer) {
      const existingEmployee = getEmployeeByEmail(
        customer.employees,
        employee.email
      );

      if (existingEmployee) {
        setSuccessMessage("");
        setErrorMessage("Employee with this email already exists.");
        return;
      }
      addEmployee(customer, employee);
    } else {
      setSuccessMessage("");
      setErrorMessage("No logged-in customer found.");
    }

    try {
      writeCustomersToLocalStorage(customers);
      setErrorMessage("");
      setSuccessMessage("Employee added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        reset();
      }, 1000);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Failed to save data: ${error}`);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          {...register("role")}
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Employee
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
      </form>
    </>
  );
};

export default EmployeeForm;
