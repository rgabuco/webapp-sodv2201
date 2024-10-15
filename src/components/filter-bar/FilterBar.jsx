import React, { useState } from "react";
import { Typography, Box, IconButton, Menu, MenuItem, TextField, InputAdornment, FormControlLabel, Checkbox, Button, useMediaQuery } from "@mui/material";
import { Search as SearchIcon, MarkEmailUnread as MarkEmailUnreadIcon, CalendarToday as CalendarTodayIcon, Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const FilterBar = ({ searchQuery, setSearchQuery, isReadFilter, setIsReadFilter, dateFilter, setDateFilter, handleResetFilters }) => {
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [anchorElRead, setAnchorElRead] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", boxShadow: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isSmallScreen ? "stretch" : "center",
          gap: isSmallScreen ? 2 : 0,
        }}
      >
        <Typography variant="h5" sx={{ color: "#34405E" }}>
          User Messages
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
          <IconButton onClick={(e) => setAnchorElSearch(e.currentTarget)}>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={(e) => setAnchorElRead(e.currentTarget)}>
            <MarkEmailUnreadIcon />
          </IconButton>
          <IconButton onClick={(e) => setAnchorElDate(e.currentTarget)}>
            <CalendarTodayIcon />
          </IconButton>
          <Button onClick={handleResetFilters} variant="outlined" color="secondary">
            Reset
          </Button>
        </Box>
      </Box>

      {/* Search Dropdown */}
      <Menu
        anchorEl={anchorElSearch}
        open={Boolean(anchorElSearch)}
        onClose={() => setAnchorElSearch(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <TextField
            label="Search by Username or Email"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => setAnchorElSearch(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Menu>

      {/* Read/Unread Dropdown */}
      <Menu
        anchorEl={anchorElRead}
        open={Boolean(anchorElRead)}
        onClose={() => setAnchorElRead(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <FormControlLabel control={<Checkbox checked={isReadFilter === true} onChange={() => setIsReadFilter(true)} />} label="Read" />
          <FormControlLabel control={<Checkbox checked={isReadFilter === false} onChange={() => setIsReadFilter(false)} />} label="Unread" />
          <FormControlLabel control={<Checkbox checked={isReadFilter === null} onChange={() => setIsReadFilter(null)} />} label="All" />
        </Box>
      </Menu>

      {/* Date Filter Dropdown */}
      <Menu
        anchorEl={anchorElDate}
        open={Boolean(anchorElDate)}
        onClose={() => setAnchorElDate(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <IconButton onClick={() => setAnchorElDate(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Menu>
    </Box>
  );
};

export default FilterBar;
