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
import Navbar from "../components/navbar/Navbar";
import programsArray from "../utils/data/Programs";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import LoginButton from "../components/login-button/LoginButton";
import SuccessfulSignUp from "../components/modal-successful-signup/SuccessfulSignUp";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({});
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();
  }, []);

  const initialFormData = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    phone: "",
    department: "Software Development",
    program: programsArray[0].name,
    isAdmin: "false",
    courses: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const isAdministrator = localStorage.getItem("isAdministrator") === "true";
    setIsAdmin(isAdministrator);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    const combinedPhone = `${formData.countryCode}${formData.phone}`;
    if (!phoneRegex.test(combinedPhone)) {
      setPhoneError("Phone number must include country code and be 10 digits long.");
      return;
    }

    setPhoneError("");

    const existingUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];

    // Check for duplicate username
    const duplicateUser = existingUsers.find((user) => user.username === formData.username);
    if (duplicateUser) {
      setUsernameError("Username already exists.");
      return;
    }

    setUsernameError("");

    const newUser = {
      id: existingUsers.length + 1,
      ...formData,
      phone: combinedPhone,
      isAdmin: formData.isAdmin === "true",
    };

    // Remove countryCode from newUser before saving
    delete newUser.countryCode;

    existingUsers.push(newUser);
    localStorage.setItem("bvc-users", JSON.stringify(existingUsers));
    console.log("User added:", newUser);

    // Store new user details and open the modal
    setNewUserDetails({
      accountType: formData.isAdmin === "true" ? "Admin" : "Student",
      username: formData.username,
      accountID: newUser.id,
    });

    // Reset formData to initial state
    setFormData(initialFormData);

    console.log("Opening modal...");
    setOpenModal(true);
  };

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              p: 4,
              border: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: 3,
              mb: 4,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" gutterBottom>
                  Sign Up
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" required error={!!usernameError} helperText={usernameError} />
                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" required />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Country Code</InputLabel>
                    <Select name="countryCode" value={formData.countryCode} onChange={handleChange} label="Country Code" required>
                      <MenuItem value="+1">+1 (USA/Canada)</MenuItem>
                      <MenuItem value="+44">+44 (UK)</MenuItem>
                      <MenuItem value="+61">+61 (Australia)</MenuItem>
                      <MenuItem value="+91">+91 (India)</MenuItem>
                      <MenuItem value="+81">+81 (Japan)</MenuItem>
                      <MenuItem value="+49">+49 (Germany)</MenuItem>
                      <MenuItem value="+33">+33 (France)</MenuItem>
                      <MenuItem value="+86">+86 (China)</MenuItem>
                      <MenuItem value="+7">+7 (Russia)</MenuItem>
                      <MenuItem value="+55">+55 (Brazil)</MenuItem>
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
      <SuccessfulSignUp
        open={openModal}
        onClose={() => setOpenModal(false)}
        accountType={newUserDetails.accountType}
        username={newUserDetails.username}
        accountID={newUserDetails.accountID}
        userLoggedIn={userLoggedIn}
        navigate={navigate}
      />
    </div>
  );
}

export default Signup;
