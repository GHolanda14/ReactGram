import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Cadastro from "./pages/Auth/Cadastro/Cadastro";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Typography } from "@mui/material";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Typography variant="h3">Carregando...</Typography>;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <ToastContainer> */}
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/cadastro"
              element={!auth ? <Cadastro /> : <Navigate to="/" />}
            />
            <Route
              path="/perfil"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/photos/:id" element={<Photo />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      {/* </ToastContainer> */}
    </ThemeProvider>
  );
}

export default App;
