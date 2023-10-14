import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
} from '@mui/material';
import {setAdmin} from '../../Redux/Reducers/Auth/adminAuthReducer'

function AdminHeader() {
    const navigate=useNavigate()
    const dispatch=useDispatch()


  const handleLogout=()=>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete operation
        localStorage.removeItem("adminAccessToken");
        
        dispatch(setAdmin(null))
        navigate("/admin/login");
      }
    });
  };
 

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Admin COSMOBIC
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ width: '300px' }}
            />
            <Button
              onClick={handleLogout}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminHeader
