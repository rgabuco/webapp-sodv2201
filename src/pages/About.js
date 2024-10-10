import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Container, Box, Typography } from "@mui/material";
import AboutSection from "../components/about-section/AboutSection";
import TeamSection from "../components/team-section/TeamSection";
import normalImage from "../resources/img/about/img.png";
import RudyImage from "../resources/img/about/Rudy.png";
import EllahImage from "../resources/img/about/Ellah.jpg";
import PhillipImage from "../resources/img/about/Phillip.jpg";
import JensenImage from "../resources/img/about/Jensen.jpg";
import PaulImage from "../resources/img/about/Paul.jpg";
import DateTime from "../components/date-time/DateTime";

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
    { name: "Rudy Gabuco", image: RudyImage, initials: "RG" },
    { name: "Jensen Castro", image: JensenImage, initials: "JC" },
    { name: "Ellah Cuna", image: EllahImage, initials: "EC" },
    { name: "Paul Lipnica", image: PaulImage, initials: "PL" },
    { name: "Phillip Evans Montinola", image: PhillipImage, initials: "PM" },
  ];

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: 0, color: "#34405E", margin: "0 0 20px 0" }}>
        <DateTime />
      </Box>

      <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "15vh" }}>
        <AboutSection />
      </Container>

      <Container sx={{ marginTop: "35vh", padding: 0, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: 2, color: "#34405E" }}>
          <Typography variant="h4">The Team</Typography>
        </Box>
        <TeamSection members={teamMembers} hovered={hovered} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      </Container>
    </div>
  );
}

export default About;
