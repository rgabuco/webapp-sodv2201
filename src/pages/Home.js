import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Grid, CardMedia } from "@mui/material";
import { Box, Typography } from '@mui/material';

// Import images from the assets folder
import student5 from "../assets/student5.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpeg";
import student1 from "../assets/student1.jpg";
import student4 from "../assets/student4.jpg";
import student6 from "../assets/student6.jpg";

// Import the DateTime component
import DateTime from "../components/date-time/DateTime"; // Correct import path

// Add all images to the imageList array
const imageList = [student1, student2, student3, student4, student5, student6];

function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1); // For fade effect

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  useEffect(() => {
    const fadeOut = () => {
      setOpacity(0); // Start fading out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length); // Change image
        setOpacity(1); // Start fading in
      }, 1000); // Time to fade out (1000ms)
    };

    const timer = setInterval(fadeOut, 5000); // Change image every 5 seconds (after fading out)

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />

      {/* Current Date and Time aligned to the right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0, color: "#34405E", margin: '0 0 20px 0' }}>
        <DateTime /> {/* Add DateTime component here to display it on this page */}
      </Box>
      
      {/* Home Heading */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h3">Welcome to Bow Space</Typography>
        </Box>

        {/* Photo Slideshow */}
        <Grid container justifyContent="center" alignItems="center">
          <CardMedia
            component="img"
            image={imageList[currentImageIndex]}
            alt={`Slideshow image ${currentImageIndex + 1}`}
            style={{
              width: "600px",         // Fixed width for all images
              height: "350px",        // Fixed height for all images
              objectFit: "cover",     // Ensures the image covers the area without distortion
              margin: "0 auto",       // Centers the image horizontally
              opacity: opacity,       // Use opacity from state for fade effect
              transition: "opacity 0.5s ease-in-out", // Smooth transition effect
            }}
          />
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
