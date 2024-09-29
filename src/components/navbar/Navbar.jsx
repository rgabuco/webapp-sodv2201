import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu"; // Import HamburgerMenu

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

function Navbar({ leftMenu = <HamburgerMenu />, rightMenu }) {
  // Set default value for leftMenu
  const location = useLocation();
  const [navText, setNavText] = useState(getNavText(location.pathname));

  useEffect(() => {
    setNavText(getNavText(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#34405E" }}>
        <Toolbar>
          {leftMenu}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {navText}
          </Typography>
          {rightMenu}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
