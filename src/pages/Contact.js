import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

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
      <h1>Contact Page</h1>
      {/* Add your home content here */}
    </div>
  );
}

export default Contact;
