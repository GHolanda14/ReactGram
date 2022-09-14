import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Cadastro from "./pages/Auth/Cadastro/Cadastro";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
