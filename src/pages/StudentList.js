import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { usersArray } from "../utils/data/Users.js";  
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, TextField, Button, IconButton, Checkbox, FormControlLabel, Popover } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

function StudentList() {
  // State for toggling filter, search, and show columns popovers
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [anchorElColumns, setAnchorElColumns] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  
  // State to manage visibility of table columns
  const [columnVisibility, setColumnVisibility] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    department: true,
    program: true
  });

  // Open Popovers
  const handleOpenFilter = (event) => setAnchorElFilter(event.currentTarget);
  const handleOpenSearch = (event) => setAnchorElSearch(event.currentTarget);
  const handleOpenColumns = (event) => setAnchorElColumns(event.currentTarget);

  // Close all Popovers
  const handleClosePopover = () => {
    setAnchorElFilter(null);
    setAnchorElSearch(null);
    setAnchorElColumns(null);
  };

  // Handle search query change
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  // Toggle column visibility
  const handleColumnVisibilityToggle = (column) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [column]: !prevState[column]
    }));
  };

  // Filter users based on the search query
  const filteredUsers = usersArray.filter((student) => {
    return (
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student Information List
        </Typography>

        

        {/* Filter Popover */}
        <Popover
          open={Boolean(anchorElFilter)}
          anchorEl={anchorElFilter}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            <TextField label="First Name" variant="outlined" size="small" fullWidth />
            <TextField label="Last Name" variant="outlined" size="small" fullWidth />
            <TextField label="Email" variant="outlined" size="small" fullWidth />
            <TextField label="Phone" variant="outlined" size="small" fullWidth />
            <TextField label="Department" variant="outlined" size="small" fullWidth />
            <TextField label="Program" variant="outlined" size="small" fullWidth />
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button onClick={handleClosePopover} color="primary">Apply</Button>
            </Box>
          </Box>
        </Popover>

        {/* Search Popover */}
        <Popover
          open={Boolean(anchorElSearch)}
          anchorEl={anchorElSearch}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button onClick={handleClosePopover} color="primary">Search</Button>
            </Box>
          </Box>
        </Popover>

        {/* Show Columns Popover */}
        <Popover
          open={Boolean(anchorElColumns)}
          anchorEl={anchorElColumns}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            {['firstName', 'lastName', 'email', 'phone', 'department', 'program'].map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={columnVisibility[column]}
                    onChange={() => handleColumnVisibilityToggle(column)}
                  />
                }
                label={column.charAt(0).toUpperCase() + column.slice(1)}
              />
            ))}
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button onClick={handleClosePopover} color="primary">Apply</Button>
            </Box>
          </Box>
        </Popover>

        {/* Table Section */}
        <TableContainer component={Paper}>

          {/* Icon Buttons for Filter, Search, and Show Columns */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {/* Filter Icon */}
            <IconButton color="primary" onClick={handleOpenFilter} aria-label="filter">
              <FilterListIcon />
            </IconButton>

            {/* Search Icon */}
            <IconButton color="primary" onClick={handleOpenSearch} aria-label="search">
              <SearchIcon />
            </IconButton>

            {/* Show Columns Icon (3 blocks) */}
            <IconButton color="primary" onClick={handleOpenColumns} aria-label="show columns">
              <ViewColumnIcon />
            </IconButton>
          </Box>

          <Table aria-label="student information table">
            <TableHead>
              <TableRow>
                {columnVisibility.firstName && <TableCell align="center"><strong>First Name</strong></TableCell>}
                {columnVisibility.lastName && <TableCell align="center"><strong>Last Name</strong></TableCell>}
                {columnVisibility.email && <TableCell align="center"><strong>Email</strong></TableCell>}
                {columnVisibility.phone && <TableCell align="center"><strong>Phone</strong></TableCell>}
                {columnVisibility.department && <TableCell align="center"><strong>Department</strong></TableCell>}
                {columnVisibility.program && <TableCell align="center"><strong>Program</strong></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((student, index) => (
                <TableRow key={index}>
                  {columnVisibility.firstName && <TableCell align="center">{student.firstName}</TableCell>}
                  {columnVisibility.lastName && <TableCell align="center">{student.lastName}</TableCell>}
                  {columnVisibility.email && <TableCell align="center">{student.email}</TableCell>}
                  {columnVisibility.phone && <TableCell align="center">{student.phone}</TableCell>}
                  {columnVisibility.department && <TableCell align="center">{student.department}</TableCell>}
                  {columnVisibility.program && <TableCell align="center">{student.program}</TableCell>}
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
