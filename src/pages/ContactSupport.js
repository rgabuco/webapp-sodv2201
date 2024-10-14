import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import usersArray from "../utils/data/Users"; // Assuming the data file has user information

function ContactSupport() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Get logged in user's name and email from localStorage and set them in the form
    const username = localStorage.getItem("userLoggedIn");
    const user = usersArray.find((user) => user.username === username); // Find user from the array

    if (username && user) {
      setFormData({
        username,
        email: user.email, // Automatically set the logged-in user's email
        message: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the message
    const newMessage = {
      ...formData,
      date: new Date().toISOString(),
    };

    // Save the message for all admins
    saveMessageForAllAdmins(newMessage);

    console.log("Message Saved:", newMessage);

    // Clear the form after submission
    setFormData((prev) => ({ ...prev, message: "" }));
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          margin: "0 auto",
          mt: 3,
          padding: 3,
          borderRadius: "12px", // Softer corners
          boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.3), -5px -10px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
          transition: "transform 0.3s ease", // Smooth transition on hover
          "&:hover": {
            transform: "translateY(-5px)", // Slight lift on hover
            boxShadow: "5px 15px 25px rgba(0, 0, 0, 0.4), -5px -15px 25px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
          },
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#2B3C5E" }}>
          Contact Support
        </Typography>
        <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" required disabled />
        <TextField fullWidth label="User Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required disabled />
        <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} margin="normal" multiline rows={4} required />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

// Save the message for all admins
function saveMessageForAllAdmins(newMessage) {
  const storedMessages = JSON.parse(localStorage.getItem("bvc-messages")) || {};

  // Save message under each admin's username
  usersArray.forEach((user) => {
    if (user.isAdmin) {
      if (!storedMessages[user.username]) {
        storedMessages[user.username] = [];
      }
      storedMessages[user.username].push(newMessage);
    }
  });

  localStorage.setItem("bvc-messages", JSON.stringify(storedMessages));
}

export default ContactSupport;
