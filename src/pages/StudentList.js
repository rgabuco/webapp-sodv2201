import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Container, Typography, IconButton, Box } from "@mui/material";
import FilterSearchReset from "../components/filter-search-reset/FilterSearchReset";
import StudentTable from "../components/student-table/StudentTable";
import ColumnPopover from "../components/column-popover/ColumnPopover";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FirstPage from "@mui/icons-material/FirstPage";
import usersArray from "../utils/data/Users.js"

function StudentList() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(usersArray);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [anchorElColumns, setAnchorElColumns] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedIcons, setClickedIcons] = useState({ filter: false, search: false, columns: false });
  const [columnVisibility, setColumnVisibility] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    department: true,
    program: true,
  });
  const [filterValues, setFilterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    program: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
      const currentUser = storedUsers.find((user) => user.username === localStorage.getItem("currentUser"));

      if (currentUser?.isAdmin) {
        setIsAdmin(true);
      }

      const filteredUsers = storedUsers.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error retrieving users from local storage:", error);
    }
  }, []);

  // Filter users based on search and filter criteria
  const filteredUsers = users.filter((student) => {
    return (
      (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      Object.entries(filterValues).every(([key, value]) =>
        value === "" || student[key]?.toLowerCase().includes(value.toLowerCase())
      )
    );
  });

  // Calculate the paginated users
  const paginatedUsers = filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleIconClick = (iconName) => {
    setClickedIcons((prevState) => ({ ...prevState, [iconName]: !prevState[iconName] }));
  };

  const handleOpenFilter = (event) => setAnchorElFilter(event.currentTarget);
  const handleOpenSearch = (event) => setAnchorElSearch(event.currentTarget);
  const handleOpenColumns = (event) => setAnchorElColumns(event.currentTarget);

  const handleClosePopover = () => {
    setAnchorElFilter(null);
    setAnchorElSearch(null);
    setAnchorElColumns(null);
    setClickedIcons({ filter: false, search: false, columns: false });
  };

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleColumnVisibilityToggle = (column) => {
    setColumnVisibility((prevState) => ({ ...prevState, [column]: !prevState[column] }));
  };

  const handleSelectAllColumns = (event) => {
    const isChecked = event.target.checked;
    const newVisibility = Object.fromEntries(
      Object.keys(columnVisibility).map((column) => [column, isChecked])
    );
    setColumnVisibility(newVisibility);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setColumnVisibility({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      department: true,
      program: true,
    });
    setFilterValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      program: "",
    });
    handleClosePopover();
    setCurrentPage(0); // Reset to the first page
  };

  const handleDelete = (studentId) => {
    const updatedUsers = users.filter((student) => student.id !== studentId);
    setUsers(updatedUsers);
    localStorage.setItem("bvc-users", JSON.stringify(updatedUsers));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 4, color: "#34405E" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
          Student Information List
        </Typography>

        {!isAdmin && (
          <>
            <FilterSearchReset
              clickedIcons={clickedIcons}
              handleIconClick={handleIconClick}
              handleOpenFilter={handleOpenFilter}
              handleOpenSearch={handleOpenSearch}
              handleOpenColumns={handleOpenColumns}
              handleResetFilters={handleResetFilters}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filterValues={filterValues}
              handleFilterChange={handleFilterChange}
            />

            <StudentTable filteredUsers={paginatedUsers} columnVisibility={columnVisibility} handleDelete={handleDelete} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <IconButton onClick={handleFirstPage} disabled={currentPage === 0}>
                <FirstPage />
              </IconButton>
              <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                <KeyboardArrowRight />
              </IconButton>
            </Box>
          </>
        )}
      </Container>

      <ColumnPopover
        anchorElColumns={anchorElColumns}
        handleClosePopover={handleClosePopover}
        columnVisibility={columnVisibility}
        handleSelectAllColumns={handleSelectAllColumns}
        handleColumnVisibilityToggle={handleColumnVisibilityToggle}
      />
    </div>
  );
}

export default StudentList;
