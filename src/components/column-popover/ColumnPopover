import React from 'react';
import { Popover, Box, Checkbox, FormControlLabel, Button } from "@mui/material";

const ColumnPopover = ({ 
  anchorElColumns, 
  handleClosePopover, 
  columnVisibility, 
  handleSelectAllColumns, 
  handleColumnVisibilityToggle 
}) => {
  return (
    <Popover
      open={Boolean(anchorElColumns)}
      anchorEl={anchorElColumns}
      onClose={handleClosePopover}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={Object.values(columnVisibility).every((value) => value)}
              onChange={handleSelectAllColumns}
            />
          }
          label="Select All"
        />
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
  );
};

export default ColumnPopover;
