import React from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";

interface SidebarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isLoggedIn,
  onLogout,
}) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 2,
          }}
        >
          <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
            Customer App
          </Typography>
          <Box component="nav">
            {!isLoggedIn && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <a href="/">Sign Up</a>
              </Typography>
            )}
            {!isLoggedIn && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <a href="/login">Login</a>
              </Typography>
            )}
            {isLoggedIn && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <a href="/employees">Employee List</a>
              </Typography>
            )}
            {isLoggedIn && (
              <Typography variant="body2">
                <a href="/addEmployee">Add Employee</a>
              </Typography>
            )}
            {isLoggedIn && (
              <Button
                variant="contained"
                color="primary"
                onClick={onLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
