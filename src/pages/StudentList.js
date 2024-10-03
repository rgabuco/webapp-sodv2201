import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { usersArray } from "../utils/data/Users.js";  
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

function StudentList() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Student Information List
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="student information table">
            <TableHead>
              <TableRow>
                {/* Centering header cells */}
                <TableCell align="center"><strong>First Name</strong></TableCell>
                <TableCell align="center"><strong>Last Name</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Phone</strong></TableCell>
                <TableCell align="center"><strong>Department</strong></TableCell>
                <TableCell align="center"><strong>Program</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersArray.map((student, index) => (
                <TableRow key={index}>
                  {/* Centering data cells */}
                  <TableCell align="center">{student.firstName}</TableCell>
                  <TableCell align="center">{student.lastName}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">{student.phone}</TableCell>
                  <TableCell align="center">{student.department}</TableCell>
                  <TableCell align="center">{student.program}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default StudentList;
