import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutSection = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
      <Typography variant="h3">About</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', padding: 2, color: "#34405E" }}>
      <Typography variant="h5">
        Welcome to our Student Registration App, designed to simplify and enhance your academic journey! 
        Our user-friendly platform streamlines the registration process, allowing students to easily enroll in courses, 
        manage their schedules, and access essential information all in one place.
      </Typography>
    </Box>
  </Box>
);

export default AboutSection;
