import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ProgramSelect = ({ program, setProgram, programs }) => {
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel>Program</InputLabel>
      <Select value={program} onChange={(e) => setProgram(e.target.value)} label="Program">
        <MenuItem value="">All Programs</MenuItem>
        {programs.map((prog) => (
          <MenuItem key={prog} value={prog}>
            {prog}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProgramSelect;
