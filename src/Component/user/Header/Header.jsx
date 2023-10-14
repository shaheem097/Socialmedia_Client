import React from 'react';
// import { clearUser } from '../../../Redux/Reducers/Auth/singleReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import {setUserDetails} from "../../../Redux/Reducers/Auth/singleReducer"
import 'react-toastify/dist/ReactToastify.css';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
} from '@mui/material';

const Header = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout = () => {
      const toastStyle = {
        background: 'orange',
        color: 'white',
        padding: '16px',
        borderRadius: '4px',
        textAlign: 'center',
      };
    
      const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px',
      };
    
      const buttonStyle = {
        background: 'black',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
      };
      const textStyle = {
        color: 'black', // Change the text color to black
      };
    
      toast.dark(
        <div style={toastStyle}>
       <p style={textStyle}>Are you sure?</p>
          <div style={buttonContainerStyle}>
            <button
              onClick={() => {
                // Perform delete operation
                localStorage.removeItem("userAccessToken");
                // dispatch(clearUser());
                dispatch(setUserDetails(null));
                navigate("/login");
                toast.dismiss(); // Close the toast after confirmation
              }}
              style={buttonStyle}
            >
              Logout
            </button>
            <button
              onClick={() => toast.dismiss()} // Close the toast if Cancel is clicked
              style={buttonStyle}
            >
              Cancel
            </button>
          </div>
        </div>,
        {
          autoClose: false, // Don't auto-close the toast
          closeOnClick: false, // Don't close the toast when clicked outside
        }
      );
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
