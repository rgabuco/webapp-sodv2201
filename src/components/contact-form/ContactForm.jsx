import React from 'react';
import { Typography, Box } from '@mui/material';


function ContactForm() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: 2,
        width: { xs: '100%', sm: '50%' },
        textAlign: 'center',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#34405E",
          marginRight: { xs: 0, sm: 2 },
          marginBottom: { xs: 1, sm: 0 },
          transition: 'transform 0.3s ease', 
          '&:hover': {
            transform: 'scale(1.05)', 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
          },
        }}
      >
        Phone: 403-410-1400
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#34405E",
          marginRight: { xs: 0, sm: 2 },
          marginBottom: { xs: 1, sm: 0 },
          transition: 'transform 0.3s ease', 
          '&:hover': {
            transform: 'scale(1.05)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        Toll Free: 1-866-428-2669
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#34405E",
          transition: 'transform 0.3s ease', 
          '&:hover': {
            transform: 'scale(1.05)', 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
          },
        }}
      >
        Email: info@bowvalleycollege.ca
      </Typography>
    </Box>
  );
}

export default ContactForm;
