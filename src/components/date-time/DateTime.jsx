import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
      setCurrentDateTime(new Date().toLocaleString(undefined, options));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0, color: "#34405E", margin: '0 0 20px 0' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.8rem', marginTop: '-35px' }}>
        {currentDateTime}
      </Typography>
    </Box>
  );
};

export default DateTimeDisplay;
