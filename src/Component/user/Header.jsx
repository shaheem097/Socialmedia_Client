/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Stack, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: `1px solid ${theme.palette.mode === "dark" ? "grey" : "black"}`, // Add border property
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled("input")(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

export default function Header() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#030712",
          color: "white",
          py: 1,
        }}
      >
        <Toolbar>
        <Link to={"/"} style={{ textDecoration: "none" }}>
  <Box>
    <img
      src="/assets/logo.png"
      height="40px"
      style={{ marginRight: "10px", height: "80px" }} 
      alt="logo"
    />
  </Box>
</Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Dark Mode" placement="bottom">
            <DarkModeIcon
              sx={{
                color: "white",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
