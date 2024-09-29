import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import InfoIcon from "@mui/icons-material/Info";

const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Programs", icon: <SchoolIcon />, path: "/programs" },
  { text: "Courses", icon: <BookIcon />, path: "/courses" },
  { text: "About", icon: <InfoIcon />, path: "/about" },
];

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

function Navbar({ loginIcon = "Login", showLoginButton = true }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [navText, setNavText] = useState(getNavText(location.pathname));

  useEffect(() => {
    setNavText(getNavText(location.pathname));
  }, [location.pathname]);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleNavigation = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const list = () => (
    <List>
      {navItems.map((item) => (
        <ListItem button key={item.text} onClick={() => handleNavigation(item.path)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#34405E" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onMouseEnter={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {navText}
          </Typography>
          {showLoginButton && (
            <Button color="inherit" onClick={() => handleNavigation("/login")}>
              {loginIcon}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: 300 }, // Increase the width of the drawer
          onMouseLeave: handleDrawerClose,
        }}
      >
        <div onMouseEnter={handleDrawerOpen}>{list()}</div>
      </Drawer>
    </>
  );
}

export default Navbar;
