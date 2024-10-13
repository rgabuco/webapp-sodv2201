import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TermSelect = ({ term, setTerm }) => {
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel>Term</InputLabel>
      <Select value={term} onChange={(e) => setTerm(e.target.value)} label="Term">
        <MenuItem value="">All Terms</MenuItem>
        <MenuItem value="Winter">Winter</MenuItem>
        <MenuItem value="Spring">Spring</MenuItem>
        <MenuItem value="Summer">Summer</MenuItem>
        <MenuItem value="Fall">Fall</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TermSelect;
