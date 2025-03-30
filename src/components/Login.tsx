// import { useNavigate } from "react-router-dom";
import { TextField, Button, Alert, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../schema/schema";
import { useState } from "react";
import {
  getCustomerByEmail,
  readCustomersFromLocalStorage,
  updateCustomerLoginStatus,
  writeCustomersToLocalStorage,
} from "../utils";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: LoginFormData) => {
    const customers = readCustomersFromLocalStorage();
    if (customers) {
      const customer = getCustomerByEmail(customers, data.email);
      if (!customer) {
        setErrorMessage("No user found");
        return;
      }

      if (
        customer.email === data.email &&
        customer.password === data.password
      ) {
        const updatedCustomers = updateCustomerLoginStatus(
          customers,
          data.email,
          true
        );

        writeCustomersToLocalStorage(updatedCustomers);

        onLogin();
      } else {
        setErrorMessage("Incorrect credentials");
      }
    } else {
      setErrorMessage("No customers found");
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Log In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </form>
    </>
  );
};

export default Login;
