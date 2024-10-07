import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Container, Typography } from "@mui/material";
import ContactForm from "../components/contact-form/ContactForm";

function Contact() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Replace with actual logic to check if the user is logged in
    const checkUserLoggedIn = () => {
      // Example: Check local storage or make an API call
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      <Container maxWidth="lg" sx={{ mt: 3, color: "#34405E" }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 5, textAlign: "center", color: "#34405E"}}>
          Contact Information
        </Typography>
      </Container>
      <ContactForm/>
    </div>
    
  );
}

export default Contact;
