import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";

const getNavText = (pathname) => {
  switch (pathname) {
    case "/login":
      return "Login";
    case "/programs":
      return "Programs";
    case "/courses":
      return "Courses";
    case "/about":
      return "About";
    case "/signup":
      return "Sign Up";
    default:
      return "Home";
  }
};

function Navbar({ loginIcon = "Login", showLoginButton = true, leftMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [navText, setNavText] = useState(getNavText(location.pathname));

  useEffect(() => {
    setNavText(getNavText(location.pathname));
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#34405E" }}>
        <Toolbar>
          {leftMenu}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {navText}
          </Typography>
          {showLoginButton && (
            <Button color="inherit" onClick={() => handleNavigation("/login")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LoginIcon />
                <Box sx={{ ml: 1 }}>{loginIcon}</Box>
              </Box>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
