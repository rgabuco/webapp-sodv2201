import React, { useState } from 'react';
import { Card, CardContent, Typography, TextareaAutosize, Button, Box } from '@mui/material';

// Child component that sends data back to local storage
function ContactForm() {
  const [textData, setTextData] = useState('');

  const handleChange = (e) => {
    setTextData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to local storage
    const currentMessages = JSON.parse(localStorage.getItem('messages')) || [];
    currentMessages.push(textData);
    localStorage.setItem('messages', JSON.stringify(currentMessages));
    setTextData(''); // Reset text area
  };

  return (
    <Card
      sx={{
        backgroundColor: "#eeeeee",
        width: "50%",
        margin: 'auto',
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-10px)" },
        padding: 2,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: "#34405E" }}>
          Message:
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            minRows={10}
            value={textData}
            onChange={handleChange}
            placeholder="Message"
            style={{ width: '100%', marginBottom: '16px', border: '1px solid #ccc' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ backgroundColor: "#34405E", color: "#fff", '&:hover': { backgroundColor: '#2c3e50' } }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
