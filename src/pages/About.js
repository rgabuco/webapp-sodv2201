import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar'; 
import LoginButton from '../components/login-button/LoginButton'; 
import ProfileMenu from '../components/profile-menu/ProfileMenu'; 
import { Container, Box, Typography } from '@mui/material'; 

function About() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      
      <Container sx={{ padding: 0, display: "flex", flexDirection: "column",  minHeight: "15vh" }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E"}}>
          <Typography variant="h3">About</Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h5">Welcome to our Student Registration App, designed to simplify and enhance your academic journey! 
            Our user-friendly platform streamlines the registration process, allowing students to easily enroll in courses, 
            manage their schedules, and access essential information all in one place.</Typography>
        </Box>
      </Container>

      <Container sx={{ marginTop: "35vh", padding: 0, display: "flex", flexDirection: "column"}}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
          <Typography variant="h4">The Team</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', padding: 2, color: "#34405E" }}>
          <Box textAlign="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            <Typography variant="h5">Rudy Gabuco</Typography>
            <Typography variant="body2">Role: Developer</Typography>
          </Box>
          <Box textAlign="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            <Typography variant="h5">Jensen Castro</Typography>
            <Typography variant="body2">Role: Developer</Typography>
          </Box>
          <Box textAlign="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            <Typography variant="h5">Ellah Cuna</Typography>
            <Typography variant="body2">Role: Developer</Typography>
          </Box>
          <Box textAlign="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            <Typography variant="h5">Paul Lipnica</Typography>
            <Typography variant="body2">Role: Developer</Typography>
          </Box>
          <Box textAlign="center" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            <Typography variant="h5">Phillip Evans Montinola</Typography>
            <Typography variant="body2">Role: Developer</Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default About;
