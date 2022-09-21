import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

//MUI Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../slices/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "static",
        pl: "10px",
        pr: "10px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <h1>ReactGram</h1>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchIcon sx={{ mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" placeholder="Buscar" variant="standard" />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink to={"/"} className="nav">
          <HomeIcon fontSize="large" />
        </NavLink>
        {user ? (
          <>
            <NavLink to={`/users/${user._id}`} className="nav">
              <CameraAltIcon fontSize="large" />
            </NavLink>
            <NavLink to={"/perfil"} className="nav">
              <AccountCircleIcon fontSize="large" />
            </NavLink>
            <NavLink to="" onClick={handleLogout} className="nav">
              <LogoutIcon fontSize="large" />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="nav">
              Login
            </NavLink>
            <NavLink to={"/cadastro"} className="nav">
              Cadastro
            </NavLink>
          </>
        )}
      </Box>
    </AppBar>
  );
};

export default Navbar;
