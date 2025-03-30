import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CustomerFormData, customerSchema } from "../schema/schema";
import { Customer } from "../types/types";
import { Alert, Button, TextField, Typography } from "@mui/material";
import {
  getCustomerByEmail,
  readCustomersFromLocalStorage,
  writeCustomersToLocalStorage,
} from "../utils";

interface SignUpProps {
  onLogin: () => void;
}

const SignUp = ({ onLogin }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: CustomerFormData) => {
    const newCustomer: Customer = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      isLoggedIn: true,
      employees: [],
    };
    try {
      const customers: Customer[] = readCustomersFromLocalStorage();
      const existingCustomer = getCustomerByEmail(customers, newCustomer.email);

      if (existingCustomer) {
        setErrorMessage("Email already exists");
        return;
      }
      customers.push(newCustomer);
      writeCustomersToLocalStorage(customers);
      setErrorMessage("");
      onLogin();
    } catch (error) {
      setErrorMessage(`Failed to save data: ${error}`);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Already have an account? <a href="/login">Login</a>
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </form>
    </>
  );
};

export default SignUp;
