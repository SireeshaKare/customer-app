import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { Container } from "@mui/material";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  getLoggedInCustomer,
  readCustomersFromLocalStorage,
  writeCustomersToLocalStorage,
} from "./utils";

function App() {
  const navigate = useNavigate();

  const customers = readCustomersFromLocalStorage();

  const loggedInCustomer = getLoggedInCustomer(customers);

  const [isLoggedIn, setIsLoggedIn] = useState(
    loggedInCustomer ? loggedInCustomer.isLoggedIn : false
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/addEmployee");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (loggedInCustomer) {
      const updatedCustomers = customers.map((customer) => {
        if (customer.email === loggedInCustomer.email) {
          return { ...customer, isLoggedIn: false };
        }
        return customer;
      });

      writeCustomersToLocalStorage(updatedCustomers);
    }
    navigate("/login");
  };

  return (
    <>
      <Sidebar onLogout={handleLogout} isLoggedIn={isLoggedIn}>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<SignUp onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/employees"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={<EmployeeList />}
                />
              }
            />
            <Route
              path="/addEmployee"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={<EmployeeForm />}
                />
              }
            />
          </Routes>
        </Container>
      </Sidebar>
    </>
  );
}

export default App;
