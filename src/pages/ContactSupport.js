import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import ProfileMenu from '../components/profile-menu/ProfileMenu';
import usersArray from '../utils/data/Users'; // You said not to change your imports

function ContactSupport() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Get logged in user's name from localStorage and set the form username
    const username = localStorage.getItem('userLoggedIn');
    if (username) {
      setFormData((prev) => ({ ...prev, username }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find admin using the entered email
    const admin = usersArray.find(user => user.email === formData.email && user.isAdmin);
    
    if (admin) {
      // Prepare the message
      const newMessage = {
        ...formData,
        date: new Date().toISOString()
      };
      
      // Save the message under the admin's username
      saveMessageToLocalStorage(newMessage, admin.username); // Note: we use the admin's username as the key for messages

      console.log('Message Saved:', newMessage);

      // Clear the form after submission
      setFormData((prev) => ({ ...prev, message: '' }));
    } else {
      alert('The email you entered does not belong to an admin.');
    }
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: '0 auto', mt: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Contact Support
        </Typography>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
          disabled
        />
        <TextField
          fullWidth
          label="Admin Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

// Save the message to localStorage under the admin's username
function saveMessageToLocalStorage(message, adminUsername) {
  const messages = JSON.parse(localStorage.getItem('bvc-messages')) || {};

  if (!messages[adminUsername]) {
    messages[adminUsername] = [];
  }

  messages[adminUsername].push(message);
  localStorage.setItem('bvc-messages', JSON.stringify(messages));
}

export default ContactSupport;
