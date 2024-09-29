import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  CardActions,
  FormLabel,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import Navbar from "../components/navbar/Navbar";
import programsArray from "../utils/data/Programs";
import usersArray from "../utils/data/Users";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "+1",
    department: "Software Development",
    program: programsArray[0].name,
    isAdmin: "false",
  });

  const [phoneError, setPhoneError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve isAdministrator value from localStorage
    const isAdministrator = localStorage.getItem("isAdministrator") === "true";
    setIsAdmin(isAdministrator);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setPhoneError("Phone number must be 10 digits.");
      return;
    }

    setPhoneError("");

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];

    const newUser = {
      id: existingUsers.length + 1,
      ...formData,
    };

    // Add new user to the existing users array
    existingUsers.push(newUser);

    // Update localStorage with the new users array
    localStorage.setItem("bvc-users", JSON.stringify(existingUsers));

    console.log("User added:", newUser);
    // Optionally, you can redirect the user or show a success message here
  };

  const countryCodes = [
    { code: "+1", country: "United States/Canada" },
    { code: "+44", country: "United Kingdom" },
    { code: "+91", country: "India" },
    // Add more country codes as needed
  ];

  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              p: 4,
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.12)", // Outline
              boxShadow: 3, // Shadow
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AppRegistrationIcon />
                <Typography variant="h4" gutterBottom>
                  Sign Up
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" required />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Country Code</InputLabel>
                    <Select name="countryCode" value={formData.countryCode} onChange={handleChange} label="Country Code" required sx={{ backgroundColor: "white" }}>
                      {countryCodes.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          ({item.code}) {item.country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required error={!!phoneError} helperText={phoneError} />
                </Box>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Department</InputLabel>
                  <Select name="department" value={formData.department} onChange={handleChange} label="Department" disabled sx={{ backgroundColor: "white" }}>
                    <MenuItem value="Software Development">Software Development</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Program</InputLabel>
                  <Select name="program" value={formData.program} onChange={handleChange} label="Program" required sx={{ backgroundColor: "white" }}>
                    {programsArray.map((program) => (
                      <MenuItem key={program.name} value={program.name}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {isAdmin && (
                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">User Access</FormLabel>
                    <RadioGroup row name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
                      <FormControlLabel value="false" control={<Radio />} label="Student" />
                      <FormControlLabel value="true" control={<Radio />} label="Admin" />
                    </RadioGroup>
                  </FormControl>
                )}
                <CardActions>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign up
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
