import React from "react";
import { TextField } from "@mui/material";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return <TextField label="Search" fullWidth margin="normal" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
};

export default SearchBox;
