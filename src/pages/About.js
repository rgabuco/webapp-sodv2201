import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar'; 
import LoginButton from '../components/login-button/LoginButton'; 
import ProfileMenu from '../components/profile-menu/ProfileMenu'; 
import { Container, Box, Typography, Avatar, Stack } from '@mui/material'; 
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

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      
      <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "15vh" }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h3">About</Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h5">
            Welcome to our Student Registration App, designed to simplify and enhance your academic journey! 
            Our user-friendly platform streamlines the registration process, allowing students to easily enroll in courses, 
            manage their schedules, and access essential information all in one place.
          </Typography>
        </Box>
      </Container>

      <Container sx={{ marginTop: "35vh", padding: 0, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h4">The Team</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', padding: 2, color: "#34405E" }}>
          {[
            { name: "Rudy Gabuco", hoverImage: "path/to/rudy-hover.jpg", image: normalImage, initials: "RG" },
            { name: "Jensen Castro", hoverImage: "path/to/jensen-hover.jpg", image: normalImage, initials: "JC" },
            { name: "Ellah Cuna", hoverImage: "path/to/ellah-hover.jpg", image: normalImage, initials: "EC" },
            { name: "Paul Lipnica", hoverImage: "path/to/paul-hover.jpg", image: normalImage, initials: "PL" },
            { name: "Phillip Evans Montinola", hoverImage: "path/to/phillipevans-hover.jpg", image: normalImage, initials: "PM" },
          ].map(({ name, hoverImage, image, initials }) => (
            <Stack key={name} spacing={1} alignItems="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#34405E",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 3,
                  },
                }}
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={() => handleMouseLeave(name)}
                src={hovered[name] ? image : null} 
              >
                {!hovered[name] && (
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 'bold' }}>
                    {initials}
                  </Typography>
                )}
              </Avatar>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="body2">Role: Developer</Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default About;
