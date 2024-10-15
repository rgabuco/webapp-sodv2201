import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid, List, ListItem, Button, TextField, Chip, IconButton } from "@mui/material";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesData from '../utils/data/Courses';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [status, setStatus] = useState("Not Enrolled");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState({});
  const [value, setValue] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const currentUsername = localStorage.getItem("userLoggedIn");
    const currentUser = storedUsers.find((user) => user.username === currentUsername);

    if (currentUser) {
      setLoggedInUser(currentUser);

      if (currentUser.isAdmin === true) {
        setStatus("Admin");
        setUpcomingEvents([
          { date: "2024-10-20", event: "Midterm Exams" },
          { date: "2024-11-05", event: "Guest Lecture" },
          { date: "2024-12-01", event: "Final Exams" },
        ]);
      } else {
        currentUser.courses = currentUser.courses || [];
        if (currentUser.courses.length > 0) {
          setStatus("Enrolled");
          generateCourseSchedule(currentUser.courses);
        } else {
          setStatus("Not Enrolled");
        }
      }
    }
  }, []);

  const generateCourseSchedule = (courseCodes) => {
    const schedule = {};
    courseCodes.forEach((code) => {
      const course = findCourseByCode(code);
      if (course) {
        const courseStartDate = new Date(course.startDate);
        const courseEndDate = new Date(course.endDate);
        for (let d = courseStartDate; d <= courseEndDate; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().split('T')[0];
          if (!schedule[dateString]) {
            schedule[dateString] = [];
          }
          schedule[dateString].push(course.name);
        }
      }
    });
    setCourseSchedule(schedule);
  };

  const findCourseByCode = (code) => {
    for (const program in coursesData) {
      const course = coursesData[program].find(course => course.code === code);
      if (course) {
        return course;
      }
    }
    return null;
  };

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventDate(event.date);
    setEventName(event.event);
  };

  const handleSaveEvent = () => {
    setUpcomingEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.date === editingEvent.date ? { ...event, event: eventName } : event
      )
    );
    setEditingEvent(null);
    setEventDate("");
    setEventName("");
  };

  const handleDeleteEvent = (date) => {
    setUpcomingEvents((prevEvents) => prevEvents.filter(event => event.date !== date));
  };

  const handleAddEvent = () => {
    if (eventName) {
      setUpcomingEvents([...upcomingEvents, { date: eventDate, event: eventName }]);
      setEventName("");
    }
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return upcomingEvents.filter(event => event.date === dateString);
  };

  const selectedEvents = getEventsForDate(value);

  // Function to determine the color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Enrolled":
        return "green"; // Change this to your preferred color
      case "Not Enrolled":
        return "red"; // Change this to your preferred color
      case "Admin":
        return "blue"; // Change this to your preferred color
      default:
        return "black"; // Default color
    }
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />

      <Container maxWidth="lg" sx={{ mt: 5, color: "#34405E" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
          Dashboard
        </Typography>

        {/* Centered Calendar and Upcoming Events Section */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 0.5, 
                maxWidth: 650, 
                width: '100%', 
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '0.8rem' }}>Course Schedule</Typography>
              <Calendar 
                onChange={handleDateChange} 
                value={value}
                sx={{ width: '100%', height: 'auto', margin: 'auto' }} 
              />
              <Typography variant="subtitle1" sx={{ mt: 1, fontSize: '0.75rem' }}>
                Events on {value.toLocaleDateString()}:
              </Typography>
              {selectedEvents.length > 0 ? (
                <List dense>
                  {selectedEvents.map((event, index) => (
                    <ListItem key={index} sx={{ padding: 0 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>{event.event}</Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>No events</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 0.5, 
                maxWidth: 650, 
                width: '100%', 
                height: '350px' 
              }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '0.8rem' }}>Upcoming Events</Typography>
              <Grid container spacing={1}>
                {upcomingEvents.map((event, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={`${event.date}: ${event.event}`}
                      variant="outlined" 
                      color="primary"
                      sx={{ fontSize: '0.7rem', borderRadius: '16px' }}
                      deleteIcon={loggedInUser?.isAdmin ? (
                        <IconButton size="small" onClick={() => handleDeleteEvent(event.date)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      ) : null}
                      onClick={() => loggedInUser?.isAdmin && handleEditEvent(event)}
                    />
                  </Grid>
                ))}
              </Grid>
              {editingEvent && (
                <Paper sx={{ padding: 2, marginTop: 2 }}>
                  <Typography variant="h6">Edit Event</Typography>
                  <TextField
                    label="Event Date"
                    value={eventDate}
                    disabled
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button variant="contained" onClick={handleSaveEvent}>
                    Save
                  </Button>
                </Paper>
              )}
              {loggedInUser?.isAdmin && (
                <Paper sx={{ padding: 2, marginTop: 2 }}>
                  <Typography variant="h6">Add Event</Typography>
                  <TextField
                    label="Event Date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button variant="contained" onClick={handleAddEvent}>
                    Add
                  </Button>
                </Paper>
              )}
            </Paper>
          </Grid>
        </Grid>

  <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
  <Typography variant="h5" sx={{ mb: 2 }}>Welcome!</Typography>
  {loggedInUser ? (
    <>
      <Typography variant="body1">Name: {loggedInUser.firstName + " " + loggedInUser.lastName}</Typography>
      <Typography variant="body1">Email: {loggedInUser.email}</Typography>
      <Typography variant="body1">User: {loggedInUser.isAdmin === true ? "Admin" : "Student"}</Typography>
      <Typography variant="body1">Status: <span style={{ color: getStatusColor(status) }}>{status}</span></Typography>
      {status === "Enrolled" && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Courses Enrolled:</Typography>
          <List>
            {loggedInUser.courses.map((courseCode, index) => {
              const course = findCourseByCode(courseCode);
              return (
                <ListItem key={index}>
                  <Typography variant="body2">
                    {course ? course.name : `Course not found for code: ${courseCode}`}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </>
  ) : (
    <Typography variant="body1">Loading user information...</Typography>
  )}
</Paper>

      </Container>
    </div>
  );
}

export default Dashboard;
