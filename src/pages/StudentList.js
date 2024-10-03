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

  const [clickedIcons, setClickedIcons] = useState({
    filter: false,
    search: false,
    columns: false,
    reset: false,
  });

  // Handle icon click and toggle its color
  const handleIconClick = (iconName) => {
    setClickedIcons((prevState) => ({
      ...prevState,
      [iconName]: !prevState[iconName],
    }));
  };

  // State to manage visibility of table columns
  const [columnVisibility, setColumnVisibility] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    department: true,
    program: true,
  });

  // State for filter values
  const [filterValues, setFilterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    program: "",
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

  // Handle filter values change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle column visibility
  const handleColumnVisibilityToggle = (column) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  // Apply filters and search query
  const filteredUsers = usersArray.filter((student) => {
    return (
      // Search Filter
      (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&

      // Filter Fields (only apply if not empty)
      (filterValues.firstName === "" || student.firstName.toLowerCase().includes(filterValues.firstName.toLowerCase())) &&
      (filterValues.lastName === "" || student.lastName.toLowerCase().includes(filterValues.lastName.toLowerCase())) &&
      (filterValues.email === "" || student.email.toLowerCase().includes(filterValues.email.toLowerCase())) &&
      (filterValues.phone === "" || student.phone.toLowerCase().includes(filterValues.phone.toLowerCase())) &&
      (filterValues.department === "" || student.department.toLowerCase().includes(filterValues.department.toLowerCase())) &&
      (filterValues.program === "" || student.program.toLowerCase().includes(filterValues.program.toLowerCase()))
    );
  });

  // Reset Filters Function
  const handleResetFilters = () => {
    setSearchQuery("");  // Reset search query
    setColumnVisibility({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      department: true,
      program: true,
    });  // Reset column visibility
    setFilterValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      program: "",
    });  // Reset filter values
    handleClosePopover();  // Close any open popovers
    setClickedIcons({
      filter: false,
      search: false,
      columns: false,
      reset: false,
    });
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 5, color: "#34405E"}}>
        <Typography variant="h3" gutterBottom sx={{ mb: 3, textAlign: 'center'}}>
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
            {["firstName", "lastName", "email", "phone", "department", "program"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                size="small"
                fullWidth
                name={field}
                value={filterValues[field]}
                onChange={handleFilterChange}
              />
            ))}
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
          {/* Icon Buttons for Filter, Search, Show Columns, and Reset */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Typography aligned to the left */}
            <Typography variant="h5" sx={{ mt: 2, ml: 3, color: "#34405E"}}>
              BVC Students
            </Typography>

            {/* Icons aligned to the right */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Filter Icon */}
              <IconButton
                color={clickedIcons.filter ? "primary" : "default"}
                onClick={(e) => {
                  handleIconClick('filter');
                  handleOpenFilter(e);
                }}
                aria-label="filter"
              >
                <FilterListIcon />
              </IconButton>

              {/* Search Icon */}
              <IconButton
                color={clickedIcons.search ? "primary" : "default"}
                onClick={(e) => {
                  handleIconClick('search');
                  handleOpenSearch(e);
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>

              {/* Show Columns Icon (3 blocks) */}
              <IconButton
                color={clickedIcons.columns ? "primary" : "default"}
                onClick={(e) => {
                  handleIconClick('columns');
                  handleOpenColumns(e);
                }}
                aria-label="show columns"
              >
                <ViewColumnIcon />
              </IconButton>

              {/* Reset Filters Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleResetFilters}
                sx={{ ml: 1 }}
              >
                Reset
              </Button>
            </Box>
          </Box>

          <Table 
            aria-label="student information table"
            sx={{
              color: "#34405E", 
              '& .MuiTableCell-root': { // Apply color to all table cells
                color: "#34405E"
              },
              '& .MuiTableHead-root': { // Apply color to table header
                backgroundColor: "#f5f5f5", // Optional: you can add background color for header row
              },
              '& .MuiTableRow-root': { // Optional: Apply row hover effect
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              },
            }}
          >
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
