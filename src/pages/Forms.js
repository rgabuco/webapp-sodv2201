import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  OutlinedInput,
  TableHead,
  Checkbox,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear"; // X icon for delete
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread"; // Envelope icon for message
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User icon
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Date icon
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";
import usersArray from "../utils/data/Users";

// Options for multi-select filter
const filterOptions = [
  { value: "all", label: "All" },
  { value: "username", label: "Username" },
  { value: "message", label: "Message" },
  { value: "date", label: "Date" },
];

function Forms() {
  const [messages, setMessages] = useState([]);
  const [loggedInAdmin, setLoggedInAdmin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState(["all"]); // Default to 'all'
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewedMessages, setViewedMessages] = useState([]); // Track viewed messages by message `date`

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("userLoggedIn");
    const admin = usersArray.find((user) => user.username === loggedInUsername && user.isAdmin);

    if (admin) {
      setLoggedInAdmin(admin.username);

      const storedMessages = JSON.parse(localStorage.getItem("bvc-messages")) || {};
      const storedViewedMessages = JSON.parse(localStorage.getItem("viewed-messages")) || [];

      if (storedMessages[admin.username]) {
        setMessages(storedMessages[admin.username]);
      } else {
        setMessages([]);
      }

      // Load viewed messages from localStorage
      setViewedMessages(storedViewedMessages);
    }
  }, []);

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);

    const storedMessages = JSON.parse(localStorage.getItem("bvc-messages")) || {};
    storedMessages[loggedInAdmin] = updatedMessages;
    localStorage.setItem("bvc-messages", JSON.stringify(storedMessages));
  };

  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase();
    if (filterCriteria.includes("all")) {
      return (
        msg.username.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query) ||
        new Date(msg.date).toLocaleString().includes(query)
      );
    }
    return filterCriteria.some((criteria) => {
      if (criteria === "username") {
        return msg.username.toLowerCase().includes(query);
      } else if (criteria === "message") {
        return msg.message.toLowerCase().includes(query);
      } else if (criteria === "date") {
        return new Date(msg.date).toLocaleString().includes(query);
      }
      return false;
    });
  });

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
    setOpenMessage(true);

    // Mark the message as viewed and store in localStorage using `date` as the unique identifier
    if (!viewedMessages.includes(message.date)) {
      const updatedViewedMessages = [...viewedMessages, message.date];
      setViewedMessages(updatedViewedMessages);

      // Persist the viewed messages in localStorage
      localStorage.setItem("viewed-messages", JSON.stringify(updatedViewedMessages));
    }
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setSelectedMessage(null);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (value.includes("all")) {
      setFilterCriteria(["all"]); // Reset to 'all'
    } else {
      setFilterCriteria(typeof value === "string" ? value.split(",") : value);
    }
  };

  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <Box sx={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#2B3C5E" }}>
          Messages
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 2, marginRight: 2, backgroundColor: "#f5f5f5", borderRadius: "5px" }}
          />

          {/* Multi-select filter criteria */}
          <Select
            multiple
            value={filterCriteria}
            onChange={handleFilterChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected.map((sel) => filterOptions.find((f) => f.value === sel).label).join(", ")
            }
            sx={{ flex: 1, backgroundColor: "#f5f5f5", borderRadius: "5px" }}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={filterCriteria.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ borderBottom: "2px solid gray", mb: 2 }}></Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            "@media (max-width: 600px)": {
              width: "100%",
              overflowX: "auto", // Allow horizontal scrolling on smaller screens
            },
          }}
        >
          <Table
            sx={{
              minWidth: 650, // Minimum width to avoid table shrink
              "@media (max-width: 600px)": {
                "& th": {
                  display: "none", // Hide headers on small screens
                },
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#2B3C5E",
                display: { xs: "none", sm: "table-header-group" },
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#2B3C5E", fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ color: "#2B3C5E", fontWeight: "bold" }}>Message</TableCell>
                <TableCell sx={{ color: "#2B3C5E", fontWeight: "bold" }}>Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No messages found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      "@media (max-width: 600px)": {
                        display: "block", // Display rows as blocks on smaller screens
                        marginBottom: "10px", // Add space between stacked rows
                      },
                    }}
                  >
                    <TableCell>
                      <AccountCircleIcon sx={{ mr: 1 }} /> {message.username}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color={viewedMessages.includes(message.date) ? "default" : "primary"}
                        onClick={() => handleOpenMessage(message)}
                        aria-label="view-message"
                      >
                        <MarkEmailUnreadIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <CalendarTodayIcon sx={{ mr: 1 }} /> {new Date(message.date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton color="default" onClick={() => handleDelete(index)} aria-label="delete">
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openMessage} onClose={handleCloseMessage} fullWidth maxWidth="sm">
          <DialogTitle>Message Content</DialogTitle>
          <DialogContent>
            <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
              {selectedMessage && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedMessage.message}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessage} variant="contained" sx={{ backgroundColor: "#2B3C5E", color: "#fff" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Forms;
