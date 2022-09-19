import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../slices/authSlice";

import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useRef } from "react";

let sxForm = { m: 1, width: "95%" };

const FormLogin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const senhaRef = useRef();

  let verificacaoEmail =
    error && (error.toLowerCase().includes("e-mail") ? error : "");
  let verificacaoSenha =
    error && (error.toLowerCase().includes("credenciais") ? error : "");

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      senha: senhaRef.current.value,
    };

    dispatch(login(user));
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(reset());
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        inputRef={emailRef}
        variant="outlined"
        sx={sxForm}
        onChange={() => handleInputChange()}
        required
        helperText={verificacaoEmail}
        error={error && verificacaoEmail !== ""}
      />

      <TextField
        label="Senha"
        inputRef={senhaRef}
        onChange={() => handleInputChange()}
        variant="outlined"
        sx={sxForm}
        type={showPassword ? "text" : "password"}
        helperText={verificacaoSenha}
        error={error && verificacaoSenha !== ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
      <FormControl sx={sxForm} variant="outlined">
        <Button type="submit" variant="contained">
          <span style={loading ? { color: "#DDD" } : { color: "#000" }}>
            {loading ? "Enviando" : "Login"}
          </span>
          <InputAdornment position="start">
            {loading && <CircularProgress color="inherit" size={20} />}
          </InputAdornment>
        </Button>
      </FormControl>
    </Paper>
  );
};

export default FormLogin;
