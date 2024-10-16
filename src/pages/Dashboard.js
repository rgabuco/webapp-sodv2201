import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  Button,
  Chip,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesData from '../utils/data/Courses';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import PersonIcon from '@mui/icons-material/Person';
import { Gauge } from '@mui/x-charts';

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [status, setStatus] = useState("Not Enrolled");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState({});
  const [value, setValue] = useState(dayjs());
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventDate, setEventDate] = useState(dayjs());
  const [eventName, setEventName] = useState("");
  const [studentsData, setStudentsData] = useState([]);

  // Function to save events to local storage
  const saveEventsToLocalStorage = (events) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("upcomingEvents", JSON.stringify(events));
        console.log("Events saved to localStorage:", events); // Debugging log
      } else {
        console.error("localStorage is not available");
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const currentUsername = localStorage.getItem("userLoggedIn");
    const currentUser = storedUsers.find((user) => user.username === currentUsername);

    if (currentUser) {
      setLoggedInUser(currentUser);
      if (currentUser.isAdmin === true) {
        setStatus("Admin");

        const students = storedUsers.filter((user) => !user.isAdmin);
        const studentEnrollmentData = students.map((student) => ({
          name: student.firstName + " " + student.lastName,
          id: student.id,
          program: student.program,
          department: student.department,
          coursesCount: student.courses.length,
        }));
        setStudentsData(studentEnrollmentData);
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

    // Load upcoming events from local storage
    const storedEvents = JSON.parse(localStorage.getItem("upcomingEvents")) || [];
    setUpcomingEvents(storedEvents);
    console.log("Loaded events from localStorage:", storedEvents); // Debugging log
  }, []);

  useEffect(() => {
    // Save upcoming events to local storage whenever they change
    if (upcomingEvents.length > 0) {
      saveEventsToLocalStorage(upcomingEvents);
    }
  }, [upcomingEvents]);

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
    setValue(dayjs(date));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventDate(dayjs(event.date));
    setEventName(event.event);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setUpcomingEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.date === editingEvent.date ? { ...event, event: eventName } : event
        )
      );
      setEditingEvent(null);
    }
    setEventDate(dayjs());
    setEventName("");
  };

  const handleDeleteEvent = (date) => {
    setUpcomingEvents((prevEvents) => prevEvents.filter(event => event.date !== date));
  };

  const handleAddEvent = () => {
    if (eventName && eventDate) {
      setUpcomingEvents([...upcomingEvents, { date: eventDate.format('YYYY-MM-DD'), event: eventName }]);
      setEventName("");
      setEventDate(dayjs());
    }
  };

  const getEventsForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    return upcomingEvents.filter(event => event.date === dateString);
  };

  const selectedEvents = getEventsForDate(value);

  const getStatusColor = (status) => {
    switch (status) {
      case "Enrolled":
        return "green";
      case "Not Enrolled":
        return "red";
      case "Admin":
        return "blue";
      default:
        return "black";
    }
  };

  const enrolledCount = studentsData.filter(student => student.coursesCount > 0).length;
const totalStudentsCount = studentsData.length; // Total number of students
const totalEventsRegistered = upcomingEvents.length; // Count of registered events

