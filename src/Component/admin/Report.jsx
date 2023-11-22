import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Pagination,IconButton } from "@mui/material";
import axios from "../../Axios/axios";

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const reportsPerPage = 5;

  const fetchAllReports = async () => {
    try {
      const response = await axios.get("/admin/reported-posts");

      console.log(response,"reportpossttttttttttt");
      setReports(response.data);
    } catch (error) {
      console.log(error, "Error fetching reports");
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  const handleDelete = async (postId) => {
    // Show the confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel", // Display "Cancel" for the Cancel button
      reverseButtons: true, // Show the Confirm button on the left and Cancel button on the right
    });

    if (result.isConfirmed) {
      const res = await axios.put(`/admin/confirm-report/${postId}`);
      console.log(res, "data delelted seeet");
      fetchAllReports()
      // setSuccess
    }
  };
  const handleRemove = async (postId, id) => {
    console.log(id,"indexxxxxxxxxxxxxxxxxxx");
    // Show the confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel", // Display "Cancel" for the Cancel button
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const res = await axios.put(`/admin/reported-remove`, {
        postId: postId,
        id: id,
      });
      if (res.data) {
        fetchAllReports();
      }
    }
  };


  const startIndex = (page - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const currentReports = reports?.slice(startIndex, endIndex);



  return (
    <>
      <main>
      <Box sx={{ p: 1, display: "flex", flexDirection: "column", minHeight: "500px" }}>
      {reports.length === 0 ? (
             <Box sx={{  justifyContent: "center", alignItems: "center", height: "100%" }}>
             <img src="/assets/noreports2.png" alt="No Reports" style={{height:'500px'}} />
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-center text-gray-500 font-bold font-serif hidden md:block">No Reports</h1>
           </Box>
          ) : (
       
       
        <TableContainer component={Paper} 
          
        >
           
            <Table
              sx={{ backgroundColor: "#111827", borderSpacing: "1 8px" }}
            >
              
              <TableHead>
                <TableRow sx={{ backgroundColor: "#111827", borderSpacing: "1 8px" }}>
                  <TableCell sx={{ color: "white" }}>No</TableCell>
                  <TableCell sx={{ color: "white" }}>Username</TableCell>
                  <TableCell sx={{ color: "white" }}>Reason</TableCell>
                  <TableCell sx={{ color: "white" }}>Post Content</TableCell>
                  <TableCell sx={{ color: "white" }}>Date Reported</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentReports?.map((report, index) => (
                  <TableRow key={report?._id}>
                    <TableCell
                      sx={{
                        "@media (max-width: 600px)": { display: "none" },
                        color: "white",
                      }}
                    >
                      {startIndex+index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{report?.report[0]?.userId}</TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        wordBreak: "break-word", // Enable word break
                        overflowWrap: "break-word", // Additional property for better browser support
                        maxWidth: "200px", // Adjust the max width as needed
                      }}
                    >
                      {report?.report[0]?.reason}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <img src={report?.post[0]}
                       alt="post"
                       style={{ width: "45px", height: "45px" }} />
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(report?.updatedAt).toLocaleDateString("en-US")}
                      </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                    {report.adminDeleted ? (
                          <CheckCircleIcon style={{ color: "green" }} />
                        ) : (
                          <>
                            <IconButton color="error" aria-label="Delete">
                              <DeleteIcon
                                onClick={() => handleDelete(report?._id)}
                              />
                            </IconButton>
                            <IconButton aria-label="Delete">
                              <CancelIcon
                                onClick={() => handleRemove(report?._id,report?._id)}
                              />
                            </IconButton>
                          </>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(reports?.length / reportsPerPage)}
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
  );
}

export default ReportManagement;
