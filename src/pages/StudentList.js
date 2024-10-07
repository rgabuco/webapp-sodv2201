import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import { Container, Typography } from "@mui/material";
import FilterSearchReset from "../components/filter-search-reset/FilterSearchReset";
import StudentTable from "../components/student-table/StudentTable";
import ColumnPopover from "../components/column-popover/ColumnPopover";

function StudentList() {
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("bvc-users")) || [];
    const currentUser = storedUsers.find((user) => user.username === localStorage.getItem("currentUsername"));

    if (currentUser && currentUser.isAdmin === "true") {
      setIsAdmin(true);
    }

    // Filter out admin users on initial load
    const filteredUsers = storedUsers.filter((user) => user.isAdmin !== "true");
    setUsers(filteredUsers);
  }, []);

  const filteredUsers = users.filter((student) => {
    return (
      (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterValues.firstName === "" || student.firstName.toLowerCase().includes(filterValues.firstName.toLowerCase())) &&
      (filterValues.lastName === "" || student.lastName.toLowerCase().includes(filterValues.lastName.toLowerCase())) &&
      (filterValues.email === "" || student.email.toLowerCase().includes(filterValues.email.toLowerCase())) &&
      (filterValues.phone === "" || student.phone.toLowerCase().includes(filterValues.phone.toLowerCase())) &&
      (filterValues.department === "" || student.department.toLowerCase().includes(filterValues.department.toLowerCase())) &&
      (filterValues.program === "" || student.program.toLowerCase().includes(filterValues.program.toLowerCase()))
    );
  });

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
    const newVisibility = {};
    const isChecked = event.target.checked;

    ["firstName", "lastName", "email", "phone", "department", "program"].forEach((column) => {
      newVisibility[column] = isChecked;
    });

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
  };

  // New function to handle student deletion
  const handleDelete = (studentId) => {
    const updatedUsers = users.filter((student) => student.id !== studentId);
    setUsers(updatedUsers);
    localStorage.setItem("bvc-users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Container maxWidth="lg" sx={{ mt: 5, color: "#34405E" }}>
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

            <StudentTable filteredUsers={filteredUsers} columnVisibility={columnVisibility} handleDelete={handleDelete} />
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
