import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import {setUserDetails} from "../../Redux/Reducers/Auth/singleReducer"


import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
} from '@mui/material';
import Swal from 'sweetalert2';

const Header = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    

    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel',
        customClass: {
          container: 'p-4 bg-gray-800 text-white border-2 border-gray-600 rounded-lg', // Apply Tailwind classes
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Perform delete operation
          localStorage.removeItem("userAccessToken");
          // dispatch(clearUser());
          dispatch(setUserDetails(null));
          navigate("/login");
      
        }
      });
    };
    
 

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            COSMOBIC
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

export default Header;
