import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import PostComponent from "./PostComponent";
import Suggestwidget from "./Suggestwidget";

function UserHome() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 960); // Adjust the screen width breakpoint as needed
    }

    // Initial check on component mount
    handleResize();

    // Add a listener for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid container spacing={2}>
      {isSmallScreen ? (
        // For small screens, display Suggestwidget above PostComponent
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Suggestwidget />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              elevation={3}
              style={{ padding: 16, backgroundColor: "#111827", width: "100%" }}
            >
              <PostComponent />
            </Paper>
          </Grid>
        </>
      ) : (
        // For larger screens, display in the original order
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              elevation={3}
              style={{ padding: 16, backgroundColor: "#111827", width: "100%" }}
            >
              <PostComponent />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Suggestwidget />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default UserHome;
