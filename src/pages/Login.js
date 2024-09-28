import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Link, Card } from "@mui/material";
import Navbar from "../components/navbar/Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    // Handle login logic here
    console.log({ username, password, role });
  };

  return (
    <div>
      <Navbar showLoginButton={false} />
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
            <Box component="form" sx={{ mt: 3 }}>
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
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="role-label">Login as</InputLabel>
                <Select labelId="role-label" id="role" value={role} label="Login as" onChange={(e) => setRole(e.target.value)}>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button type="button" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
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
