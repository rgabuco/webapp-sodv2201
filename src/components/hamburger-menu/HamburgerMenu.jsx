import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

const HamburgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

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
      <IconButton edge="start" color="inherit" aria-label="menu" onMouseEnter={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
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
};

export default HamburgerMenu;
