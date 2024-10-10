import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesArray from "../utils/data/Courses"; 
import usersArray from "../utils/data/Users"; 

function AddCourses() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const loggedInUsername = localStorage.getItem("userLoggedIn");
  const loggedInUser = usersArray.find(user => user.username === loggedInUsername); 
  const userProgram = loggedInUser?.program; 
  const courses = coursesArray[userProgram] || []; 

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("selectedCourses")) || [];
    setSelectedCourses(storedCourses);
  }, []);

  const handleAddCourse = (course) => {
    if (!selectedCourses.find(selected => selected.code === course.code)) {
      const updatedCourses = [...selectedCourses, course];
      setSelectedCourses(updatedCourses);
      localStorage.setItem("selectedCourses", JSON.stringify(updatedCourses));
      console.log(`Course added: ${course.name}`);
    }
  };

  return (
    <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar rightMenu={<ProfileMenu />} />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: "20px", fontWeight: "bold", color: "#34405E" }}>
          {userProgram ? `${userProgram} Courses` : 'Add Courses'}
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
        <Grid container spacing={3}>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course, index) => {
              const isCourseAdded = selectedCourses.some(selected => selected.code === course.code);
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    sx={{ 
                      backgroundColor: "#f5f5f5", 
                      transition: "transform 0.3s ease", 
                      "&:hover": { transform: "translateY(-10px)", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
                      border: isCourseAdded ? '2px solid 0px 4px 20px rgba(0, 0, 0, 0.1)' : 'none', 
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" sx={{ textAlign: "left", fontWeight: "bold", color: "#34405E" }}>
                        {course.name} ({course.code})
                      </Typography>
                      <Typography variant="body1"><strong>Credits:</strong> {course.credits}</Typography>
                      <Typography variant="body1"><strong>Prerequisites:</strong> {course.prerequisites}</Typography>
                      <Typography variant="body1"><strong>Term:</strong> {course.term}</Typography>
                      <Typography variant="body1"><strong>Dates:</strong> {course.startDate} - {course.endDate}</Typography>
                      <Typography variant="body1"><strong>Time:</strong> {course.time} on {course.days}</Typography>
                      <Typography variant="body1"><strong>Campus:</strong> {course.campus}</Typography>
                      <Typography variant="body1"><strong>Delivery Mode:</strong> {course.deliveryMode}</Typography>
                      <Typography variant="body1"><strong>Seats Available:</strong> {course.seatsAvailable} / {course.classSize}</Typography>
                      <Button 
                        variant="contained" 
                        color={isCourseAdded ? "secondary" : "primary"} 
                        onClick={() => handleAddCourse(course)} 
                        sx={{ mt: 2 }}
                        disabled={isCourseAdded} 
                      >
                        {isCourseAdded ? "Enrolled" : "Add Course"}
                      </Button>
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
    </Container>
  );
}

export default AddCourses;
