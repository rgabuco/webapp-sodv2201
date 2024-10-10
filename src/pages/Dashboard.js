import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Get all users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    console.log("Stored Users: ", storedUsers); // Debugging log to check users

    // Get the currently logged-in username from userLoggedIn key
    const currentUsername = localStorage.getItem("userLoggedIn");
    console.log("Current Username (userLoggedIn): ", currentUsername); // Debugging log

    // Get the currently logged-in user by matching username
    const currentUser = storedUsers.find((user) => user.username === currentUsername);
    console.log("Logged-in User: ", currentUser); // Debugging log to check the matched user

    // Set the logged-in user state
    if (currentUser) {
      setLoggedInUser(currentUser);
    }
  }, []);

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 5, color: "#34405E" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
          Dashboard
        </Typography>

        {loggedInUser ? (
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">First Name:</Typography>
                <Typography>{loggedInUser.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Last Name:</Typography>
                <Typography>{loggedInUser.lastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Email:</Typography>
                <Typography>{loggedInUser.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Phone:</Typography>
                <Typography>{loggedInUser.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Department:</Typography>
                <Typography>{loggedInUser.department}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Program:</Typography>
                <Typography>{loggedInUser.program}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Typography align="center">No user data found.</Typography>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;
