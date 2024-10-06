import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Navbar from "../components/navbar/Navbar";
import programsArray from "../utils/data/Programs";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import LoginButton from "../components/login-button/LoginButton";

const Programs = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in based on stored session data
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };
    checkUserLoggedIn();
  }, []);
  
  const [programs, setPrograms] = useState(programsArray);

  useEffect(() => {
    // Check if any programs were saved in localStorage for programs that is added by admins
    const savedPrograms = JSON.parse(localStorage.getItem("programs")) || [];
    setPrograms((prevPrograms) => [...prevPrograms, ...savedPrograms]);
  }, []);
   //categorizes program
  const categorizedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.category]) {
      acc[program.category] = [];
    }
    acc[program.category].push(program);
    return acc;
  }, {});

  return (
    <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Container for the whole page */}
      {/*this allows flexible layouts, makes the items inside position vertically, 
      ensures the container takes the full height of viewport even with little content*/}

      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      {/* The navbar shows the profile menu if the user is logged in or the login button if not */}

      <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
        {/* Box is helps manage the spacing and positioning inside the container for layout.
        this helps box take up as much vertical space as possible inside the container 
        has a top margin of 2 * 8px = 16px and allows vertical scrolling if the content is longer than the viewport height.*/}
        
        <Grid container spacing={3}>
          {/*  Grid container inside the card to align program details, spacing=3 adds 24px (3 * 8px) of space between each grid item.*/}
          
          {Object.keys(categorizedPrograms).map((category) => (
          
          <Grid item xs={12} key={category}>
              {/* This item takes the full width of the row on extra-small screens */}
              <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center", color: "#2B3C5E" }}>
                {category}
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {categorizedPrograms[category].map((program, index) => (
                  <Grid item xs={12} key={index}>
                    {/* Each program card takes up the full width (12 columns) on all screen sizes */}
                    
                    <Card sx={{ backgroundColor: "#f5f5f5", transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-10px)", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" } }}>
                      <CardContent>
                        <Grid container spacing={3}>
                          {/* Program Name and Code */}
                         
                          <Grid item xs={12}>
                          {/*Full width for program name and code on all screen sizes (12 columns).*/ } 
                            <Typography variant="h5" sx={{ textAlign: "left", fontWeight: "bold", color: "#34405E" }}>
                              {program.name}
                            </Typography>

                            <Typography variant="body1" sx={{ color: "#34405E", fontWeight: "bold", marginBottom: "8px" }}>
                              Code: {program.code}
                            </Typography>
                          </Grid>

                          {/* Left Side: Program Description */}
                          <Grid item xs={12} md={6}>
                            {/* xs={12} makes this full width on small screens, md={6} makes it half of the width on larger screens */}
                            <Typography variant="body2" sx={{ marginBottom: 2, color: "#707070" }}>
                              {program.description}
                            </Typography>
                          </Grid>

                          {/* Right Side: Program Details */}
                          <Grid item xs={12} md={6}>
                            {/* xs={12} for full-width on small screens, md={6} for half of the width on larger screens */}
                            {/* Program Details: Start Date, End Date, Term, Fees */}

                            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                             {/* Flexbox to align items horizontally */}

                              <CalendarTodayIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                              <Typography variant="body1" sx={{ color: "#34405E" }}>
                                <strong>Start Date:</strong> {program.startDate}
                              </Typography>
                            </Box>


                            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                              <CalendarTodayIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                              <Typography variant="body1" sx={{ color: "#34405E" }}>
                                <strong>End Date:</strong> {program.endDate}
                              </Typography>
                            </Box>


                            <Typography variant="body1" sx={{ color: "#34405E", marginBottom: 2 }}>
                              <strong>Term:</strong> {program.term}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AttachMoneyIcon sx={{ marginRight: 1, color: "#43a047" }} />
                              <Typography variant="body1" sx={{ color: "#34405E" }}>
                                <strong>Fees:</strong> {program.fees}
                              </Typography>
                            </Box>
                            
                          </Grid>
                        </Grid>
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
