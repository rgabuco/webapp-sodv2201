import React, { useState, useEffect } from "react"; 

import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";

import Navbar from "../components/navbar/Navbar";

// Initial display array of programs
const initPrograms = [
  {
    code: 'ABCD-2024',
    name: 'Software Development - Diploma',
    description: 'Comprehensive two-year software development diploma program.',
    term: 'Winter',
    startDate: 'January 10, 2024',
    endDate: 'May 15, 2026',
    fees: '$9,254 domestic / $27,735 international',
    category: 'Technology',
  },
  {
    code: 'BIZ-MGMT-2024',
    name: 'Business Management - Diploma',
    description: 'A two-year program to develop core business management skills.',
    term: 'Fall',
    startDate: 'September 5, 2024',
    endDate: 'June 15, 2026',
    fees: '$8,500 domestic / $25,000 international',
    category: 'Business',
  },
  {
    code: 'HLTH-NUR-2024',
    name: 'Nursing - Certificate',
    description: 'A one-year certificate program in nursing fundamentals.',
    term: 'Spring',
    startDate: 'March 5, 2024',
    endDate: 'March 5, 2025',
    fees: '$6,000 domestic / $18,000 international',
    category: 'Health',
  },
  {
    code: 'ABCD-2024',
    name: 'Information Technology - Diploma',
    description: 'A comprehensive two-year software development diploma program.',
    term: 'Winter',
    startDate: 'January 10, 2024',
    endDate: 'May 15, 2026',
    fees: '$7,254 domestic / $20,735 international',
    category: 'Technology',
  },
];

const Programs = () => {
  const [programs, setPrograms] = useState(initPrograms); 
  // useState manages the programs list, starting with the initial data (initPrograms)

  // useEffect to get admin-added programs from localStorage in the future
  // Runs after the component renders to check if there are more programs in localStorage
  useEffect(() => {
    const savedPrograms = JSON.parse(localStorage.getItem('programs')) || []; 
    // Get any saved programs from localStorage and parse them into an array objects or empty array if none exist

    setPrograms(prevPrograms => [...prevPrograms, ...savedPrograms]);
    // Update programs state by adding the saved programs to the initial programs
  }, []); 

  // Group programs by category 
  // We use the reduce method to collect programs into different categories
  const categorizedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.category]) { 
      acc[program.category] = []; // If the category doesn't exist, create it as an empty array
    }
    acc[program.category].push(program); // Add the program to the correct category
    return acc;
  }, {}); // Start with an empty object

  return (
    <Container sx={{ padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* content objects are displayed vertically where it takes the full viewport height without any padding*/}
      <Navbar />
      {/* Display the navigation bar at the top */}
      
      <Box sx={{ flexGrow: 1, mt: 2, overflowY: 'auto' }}>
        {/* A flexible box for the programs that grows or shrinks absed on the space available with margin top of 2X8 =16px, allows scrolling */}
        <Grid container spacing={3}>
          {/* Use a grid to organize the programs into rows */}
          {Object.keys(categorizedPrograms).map((category) => (
            // Loop over each program category 
            <Grid item xs={12} key={category}>
              {/* Create a full width grid item for each category */}
              <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center', color: '#2B3C5E' }}>
                {category}
                {/* Display the category name as a heading */}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {/* Another grid to hold the program cards inside each category */}
                {categorizedPrograms[category].map((program, index) => (
                  <Grid item xs={12} key={index}>
                    {/* Create a full width grid item for each program */}
                    <Card sx={{ backgroundColor: "#d3d7db", width: '100%', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-10px)' } }}>
                      {/* Use a Card to display program details with hover effect */}
                      <CardContent>
                        {/* Program Name */}
                        <Typography variant="h5" gutterBottom sx={{ color: '#34405E' }}>
                          {program.name}
                          {/* Display the program name in a large font */}
                        </Typography>

                        {/* Program Code */}
                        <Typography variant="body1" sx={{ color: '#34405E', fontWeight: 'bold', marginBottom: '8px' }}>
                          Code: {program.code}
                          {/* Show the program code in bold */}
                        </Typography>

                        {/* Program Description */}
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                          {program.description}
                          {/* Display the program's brief description */}
                        </Typography>

                        {/* Program Details Section */}
                        <Box sx={{ marginTop: 2 }}>
                        
                          <Typography variant="body1">
                            <strong>Term:</strong> {program.term}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Start Date:</strong> {program.startDate}
                          </Typography>
                          <Typography variant="body1">
                            <strong>End Date:</strong> {program.endDate}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Fees:</strong> {program.fees}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      
    </Container>
  );
};

export default Programs;


