import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Modal, Container, Card } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function ContactSupport() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Get logged in user's name from localStorage
    const username = localStorage.getItem("userLoggedIn");
    // Get users data from localStorage
    const users = JSON.parse(localStorage.getItem("bvc-users")) || [];
    // Find the logged-in user from the users array
    const user = users.find((user) => user.username === username);

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

  const findNextAvailableId = (messages) => {
    const ids = messages.map((message) => message.id);
    let nextId = 1;
    while (ids.includes(nextId)) {
      nextId++;
    }
    return nextId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing messages
    const storedMessages = JSON.parse(localStorage.getItem("bvc-messages")) || [];

    // Prepare the message with the next available ID
    const newMessage = {
      id: findNextAvailableId(storedMessages),
      ...formData,
      date: new Date().toISOString(),
      isRead: false,
    };

    // Save the message in bvc-messages
    storedMessages.push(newMessage);
    localStorage.setItem("bvc-messages", JSON.stringify(storedMessages));

    console.log("Message Saved:", newMessage);

    // Clear the form after submission
    setFormData((prev) => ({ ...prev, message: "" }));

    // Open the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              p: 4,
              border: "1px solid rgba(0, 0, 0, 0.12)", // Outline
              boxShadow: 3, // Shadow
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#2B3C5E" }}>
              Contact Support
            </Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" required disabled placeholder={formData.username} />
              <TextField fullWidth label="User Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required disabled placeholder={formData.email} />
              <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} margin="normal" multiline rows={4} required />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 400, md: 500 }, // Responsive width
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Message Sent
          </Typography>
          <Typography sx={{ mt: 2 }}>Your message has been sent. Support will respond within 48 hours.</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCloseModal} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ContactSupport;
