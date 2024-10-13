import React from "react";
import { Card, CardContent, CardActions, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";

const CourseCard = ({ course, onEdit, onDelete }) => (
  <Card
    sx={{
      p: 2,
      border: "1px solid rgba(0, 0, 0, 0.12)", // Outline
      boxShadow: 3, // Shadow
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        <Box component="span" sx={{ display: "flex", alignItems: "center", color: "#34405E" }}>
          {course.name}
        </Box>
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Code: {course.code} | Credits: {course.credits} | Prerequisites: {course.prerequisites}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <Box sx={{ flex: 6 }}>
          <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarTodayIcon sx={{ mr: 1, color: "#34405E" }} />{" "}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" fontWeight={550}>
                    Term:
                  </Typography>
                  <Typography variant="body1">{course.term}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon sx={{ mr: 1, color: "#34405E" }} />{" "}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" fontWeight={550}>
                    Location:{" "}
                  </Typography>
                  <Typography variant="body1">{course.campus}</Typography>
                </Box>
              </Box>
            </Box>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {course.description}
          </Typography>
        </Box>
        <Box sx={{ flex: 4 }}>
          <Typography variant="body1" textAlign={"center"} fontWeight={550}>
            {course.days}
          </Typography>
          <Typography variant="body1" textAlign={"center"} fontWeight={550}>
            {course.time}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow sx={{ height: "30px" }}>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1" fontWeight={550}>
                        Start Date:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1">{course.startDate}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ height: "30px" }}>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1" fontWeight={550}>
                        End Date:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1">{course.endDate}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ height: "30px" }}>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1" fontWeight={550}>
                        Delivery Mode:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1">{course.deliveryMode}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ height: "30px" }}>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1" fontWeight={550}>
                        Seats Available:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1">{course.seatsAvailable}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ height: "30px" }}>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1" fontWeight={550}>
                        Class Size:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <Typography variant="body1">{course.classSize}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <IconButton onClick={() => onEdit(course)} color="primary">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(course)} color="secondary">
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default CourseCard;
