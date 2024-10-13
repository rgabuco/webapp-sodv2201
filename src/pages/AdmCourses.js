import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesObject from "../utils/data/Courses";
import { Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
            <TextField label="Course Code" fullWidth margin="normal" value={editCourse.code} />
            <TextField label="Name" fullWidth margin="normal" value={editCourse.name} onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })} />
            <TextField label="Description" fullWidth margin="normal" value={editCourse.description} onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })} />
            <TermSelect term={editCourse.term} setTerm={(term) => setEditCourse({ ...editCourse, term })} />
            <TextField label="Start Date" fullWidth margin="normal" value={editCourse.startDate} onChange={(e) => setEditCourse({ ...editCourse, startDate: e.target.value })} />
            <TextField label="End Date" fullWidth margin="normal" value={editCourse.endDate} onChange={(e) => setEditCourse({ ...editCourse, endDate: e.target.value })} />
            <TextField label="Time" fullWidth margin="normal" value={editCourse.time} onChange={(e) => setEditCourse({ ...editCourse, time: e.target.value })} />
            <TextField label="Days" fullWidth margin="normal" value={editCourse.days} onChange={(e) => setEditCourse({ ...editCourse, days: e.target.value })} />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Delivery Mode</InputLabel>
              <Select value={editCourse.deliveryMode} onChange={(e) => setEditCourse({ ...editCourse, deliveryMode: e.target.value })} label="Delivery Mode">
                <MenuItem value="Face to Face">Face to Face</MenuItem>
                <MenuItem value="Online Synchronous">Online Synchronous</MenuItem>
                <MenuItem value="Online Asynchronous">Online Asynchronous</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Seats Available" fullWidth margin="normal" value={editCourse.seatsAvailable} onChange={(e) => setEditCourse({ ...editCourse, seatsAvailable: e.target.value })} />
            <TextField label="Class Size" fullWidth margin="normal" value={editCourse.classSize} onChange={(e) => setEditCourse({ ...editCourse, classSize: e.target.value })} />
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
