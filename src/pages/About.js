import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar'; 
import LoginButton from '../components/login-button/LoginButton'; 
import ProfileMenu from '../components/profile-menu/ProfileMenu'; 
import { Container, Box, Typography } from '@mui/material';
import AboutSection from '../components/about-section/AboutSection';
import TeamSection from '../components/team-section/Team-Section'; 
import normalImage from '../resources/img.png';

function About() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [hovered, setHovered] = useState({});

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  const handleMouseEnter = (name) => setHovered((prev) => ({ ...prev, [name]: true }));
  const handleMouseLeave = (name) => setHovered((prev) => ({ ...prev, [name]: false }));

  const teamMembers = [
    { name: "Rudy Gabuco", image: normalImage, initials: "RG" },
    { name: "Jensen Castro", image: normalImage, initials: "JC" },
    { name: "Ellah Cuna", image: normalImage, initials: "EC" },
    { name: "Paul Lipnica", image: normalImage, initials: "PL" },
    { name: "Phillip Evans Montinola", image: normalImage, initials: "PM" },
  ];

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      
      <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "15vh" }}>
        <AboutSection />
      </Container>

      <Container sx={{ marginTop: "35vh", padding: 0, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h4">The Team</Typography>
        </Box>
        <TeamSection 
          members={teamMembers} 
          hovered={hovered} 
          handleMouseEnter={handleMouseEnter} 
          handleMouseLeave={handleMouseLeave} 
        />
      </Container>
    </div>
  );
}

export default About;
