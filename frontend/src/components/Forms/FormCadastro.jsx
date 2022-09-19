import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cadastrar, reset } from "../../slices/authSlice";

let sxForm = { m: 1, width: "95%" };

const FormCadastro = (type) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const senhaRef = useRef();
  const nomeRef = useRef();
  const emailRef = useRef();
  const confirmSenhaRef = useRef();
  let [showPassword, setShowPassword] = useState(false);

  let verificaNome = error && error.toLowerCase().includes("nome") ? error : "";
  let verificaConfirmSenha =
    error && error.toLowerCase().includes("iguais") ? error : "";
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
      nome: nomeRef.current.value,
      email: emailRef.current.value,
      senha: senhaRef.current.value,
      confirmSenha: confirmSenhaRef.current.value,
    };
    dispatch(cadastrar(user));
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(reset());
    }
  };
  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        inputRef={nomeRef}
        onChange={() => handleInputChange()}
        variant="outlined"
        sx={sxForm}
        helperText={verificaNome}
        error={error && verificaNome !== ""}
        required
      />

      <TextField
        label="Email"
        inputRef={emailRef}
        onChange={() => handleInputChange()}
        variant="outlined"
        sx={sxForm}
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

      <TextField
        label="Confirmação de senha"
        inputRef={confirmSenhaRef}
        onChange={() => handleInputChange()}
        variant="outlined"
        helperText={verificaConfirmSenha}
        error={error && verificaConfirmSenha !== ""}
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

      <FormControl sx={sxForm} variant="outlined">
        <Button type="submit" variant="contained">
          <span style={loading ? { color: "#DDD" } : { color: "#000" }}>
            {loading ? "Enviando" : "Cadastrar"}
          </span>
          <InputAdornment position="start">
            {loading && <CircularProgress color="inherit" size={20} />}
          </InputAdornment>
        </Button>
      </FormControl>
    </Paper>
  );
};

export default FormCadastro;
