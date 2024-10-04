import React, { useState } from 'react';
import { Box, IconButton, Button, Typography, TextField, Popover } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloseIcon from '@mui/icons-material/Close';

const FilterSearchReset = ({ 
  clickedIcons, 
  handleIconClick, 
  handleOpenColumns, 
  handleResetFilters, 
  searchQuery, 
  handleSearchChange, 
  filterValues, 
  handleFilterChange 
}) => {
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);

  const handleOpenFilter = (event) => setAnchorElFilter(event.currentTarget);
  const handleCloseFilter = () => setAnchorElFilter(null);

  const handleOpenSearch = (event) => setAnchorElSearch(event.currentTarget);
  const handleCloseSearch = () => setAnchorElSearch(null);

  return (
    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", boxShadow: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h5" sx={{ color: "#34405E" }}>
          BVC Students
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color={clickedIcons.filter ? "primary" : "default"} onClick={handleOpenFilter} aria-label="filter">
            <FilterListIcon />
          </IconButton>
          <IconButton color={clickedIcons.search ? "primary" : "default"} onClick={handleOpenSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton color={clickedIcons.columns ? "primary" : "default"} onClick={handleOpenColumns} aria-label="show columns">
            <ViewColumnIcon />
          </IconButton>
          <Button variant="outlined" color="secondary" onClick={handleResetFilters} sx={{ ml: 1 }}>
            Reset
          </Button>
        </Box>
      </Box>

      {/* Search Popover */}
      <Popover
        open={Boolean(anchorElSearch)}
        anchorEl={anchorElSearch}
        onClose={handleCloseSearch}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
        transformOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6">Search</Typography>
            <IconButton onClick={handleCloseSearch} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
      </Popover>

      {/* Filter Popover */}
      <Popover
        open={Boolean(anchorElFilter)}
        anchorEl={anchorElFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
          {Object.keys(filterValues).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              variant="outlined"
              name={key}
              value={filterValues[key]} 
              onChange={handleFilterChange}
              sx={{ mb: 1 }}
            />
          ))}
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button onClick={handleCloseFilter} color="primary">Apply</Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterSearchReset;