const gauge = [
  {
    value: enrolledCount,
    minvalue: 0,
    maxvalue: totalStudentsCount,
    label: `Enrolled Students: ${enrolledCount}`,
    color: "#4CAF50",
    sx: { width: '30%', height: '100%' } // Ensure Gauge takes full height
  },
  {
    value: totalStudentsCount, // Use the correct variable name here
    minvalue: 0,
    maxvalue: totalStudentsCount,
    label: `Total Students: ${totalStudentsCount}`, // Update label accordingly
    color: "warning",
    sx: { width: '30%', height: '100%' } // Ensure Gauge takes full height
  },
  {
    value: totalEventsRegistered,
    minvalue: 0,
    maxvalue: totalEventsRegistered,
    label: `Total Events Registered: ${totalEventsRegistered}`, // Update label accordingly
    color: "info",
    sx: { width: '30%', height: '100%' } // Ensure Gauge takes full height
  }
];

  

  

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />

      <Container maxWidth="lg" sx={{ mt: 5, color: "#34405E" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
          Dashboard
        </Typography>

        {/* Centered Calendar and Upcoming Events Section */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 0.5 }}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Paper
              elevation={3}
              sx={{
                padding: 0.5,
                maxWidth: 650,
                width: '100%',
                height: '370px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '0.8rem' }}>Course Schedule</Typography>
              <Calendar
                onChange={handleDateChange}
                value={value.toDate()}
                sx={{ width: '100%', height: 'auto', margin: 'auto' }}
              />
              <Typography variant="subtitle1" sx={{ mt: 1, fontSize: '0.75rem' }}>
                Events on {value.format('MMMM D, YYYY')}:
              </Typography>
              <div style={{ maxHeight: '150px', overflowY: 'auto', width: '100%' }}>
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
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <Paper
              elevation={3}
              sx={{
                padding: 0.5,
                maxWidth: 650,
                width: '100%',
                height: '370px'
              }}>

              <Typography variant="h6" sx={{ mb: 1, fontSize: '0.8rem', textAlign: 'center' }}>Upcoming Events</Typography>
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
                      onDelete={loggedInUser?.isAdmin ? () => handleDeleteEvent(event.date) : undefined}
                      onClick={() => loggedInUser?.isAdmin && handleEditEvent(event)}
                    />
                  </Grid>
                ))}
              </Grid>

              {loggedInUser?.isAdmin && (
                <Paper sx={{ mt: 2, padding: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Add/Edit Event</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateTimePicker
    label="Event Date"
    value={eventDate}
    onChange={setEventDate}
    textField={<TextField />} // Use textField prop instead of renderInput
  />
</LocalizationProvider>

                  <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                  />
                  <Button variant="contained" onClick={editingEvent ? handleSaveEvent : handleAddEvent} sx={{ mt: 1 }}>
                    {editingEvent ? 'Save Event' : 'Add Event'}
                  </Button>
                </Paper>
              )}
            </Paper>
          </Grid>
        </Grid>
 

{ /*User Details Section*/}
<Paper sx={{ padding: 3, mt: 2 }}>
  <Typography variant="h6">
    <PersonIcon sx={{ marginRight: 1 }} />
    User Details
  </Typography>
  <Box sx={{ mt: 2 }}>
    {/* Show only Name and Account Type for Admins */}
    {loggedInUser?.isAdmin ? (
      <>
        <Typography variant="body1">Name: {loggedInUser?.firstName} {loggedInUser?.lastName}</Typography>
        <Typography variant="body1">Account Type: Admin</Typography>
      </>
    ) : (
      <>
        <Typography variant="body1">Name: {loggedInUser?.firstName} {loggedInUser?.lastName}</Typography>
        <Typography variant="body1">Student ID: {loggedInUser?.id}</Typography>
        <Typography variant="body1">Program: {loggedInUser?.program}</Typography>
        <Typography variant="body1">Department: {loggedInUser?.department}</Typography>
        <Typography variant="body1">Account Type: Student</Typography>
        <Typography variant="body1">Enrollment Status: <span style={{ color: getStatusColor(status) }}>{status}</span></Typography>
      </>
    )}
  </Box>

  {status === "Enrolled" && !loggedInUser?.isAdmin && (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Courses Enrolled:</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loggedInUser.courses.map((courseCode) => {
              const course = findCourseByCode(courseCode);
              return (
                <TableRow key={course.code}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.days}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )}

{loggedInUser?.isAdmin && studentsData.length > 0 && (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: '200px' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
      <Typography variant="body1">Enrolled Students</Typography>
      <Gauge
        value={enrolledCount}
        minvalue={0}
        maxvalue={studentsData.length}
        label={`Enrolled: ${enrolledCount}`}
        color="#4CAF50" // Green color for enrolled students
        sx={{ height: '100%' }} // Ensure Gauge takes full height
      />
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
      <Typography variant="body1">Total Students</Typography>
      <Gauge
        value={totalStudentsCount}
        minvalue={0}
        maxvalue={studentsData.length}
        label={`Total Students: ${totalStudentsCount}`}
        color="warning" // Warning color for total students
        sx={{ height: '100%' }} // Ensure Gauge takes full height
      />
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
      <Typography variant="body1">Total Events Registered</Typography>
      <Gauge
        value={totalEventsRegistered}
        minvalue={0}
        maxvalue={totalEventsRegistered} // Ensure maxvalue is set appropriately
        label={`Total Events Registered: ${totalEventsRegistered}`}
        color="info" // Info color for total courses
        sx={{ height: '100%' }} // Ensure Gauge takes full height
      />
    </Box>
  </Box>
)}

</Paper>


      </Container>
    </div>
  );
}

export default Dashboard;
