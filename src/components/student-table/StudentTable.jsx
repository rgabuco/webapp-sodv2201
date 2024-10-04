import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; 
const StudentTable = ({ filteredUsers, columnVisibility, handleDelete }) => {
  const [selectedRow, setSelectedRow] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 
  const tableRef = useRef(); 
  const handleClickOpen = (id) => {
    setDeleteId(id); 
    setOpenDialog(true); 
  };

  const handleClose = () => {
    setOpenDialog(false); 
    setDeleteId(null); 
    setSelectedRow(null); 
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId); 
    }
    handleClose(); 
  };

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null); 
    } else {
      setSelectedRow(index); 
    }
  };

  // Effect to hide the delete icon when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null); // Deselect the row when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <TableContainer component={Paper} ref={tableRef}>
        <Table aria-label="student information table" sx={{ color: "#34405E", boxShadow: 2 }}>
          <TableHead>
            <TableRow>
              {columnVisibility.firstName && <TableCell align="center"><strong>First Name</strong></TableCell>}
              {columnVisibility.lastName && <TableCell align="center"><strong>Last Name</strong></TableCell>}
              {columnVisibility.email && <TableCell align="center"><strong>Email</strong></TableCell>}
              {columnVisibility.phone && <TableCell align="center"><strong>Phone</strong></TableCell>}
              {columnVisibility.department && <TableCell align="center"><strong>Department</strong></TableCell>}
              {columnVisibility.program && <TableCell align="center"><strong>Program</strong></TableCell>}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((student, index) => (
                <TableRow 
                  key={index}
                  onClick={() => handleRowClick(index)} 
                  sx={{ cursor: 'pointer' }} 
                >
                  {columnVisibility.firstName && <TableCell align="center">{student.firstName}</TableCell>}
                  {columnVisibility.lastName && <TableCell align="center">{student.lastName}</TableCell>}
                  {columnVisibility.email && <TableCell align="center">{student.email}</TableCell>}
                  {columnVisibility.phone && <TableCell align="center">{student.phone}</TableCell>}
                  {columnVisibility.department && <TableCell align="center">{student.department}</TableCell>}
                  {columnVisibility.program && <TableCell align="center">{student.program}</TableCell>}
                  <TableCell align="center">
                    {selectedRow === index && (
                      <DeleteIcon 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleClickOpen(student.id); 
                        }} 
                        sx={{ cursor: 'pointer', color: 'red' }} 
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No students found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentTable;
