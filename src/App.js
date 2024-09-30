import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Programs from "./pages/Programs";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import AddCourses from "./pages/AddCourses";
import ContactSupport from "./pages/ContactSupport";
import AdmCourses from "./pages/AdmCourses";
import AdmAddCourses from "./pages/AdmAddCourses";
import StudentList from "./pages/StudentList";
import Forms from "./pages/Forms";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Main />
      </Box>
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const noNavbarPaths = [
    "/login",
    "/programs",
    "/courses",
    "/about",
    "/contact",
    "/signup",
    "/dashboard",
    "/profile",
    "/my-courses",
    "/add-courses",
    "/contact-support",
    "/adm-courses",
    "/adm-add-courses",
    "/student-list",
    "/forms",
  ];
  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          mt: 8, // Add margin-top to avoid content being hidden behind the fixed Navbar
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/add-courses" element={<AddCourses />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/adm-courses" element={<AdmCourses />} />
          <Route path="/adm-add-courses" element={<AdmAddCourses />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/forms" element={<Forms />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
