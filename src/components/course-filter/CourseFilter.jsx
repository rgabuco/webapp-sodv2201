import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

const CourseFilter = ({ filterTerm, setFilterTerm, searchTerm, setSearchTerm }) => (
  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
    <FormControl fullWidth variant="outlined">
      <InputLabel>Select Term</InputLabel>
      <Select value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} label="Filter by Term">
        <MenuItem value="">All Terms</MenuItem>
        <MenuItem value="Winter">Winter</MenuItem>
        <MenuItem value="Spring">Spring</MenuItem>
        <MenuItem value="Summer">Summer</MenuItem>
        <MenuItem value="Fall">Fall</MenuItem>
      </Select>
    </FormControl>
    <TextField label="Search" variant="outlined" fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  </Box>
);

export default CourseFilter;
