import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import LoginButton from "../components/login-button/LoginButton";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import coursesArray from "../utils/data/Courses"; // Import the courses data
import { Container, Grid, Typography, Card, CardContent, Box, TextField } from "@mui/material"; // Import necessary Material-UI components
import DateTime from "../components/date-time/DateTime"; // Import the DateTime component

function Courses() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]); // State for courses
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    // Check if the user is logged in
    const checkUserLoggedIn = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      setUserLoggedIn(loggedIn !== null && loggedIn !== "");
    };

    checkUserLoggedIn();

    // Load the courses data
    setCourses(coursesArray); // Set the courses from the imported data
  }, []);

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Check if the course exists in the data
    let found = false;

    // Check if any course matches the search query
    Object.values(courses).forEach((category) => {
      category.forEach((course) => {
        if (course.name.toLowerCase().includes(query.toLowerCase()) || course.code.toLowerCase().includes(query.toLowerCase())) {
          found = true;
        }
      });
    });

    // Set error message if no course is found
    setErrorMessage(found || query === "" ? "" : "Course not found");
  };

  // Filter courses based on the search query
  const filteredCourses = Object.keys(courses).reduce((acc, category) => {
    const filtered = courses[category].filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.code.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filtered.length) {
      acc[category] = filtered;
    }

    return acc;
  }, {});

  return (
    <div>
      <Navbar rightMenu={userLoggedIn ? <ProfileMenu /> : <LoginButton />} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: 0, color: "#34405E", margin: "0 0 20px 0" }}>
        <DateTime />
      </Box>
      <Container sx={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
          <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center", color: "#2B3C5E" }}>
            View All Courses
          </Typography>

          {/* Input field for searching courses */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search for a course by name or code"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ width: "100%", maxWidth: 400 }} // Adjust width here
            />
          </Box>

          {/* Display error message if course is not found */}
          {errorMessage && (
            <Typography variant="body1" color="error" sx={{ textAlign: "center", marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Grid container spacing={3}>
            {/* Loop through each program category in filteredCourses */}
            {Object.keys(filteredCourses).length === 0 && searchQuery !== "" ? (
              <Typography variant="h6" sx={{ textAlign: "center", color: "#34405E" }}>
                No courses found
              </Typography>
            ) : (
              Object.keys(filteredCourses).map((category) => (
                <Grid item xs={12} key={category}>
                  <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center", color: "#2B3C5E" }}>
                    {category} Courses
                  </Typography>
                  <Grid container spacing={3} justifyContent="center">
                    {/* Loop through each course in the current category */}
                    {filteredCourses[category].map((course, index) => (
                      <Grid item xs={12} key={index}>
                        <Card sx={{ backgroundColor: "#f5f5f5", width: "100%", transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-10px)" } }}>
                          <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ color: "#34405E" }}>
                              {course.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#34405E", fontWeight: "bold", marginBottom: "8px" }}>
                              Code: {course.code}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                              {course.description}
                            </Typography>
                            <Box sx={{ marginTop: 2 }}>
                              <Typography variant="body1">
                                <strong>Credits:</strong> {course.credits}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Prerequisites:</strong> {course.prerequisites}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Courses;
