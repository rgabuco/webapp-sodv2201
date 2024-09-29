import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = ({ loginIcon = "Login" }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login");
  };

  return (
    <Button color="inherit" onClick={handleNavigation}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LoginIcon />
        <Box sx={{ ml: 1 }}>{loginIcon}</Box>
      </Box>
    </Button>
  );
};

export default LoginButton;
