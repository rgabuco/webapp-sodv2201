import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Container, Typography, Box, Grid, Card, CardContent, Button, ListItemText } from "@mui/material";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const loggedInUsername = localStorage.getItem("userLoggedIn");

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const coursesData = JSON.parse(localStorage.getItem("bvc-courses")) || {};
    const loggedInUser = usersData.find((user) => user.username === loggedInUsername);

    if (loggedInUser) {
      const userCourses = loggedInUser.courses
        .map((courseCode) => {
          for (const program in coursesData) {
            const course = coursesData[program].find((course) => course.code === courseCode);
            if (course) return course;
          }
          return null;
        })
        .filter((course) => course !== null);

      setMyCourses(userCourses);
      calculateTotalCredits(userCourses);
    }
  }, [loggedInUsername]);

  useEffect(() => {
    calculateTotalCredits(myCourses);
  }, [myCourses]);

  const calculateTotalCredits = (courses) => {
    const total = courses.reduce((sum, course) => sum + course.credits, 0);
    setTotalCredits(total);
  };

  const handleRemoveCourse = (courseToRemove) => {
    const updatedCourses = myCourses.filter((course) => course.code !== courseToRemove.code);
    setMyCourses(updatedCourses);

    const usersData = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const loggedInUserIndex = usersData.findIndex((user) => user.username === loggedInUsername);
    if (loggedInUserIndex !== -1) {
      usersData[loggedInUserIndex].courses = updatedCourses.map((course) => course.code);
      localStorage.setItem("bvc-users", JSON.stringify(usersData));
    }
  };

  return (
    <Container>
      <Navbar rightMenu={<ProfileMenu />} />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: "20px", color: "#34405E" }}>
        My Courses
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "20px", color: "#34405E" }}>
        Total Credits: {totalCredits} {/* Display total credits */}
      </Typography>
      {myCourses.length > 0 ? (
        <Box>
          <Grid container spacing={3}>
            {myCourses.map((course, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {" "}
                {/* Use xs=12 and sm=6 for 2x2 layout */}
                <Card
                  variant="outlined"
                  sx={{
                    marginBottom: "16px",
                    backgroundColor: "#f5f5f5",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ textAlign: "center", color: "#34405E" }}>
                      {`${course.name} (${course.code})`}
                    </Typography>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body1">
                            <strong>Credits:</strong> {course.credits}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Term:</strong> {course.term}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Dates:</strong> {course.startDate} - {course.endDate}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Time:</strong> {course.time} on {course.days}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Campus:</strong> {course.campus}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Delivery Mode:</strong> {course.deliveryMode}
                          </Typography>
                        </>
                      }
                    />
                    <Button variant="contained" color="primary" onClick={() => handleRemoveCourse(course)} sx={{ marginTop: "16px" }}>
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
          No courses added yet.
        </Typography>
      )}
    </Container>
  );
}

export default MyCourses;
