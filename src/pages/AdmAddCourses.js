import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Menu,
} from "@mui/material";

function AdmAddCourses() {
  const [courseData, setCourseData] = useState({
    code: "",
    name: "",
    description: "",
    credits: "",
    prerequisites: "",
    term: "",
    startDate: "",
    endDate: "",
    time: "",
    days: "",
    campus: "Calgary",
    deliveryMode: "",
    seatsAvailable: "40",
    classSize: "40",
  });

  const [program, setProgram] = useState("Software Development - Diploma"); // Default program
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempDays, setTempDays] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDaysChange = (e) => {
    const { name, checked } = e.target;
    setTempDays((prevDays) => {
      const newDays = checked ? [...prevDays, name] : prevDays.filter((day) => day !== name);
      return newDays;
    });
  };

  const handleMenuOpen = (event) => {
    setTempDays(courseData.days.split(", ").filter(Boolean)); // Split the days string into an array
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleApplyDays = () => {
    setCourseData((prevData) => ({
      ...prevData,
      days: tempDays.join(", "), // Join the array into a comma-separated string
    }));
    handleMenuClose();
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

    return dateString === date.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dates
    if (!isValidDate(courseData.startDate) || !isValidDate(courseData.endDate)) {
      setError("Please enter valid dates in the format YYYY-MM-DD for Start Date and End Date.");
      return;
    }

    const startDate = new Date(courseData.startDate);
    const endDate = new Date(courseData.endDate);

    if (endDate <= startDate) {
      setError("End Date must be after Start Date.");
      return;
    }

    // Validate number fields
    if (isNaN(courseData.credits) || isNaN(courseData.seatsAvailable) || isNaN(courseData.classSize)) {
      setError("Credits, Seats Available, and Class Size must be valid numbers.");
      return;
    }

    const existingCourses = JSON.parse(localStorage.getItem("bvc-courses")) || {};
    const programCourses = existingCourses[program] || [];
    programCourses.push(courseData);
    existingCourses[program] = programCourses;
    localStorage.setItem("bvc-courses", JSON.stringify(existingCourses));

    setOpenModal(true);
    setError("");
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4, color: "#34405E" }}>
          Add New Course
        </Typography>
        <Card
          sx={{
            p: 4,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="Course Code" name="code" value={courseData.code} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="Course Name" name="name" value={courseData.name} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 100%" }}>
                  <TextField label="Description" name="description" value={courseData.description} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Term</InputLabel>
                    <Select name="term" value={courseData.term} onChange={handleChange} label="Term">
                      <MenuItem value="Winter">Winter</MenuItem>
                      <MenuItem value="Spring">Spring</MenuItem>
                      <MenuItem value="Summer">Summer</MenuItem>
                      <MenuItem value="Fall">Fall</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="Campus" name="campus" value={courseData.campus} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="Start Date (YYYY-MM-DD)" name="startDate" value={courseData.startDate} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="End Date (YYYY-MM-DD)" name="endDate" value={courseData.endDate} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField label="Time" name="time" value={courseData.time} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField
                    label="Days"
                    name="days"
                    value={courseData.days}
                    onClick={handleMenuOpen}
                    fullWidth
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <FormControl component="fieldset" sx={{ p: 2 }}>
                      <FormLabel component="legend">Select Days</FormLabel>
                      <FormGroup>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                          <FormControlLabel key={day} control={<Checkbox checked={tempDays.includes(day)} onChange={handleDaysChange} name={day} />} label={day} />
                        ))}
                      </FormGroup>
                      <Button onClick={handleApplyDays} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Apply
                      </Button>
                    </FormControl>
                  </Menu>
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Delivery Mode</InputLabel>
                    <Select name="deliveryMode" value={courseData.deliveryMode} onChange={handleChange} label="Delivery Mode">
                      <MenuItem value="Face to Face">Face to Face</MenuItem>
                      <MenuItem value="Online Synchronous">Online Synchronous</MenuItem>
                      <MenuItem value="Online Asynchronous">Online Asynchronous</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField type="number" label="Credits" name="credits" value={courseData.credits} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField type="number" label="Seats Available" name="seatsAvailable" value={courseData.seatsAvailable} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 45%" }}>
                  <TextField type="number" label="Class Size" name="classSize" value={courseData.classSize} onChange={handleChange} fullWidth required />
                </Box>
                <Box sx={{ flex: "1 1 100%" }}>
                  <TextField label="Prerequisites" name="prerequisites" value={courseData.prerequisites} onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ flex: "1 1 100%" }}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Program</InputLabel>
                    <Select name="program" value={program} onChange={(e) => setProgram(e.target.value)} label="Program">
                      <MenuItem value="Software Development - Diploma">Software Development - Diploma</MenuItem>
                      <MenuItem value="Software Development - Post Diploma">Software Development - Post Diploma</MenuItem>
                      <MenuItem value="Accelerated Software Development Certificate">Accelerated Software Development Certificate</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {error && (
                  <Box sx={{ flex: "1 1 100%" }}>
                    <Typography color="error">{error}</Typography>
                  </Box>
                )}
                <Box sx={{ flex: "1 1 100%", mt: 2 }}>
                  <CardActions>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Add Course
                    </Button>
                  </CardActions>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Course Added</DialogTitle>
          <DialogContent>
            <Typography>The new course has been successfully added.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default AdmAddCourses;
