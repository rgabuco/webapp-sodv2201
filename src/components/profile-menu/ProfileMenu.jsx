import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";
import SupportIcon from "@mui/icons-material/Support";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/List";
import FormIcon from "@mui/icons-material/Description";

const ProfileMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdministrator") === "true";
    if (isAdmin) {
      setNavItems([
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Profile", icon: <PersonIcon />, path: "/profile" },
        { text: "Courses", icon: <BookIcon />, path: "/courses" },
        { text: "Add Courses", icon: <AddIcon />, path: "/add-courses" },
        { text: "Student List", icon: <ListIcon />, path: "/student-list" },
        { text: "Forms", icon: <FormIcon />, path: "/forms" },
        { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" },
      ]);
    } else {
      setNavItems([
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Profile", icon: <PersonIcon />, path: "/profile" },
        { text: "Add Courses", icon: <AddIcon />, path: "/add-courses" },
        { text: "My Courses", icon: <BookIcon />, path: "/my-courses" },
        { text: "Contact Support", icon: <SupportIcon />, path: "/contact-support" },
        { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" },
      ]);
    }
  }, []);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleNavigation = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("isAdministrator");
      navigate("/home");
    } else {
      navigate(path);
    }
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
      <IconButton edge="end" color="inherit" aria-label="profile-menu" onMouseEnter={handleDrawerOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: 300 }, // Increase the width of the drawer
          onMouseLeave: handleDrawerClose,
        }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default ProfileMenu;
