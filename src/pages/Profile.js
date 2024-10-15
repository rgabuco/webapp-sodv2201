import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography, Card, CardContent, CardActions, Avatar } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    program: "",
    profilePhoto: "", // Add this field for the profile photo
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const currentUsername = localStorage.getItem("userLoggedIn");
    const currentUser = storedUsers.find((user) => user.username === currentUsername);

    if (currentUser) {
      setLoggedInUser(currentUser);
      setFormData(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check the file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2 MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result }); // Store the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const updatedUsers = storedUsers.map((user) => (user.username === formData.username ? formData : user));
    localStorage.setItem("bvc-users", JSON.stringify(updatedUsers));
    setIsEditing(false);
  };

  const handleDelete = () => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const updatedUsers = storedUsers.filter((user) => user.username !== formData.username);
    localStorage.setItem("bvc-users", JSON.stringify(updatedUsers));
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/signup";
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              p: 4,
              border: "1px solid rgba(0, 0, 0, 0.12)", // Outline
              boxShadow: 3,
              mb: 4,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ color: "#34405E" }}>
                  Profile
                </Typography>
              </Box>
              {formData.profilePhoto && (
                <Avatar 
                  src={formData.profilePhoto} 
                  alt="Profile Photo" 
                  sx={{ width: 100, height: 100, margin: "0 auto", mb: 2, borderRadius: "50%" }} // Circular display
                />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                disabled={!isEditing} 
              />
              <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" disabled />
              <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" required disabled={!isEditing} sx={{ color: "#34405E" }} />
              <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" required disabled={!isEditing} sx={{ color: "#34405E" }} />
              <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required disabled={!isEditing} sx={{ color: "#34405E" }} />
              <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required disabled={!isEditing} sx={{ color: "#34405E" }} />
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                fullWidth
                margin="normal"
                disabled
                sx={{ backgroundColor: "grey.100", color: "#34405E" }} // Greyed out
              />
              <TextField
                label="Program"
                name="program"
                value={formData.program}
                fullWidth
                margin="normal"
                disabled
                sx={{ backgroundColor: "grey.100", color: "#34405E" }} // Greyed out
              />
            </CardContent>
            <CardActions>
              {isEditing ? (
                <>
                  <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outlined">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit} variant="contained" color="primary">
                  Edit
                </Button>
              )}
              <Button onClick={handleDelete} variant="outlined" color="error">
                Delete Account
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
