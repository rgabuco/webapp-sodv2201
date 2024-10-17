import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesObject from "../utils/data/Courses";
import {
  Container,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
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
import CourseCard from "../components/course-card/CourseCard";
import TermSelect from "../components/term-select/TermSelect";
import SearchBox from "../components/search-box/SearchBox";
import ProgramSelect from "../components/program-select/ProgramSelect";

function AdmCourses() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [timeAnchorEl, setTimeAnchorEl] = useState(null);
  const [daysAnchorEl, setDaysAnchorEl] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tempDays, setTempDays] = useState([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem("bvc-courses");
    if (storedCourses) {
      try {
        const parsedCourses = JSON.parse(storedCourses);
        if (typeof parsedCourses === "object" && !Array.isArray(parsedCourses)) {
          setCourses(parsedCourses);
        } else {
          console.error("Parsed courses is not an object");
          setCourses({});
        }
      } catch (e) {
        console.error("Failed to parse courses from local storage", e);
        setCourses({});
      }
    } else {
      localStorage.setItem("bvc-courses", JSON.stringify(coursesObject));
      setCourses(coursesObject);
    }
  }, []);

  const handleEdit = (course) => {
    setEditCourse(course);
    const [start, end] = course.time.split(" - ");
    setStartTime(start);
    setEndTime(end);
    setTempDays(course.days.split(", ").filter(Boolean)); // Split the days string into an array
  };

  const handleDelete = (course) => {
    setDeleteCourse(course);
  };

  const handleSaveEdit = () => {
    const updatedCourses = { ...courses };
    for (const program in updatedCourses) {
      updatedCourses[program] = updatedCourses[program].map((c) => (c.code === editCourse.code ? editCourse : c));
    }
    setCourses(updatedCourses);
    localStorage.setItem("bvc-courses", JSON.stringify(updatedCourses));
    setEditCourse(null);
  };

  const handleConfirmDelete = () => {
    const updatedCourses = { ...courses };
    for (const program in updatedCourses) {
      updatedCourses[program] = updatedCourses[program].filter((c) => c.code !== deleteCourse.code);
    }
    setCourses(updatedCourses);
    localStorage.setItem("bvc-courses", JSON.stringify(updatedCourses));
    setDeleteCourse(null);
  };

  const getFilteredCourses = () => {
    const allCourses = Object.entries(courses).flatMap(([program, courses]) => courses.map((course) => ({ ...course, program })));
    return allCourses.filter(
      (course) =>
        (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterTerm ? course.term === filterTerm : true) &&
        (filterProgram ? course.program === filterProgram : true)
    );
  };

  const handleTimeChange = () => {
    const formattedTime = `${startTime} - ${endTime}`;
    setEditCourse({ ...editCourse, time: formattedTime });
  };

  const handleDaysChange = (e) => {
    const { name, checked } = e.target;
    setTempDays((prevDays) => {
      const newDays = checked ? [...prevDays, name] : prevDays.filter((day) => day !== name);
      return newDays;
    });
  };

  const handleTimeMenuOpen = (event) => {
    setTimeAnchorEl(event.currentTarget);
  };

  const handleTimeMenuClose = () => {
    setTimeAnchorEl(null);
  };

  const handleDaysMenuOpen = (event) => {
    setDaysAnchorEl(event.currentTarget);
  };

  const handleDaysMenuClose = () => {
    setDaysAnchorEl(null);
  };

  const handleApplyTime = () => {
    handleTimeChange();
    handleTimeMenuClose();
  };

  const handleApplyDays = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      days: tempDays.join(", "), // Join the array into a comma-separated string
    }));
    handleDaysMenuClose();
  };

  const filteredCourses = getFilteredCourses();
  const programs = Object.keys(courses);

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2, color: "#34405E" }}>
            Software Development Department Courses
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <ProgramSelect program={filterProgram} setProgram={setFilterProgram} programs={programs} />
            <TermSelect term={filterTerm} setTerm={setFilterTerm} />
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.code} course={course} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Edit Course Modal */}
      {editCourse && (
        <Dialog open={true} onClose={() => setEditCourse(null)}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField label="Course Code" fullWidth margin="normal" value={editCourse.code} disabled />
            <TextField label="Name" fullWidth margin="normal" value={editCourse.name} onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })} />
            <TextField label="Prerequisites" fullWidth margin="normal" value={editCourse.prerequisites} onChange={(e) => setEditCourse({ ...editCourse, prerequisites: e.target.value })} />
            <TextField label="Credits" type="number" fullWidth margin="normal" value={editCourse.credits} onChange={(e) => setEditCourse({ ...editCourse, credits: e.target.value })} />
            <TextField label="Description" fullWidth margin="normal" value={editCourse.description} onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })} />
            <TermSelect term={editCourse.term} setTerm={(term) => setEditCourse({ ...editCourse, term })} />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              value={editCourse.startDate}
              onChange={(e) => setEditCourse({ ...editCourse, startDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              margin="normal"
              value={editCourse.endDate}
              onChange={(e) => setEditCourse({ ...editCourse, endDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Time"
              name="time"
              value={editCourse.time}
              onClick={handleTimeMenuOpen}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Menu anchorEl={timeAnchorEl} open={Boolean(timeAnchorEl)} onClose={handleTimeMenuClose}>
              <Box sx={{ p: 2 }}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    select
                    label="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {[
                      "8:00 AM",
                      "8:30 AM",
                      "9:00 AM",
                      "9:30 AM",
                      "10:00 AM",
                      "10:30 AM",
                      "11:00 AM",
                      "11:30 AM",
                      "12:00 PM",
                      "12:30 PM",
                      "1:00 PM",
                      "1:30 PM",
                      "2:00 PM",
                      "2:30 PM",
                      "3:00 PM",
                      "3:30 PM",
                      "4:00 PM",
                      "4:30 PM",
                      "5:00 PM",
                    ].map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    select
                    label="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {[
                      "8:00 AM",
                      "8:30 AM",
                      "9:00 AM",
                      "9:30 AM",
                      "10:00 AM",
                      "10:30 AM",
                      "11:00 AM",
                      "11:30 AM",
                      "12:00 PM",
                      "12:30 PM",
                      "1:00 PM",
                      "1:30 PM",
                      "2:00 PM",
                      "2:30 PM",
                      "3:00 PM",
                      "3:30 PM",
                      "4:00 PM",
                      "4:30 PM",
                      "5:00 PM",
                    ].map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <Button onClick={handleApplyTime} variant="contained" color="primary" sx={{ mt: 2 }}>
                  Apply
                </Button>
              </Box>
            </Menu>
            <TextField
              label="Days"
              name="days"
              value={editCourse.days}
              onClick={handleDaysMenuOpen}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Menu anchorEl={daysAnchorEl} open={Boolean(daysAnchorEl)} onClose={handleDaysMenuClose}>
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
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Delivery Mode</InputLabel>
              <Select value={editCourse.deliveryMode} onChange={(e) => setEditCourse({ ...editCourse, deliveryMode: e.target.value })} label="Delivery Mode">
                <MenuItem value="Face to Face">Face to Face</MenuItem>
                <MenuItem value="Online Synchronous">Online Synchronous</MenuItem>
                <MenuItem value="Online Asynchronous">Online Asynchronous</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Seats Available"
              type="number"
              fullWidth
              margin="normal"
              value={editCourse.seatsAvailable}
              onChange={(e) => setEditCourse({ ...editCourse, seatsAvailable: e.target.value })}
            />
            <TextField label="Class Size" type="number" fullWidth margin="normal" value={editCourse.classSize} onChange={(e) => setEditCourse({ ...editCourse, classSize: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCourse(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCourse && (
        <Dialog open={true} onClose={() => setDeleteCourse(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the course "{deleteCourse.name}"?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteCourse(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default AdmCourses;
