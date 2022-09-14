import { NavLink } from "react-router-dom";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";

import "./Navbar.css"

const Navbar = () => {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "static",
        pl: "10px",
        pr: "10px"
      }}
    >
      <Box sx={{ display: "flex" }}>
        <h1>ReactGram</h1>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchIcon sx={{ mr: 1, my: 0.5}} />
        <TextField id="input-with-sx" placeholder="Buscar" variant="standard" />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <NavLink to={"/"} className="nav">
          <HomeIcon />
        </NavLink>
        <NavLink to={"/login"} className="nav">Login</NavLink>
        <NavLink to={"/cadastro"} className="nav">Cadastro</NavLink>
      </Box>
    </AppBar>
  );
};

export default Navbar;
