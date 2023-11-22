import React from 'react';
import { useState} from "react";
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

import { Pagination } from "@mui/material";
import axios from '../../Axios/axios'

function UserManagement() {

const [users,setUser]=useState([]);
const [page, setPage] = useState(1);
const userPage=5
  const fetchAllUsers=async()=>{
    try{
      const response=await axios.get("/admin/view-users")
      console.log(response);
     setUser(response.data.data)
    }catch(error){
      console.log(error,"sfa");
    }
  }

  React.useLayoutEffect(()=>{
    fetchAllUsers();
  },[]);

const startIndex=(page-1)*userPage;
const endIndex=startIndex+userPage;
const currentUsers=users.slice(startIndex,endIndex)


const handleBlock=async(userId)=>{
  try {
    const response=await axios.put(`/admin/block/${userId}`)
    console.log(response);
    await fetchAllUsers()
  } catch (error) {
    console.log(error);
  }
};

const handleUnblock=async(userId)=>{
  try {
    const response=await axios.put(`/admin/Unblock/${userId}`)
    console.log(response,"thgddddddd");
    await fetchAllUsers()
  } catch (error) {
    console.log(error);
  }
}
  return (
   <>
  <main>
    <Box sx={{ p: 1 }}>
     
      <TableContainer component={Paper}>
      <Table sx={{ backgroundColor: '#111827', borderSpacing: '1 8px' }}>

          <TableHead>
            <TableRow sx={{ backgroundColor: '#111827', borderSpacing: '1 8px' }}>
              <TableCell sx={{ color: "white" }}>No</TableCell>
              <TableCell sx={{ color: "white" }}>Username</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers?.map((user, index) => (
              <TableRow key={user?._id}>
                <TableCell
                  sx={{
                    "@media (max-width: 600px)": { display: "none" },
                    color: "white",
                  }}
                >
                  {startIndex +index + 1}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{user?.username}</TableCell>
                <TableCell sx={{ color: "white" }}>{user?.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{user?.phone}</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  {user?.isBlock ? (
                    <Button
                      variant="contained"
                      color={"success"}
                      onClick={() => handleUnblock(user?._id)}
                    >
                      Un Block
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color={"error"}
                      onClick={() => handleBlock(user?._id)}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
  count={Math.ceil(users?.length / userPage)}
  page={page}
  onChange={(event, value) => setPage(value)}
  sx={{
    "& .MuiPaginationItem-root": {
      color: "white", // Change the color of page numbers
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "blue", // Change the background color of the selected page
      color: "white", // Change the text color of the selected page
      "&.Mui-selected": {
        backgroundColor: "green", // Maintain the background color when clicking another page
      },
    },
    "& .MuiPagination-ul": {
      justifyContent: "center", // Center-align the pagination
    },
  }}
/>
      </Box>
    </Box>
  </main>
</>

  )
}

export default UserManagement;
