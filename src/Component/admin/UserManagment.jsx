import React from 'react';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";


function UserManagement() {


  return (
    <div>
       <main>
      <Box sx={{ p: 1 }}>
        <Box sx={{ textAlign: "center", m: 3 }}>
          <Typography variant="h5" gutterBottom>
            View Users
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ backgroundColor: 'gray' }}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    Un Block
                  </Button>
                  <Button variant="contained" color="error">
                    Block
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {/* Add additional components or content here */}
        </Box>
      </Box>
    </main>
    </div>
  )
}

export default UserManagement;
