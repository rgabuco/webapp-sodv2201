import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu"; // Import HamburgerMenu
import logo from "../../resources/img/logo/bvc.png"; // Adjust the path if necessary
import { Box } from "@mui/material"; // Import Box for layout

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
    case "/profile":
      return "Profile";
    case "/dashboard":
      return "Dashboard";
    case "/adm-courses":
      return "Courses";
    case "/adm-add-courses":
      return "Add Courses";
    case "/student-list":
      return "Student List";
    case "/forms":
      return "Forms";
    case "/my-courses":
      return "My Courses";
    case "/add-courses":
      return "Add Courses";
    case "/contact-support":
      return "Contact Support";
    case "/contact":
      return "Contact";
    default:
      return "Home";
  }
};

function Navbar({ leftMenu = <HamburgerMenu />, rightMenu }) {
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
            <Box component="img" src={logo} alt="Company Logo" sx={{ height: "39px", marginLeft: 1, marginRight: 2 }} /> {/* Adjust height as needed */}
          </Typography>
          {rightMenu}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
