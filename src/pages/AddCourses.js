import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, Button, Modal } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesArray from "../utils/data/Courses";
import TermSelect from "../components/term-select/TermSelect";
import SearchBox from "../components/search-box/SearchBox";

function AddCourses() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const loggedInUsername = localStorage.getItem("userLoggedIn");
  const usersData = JSON.parse(localStorage.getItem("bvc-users")) || [];
  const coursesData = JSON.parse(localStorage.getItem("bvc-courses")) || {};
  const loggedInUser = usersData.find((user) => user.username === loggedInUsername);
  const userProgram = loggedInUser?.program;
  const courses = coursesArray[userProgram] || [];

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const loggedInUser = usersData.find((user) => user.username === loggedInUsername);
    const userCourses = loggedInUser ? loggedInUser.courses : [];
    setSelectedCourses(userCourses);
  }, [loggedInUsername]);

  const handleAddCourse = (course) => {
    if (selectedCourses.length >= 5) {
      setOpenModal(true);
      return;
    }

    if (!selectedCourses.includes(course.code)) {
      const updatedCourses = [...selectedCourses, course.code];
      setSelectedCourses(updatedCourses);

      const usersData = JSON.parse(localStorage.getItem("bvc-users")) || [];
      const loggedInUserIndex = usersData.findIndex((user) => user.username === loggedInUsername);
      if (loggedInUserIndex !== -1) {
        usersData[loggedInUserIndex].courses = updatedCourses;
        localStorage.setItem("bvc-users", JSON.stringify(usersData));
      }

      // Update seatsAvailable in bvc-courses
      for (const program in coursesData) {
        const courseIndex = coursesData[program].findIndex((c) => c.code === course.code);
        if (courseIndex !== -1) {
          coursesData[program][courseIndex].seatsAvailable -= 1;
          localStorage.setItem("bvc-courses", JSON.stringify(coursesData));
          break;
        }
      }

      console.log(`Course added: ${course.name}`);
    }
  };

  const getFilteredCourses = () => {
    return courses.filter(
      (course) => (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.code.toLowerCase().includes(searchTerm.toLowerCase())) && (filterTerm ? course.term === filterTerm : true)
    );
  };

  const filteredCourses = getFilteredCourses();

  return (
    <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar rightMenu={<ProfileMenu />} />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: "20px", color: "#34405E" }}>
        {loggedInUsername ? `${userProgram} Courses` : "Add Courses"}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TermSelect term={filterTerm} setTerm={setFilterTerm} />
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
        <Grid container spacing={3}>
          {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => {
              const isCourseAdded = selectedCourses.includes(course.code);
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#f5f5f5",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-10px)", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
                      border: isCourseAdded ? "2px solid 0px 4px 20px rgba(0, 0, 0, 0.1)" : "none",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#34405E" }}>
                          {course.name} ({course.code})
                        </Typography>
                      </Box>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Credits:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{course.credits}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Prerequisites:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{course.prerequisites}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Term:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{course.term}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Dates:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">
                            {course.startDate} - {course.endDate}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Time:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">
                            {course.time} on {course.days}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Campus:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{course.campus}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Delivery Mode:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{course.deliveryMode}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            <strong>Seats Available:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">
                            {course.seatsAvailable} / {course.classSize}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 1 }}>
                        <Button variant="contained" color={isCourseAdded ? "secondary" : "primary"} onClick={() => handleAddCourse(course)} disabled={isCourseAdded}>
                          {isCourseAdded ? "Enrolled" : "Add Course"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
                No courses available for your program.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            Maximum Courses Exceeded
          </Typography>
          <Typography sx={{ mt: 2 }}>You have exceeded the maximum of 5 courses to be enrolled.</Typography>
          <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default AddCourses;
