import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Link, Card } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import programsArray from "../utils/data/Programs";
import usersArray from "../utils/data/Users";
import LoginButton from "../components/login-button/LoginButton";
import coursesArray from "../utils/data/Courses";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if programs data exists in localStorage
    if (!localStorage.getItem("bvc-programs")) {
      localStorage.setItem("bvc-programs", JSON.stringify(programsArray));
    }
    // Check if courses data exists in localStorage
    if (!localStorage.getItem("bvc-courses")) {
      localStorage.setItem("bvc-courses", JSON.stringify(coursesArray));
    }
    // Check if users data exists in localStorage
    if (!localStorage.getItem("bvc-users")) {
      localStorage.setItem("bvc-users", JSON.stringify(usersArray));
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("bvc-users"));
    const user = users.find((user) => user.username === username);
    const isAdministrator = user.isAdmin;
    console.log("user:", user);

    if (!user) {
      setUsernameError("Username does not exist.");
      setPasswordError(""); // Clear password error
      return;
    }

    if (user.password !== password) {
      setPasswordError("Incorrect password.");
      setUsernameError(""); // Clear username error
      return;
    }

    // Handle successful login logic here
    console.log("userLoggedIn ", { username });
    console.log("isAdministrator:", { isAdministrator });
    setUsernameError(""); // Clear any previous username error
    setPasswordError(""); // Clear any previous password error

    // Set localStorage variables
    try {
      localStorage.setItem("userLoggedIn", username);
      localStorage.setItem("isAdministrator", isAdministrator);
      console.log("LocalStorage variables set successfully");
    } catch (error) {
      console.error("Error setting localStorage variables", error);
    }

    // Navigate to the Dashboard page
    navigate("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <Navbar rightMenu={<LoginButton />} />
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
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.12)", // Outline
              boxShadow: 3, // Shadow
            }}
          >
            <Typography component="h1" variant="h5" align="center">
              Login
            </Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
