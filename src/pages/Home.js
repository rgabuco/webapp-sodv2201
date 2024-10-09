import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Grid, CardMedia } from "@mui/material";
import { Box, Typography } from "@mui/material";
import DateTime from "../components/date-time/DateTime";
import student5 from "../assets/student5.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpeg";
import student1 from "../assets/student1.jpg";
import student4 from "../assets/student4.jpg";
import student6 from "../assets/student6.jpg";

const imageList = [student1, student2, student3, student4, student5, student6];

function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  useEffect(() => {
    const fadeOut = () => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
        setOpacity(1);
      }, 1000);
    };

    const timer = setInterval(fadeOut, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu onLogout={handleLogout} /> : <LoginButton />} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: 0, color: "#34405E", margin: "0 0 20px 0" }}>
        <DateTime />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2, color: "#34405E" }}>
          <Typography variant="h3">Welcome to Bow Space</Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <CardMedia
            component="img"
            image={imageList[currentImageIndex]}
            alt={`Slideshow image ${currentImageIndex + 1}`}
            style={{
              width: "600px",
              height: "350px",
              objectFit: "cover",
              margin: "0 auto",
              opacity: opacity,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
