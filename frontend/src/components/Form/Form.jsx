import React from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cadastrar, reset } from "../../slices/authSlice";
import { useEffect } from "react";

let sxForm = { m: 1, width: "95%" };

const Form = (type) => {
  const { type: tipoForm } = type;
  const senhaRef = useRef();
  const nomeRef = useRef();
  const emailRef = useRef();
  const confirmSenhaRef = useRef();
  let [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleClick() {}

  const handleSubmit = (e) => {
    handleClick();
    e.preventDefault();

    if (tipoForm === "cadastro") {
      const user = {
        nome: nomeRef.current.value,
        email: emailRef.current.value,
        senha: senhaRef.current.value,
        confirmSenha: confirmSenhaRef.current.value,
      };

      dispatch(cadastrar(user));
      //   e.target.reset();
    } else {
      console.log("Logado");
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      {tipoForm === "cadastro" && (
        <TextField
          label="Nome"
          inputRef={nomeRef}
          variant="outlined"
          sx={sxForm}
          helperText={
            error && error.toLowerCase().includes("nome") ? error : ""
          }
          error={error && error.toLowerCase().includes("nome")}
          required
        />
      )}

      <TextField
        label="Email"
        inputRef={emailRef}
        variant="outlined"
        sx={sxForm}
        required
        helperText={
          error && error.toLowerCase().includes("e-mail") ? error : ""
        }
        error={error && error.toLowerCase().includes("e-mail")}
      />

      <TextField
        label="Senha"
        inputRef={senhaRef}
        variant="outlined"
        sx={sxForm}
        type={showPassword ? "text" : "password"}
        helperText={error && error.toLowerCase().includes("senha") ? error : ""}
        error={error && error.toLowerCase().includes("senha")}
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

      {tipoForm === "cadastro" && (
        <TextField
          label="Confirmação de senha"
          inputRef={confirmSenhaRef}
          variant="outlined"
          helperText={
            error && error.toLowerCase().includes("iguais") ? error : ""
          }
          error={error && error.toLowerCase().includes("iguais")}
          sx={sxForm}
          type={showPassword ? "text" : "password"}
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
      )}
      <FormControl sx={sxForm} variant="outlined">
        <Button type="submit" variant="contained">
          <span style={loading ? { color: "#DDD" } : { color: "#000" }}>
            {loading
              ? "Enviando"
              : tipoForm === "cadastro"
              ? "Cadastrar"
              : "Login"}
          </span>
          <InputAdornment position="start">
            {loading && <CircularProgress color="inherit" size={20} />}
          </InputAdornment>
        </Button>
      </FormControl>
      {error && <p>{error.includes("iguais") ? error : "Outro erro hein"}</p>}
    </Paper>
  );
};

export default Form;
