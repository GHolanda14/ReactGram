import "../Auth.css";
import React from "react";

import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { useState, useRef } from "react";

const Cadastro = () => {
  let sxForm = { m: 1, width: "95%" };
  const senha = useRef();
  const nomeRef = useRef();
  const emailRef = useRef();
  const confirmSenhaRef = useRef();
  const [loading, setLoading] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleClick() {
    setLoading(true);
  }

  const handleSubmit = (e) => {
    handleClick();
    e.preventDefault();

    const user = {
      nome: nomeRef.current.value,
      email: emailRef.current.value,
      senha: senha.current.value,
      confirmSenha: confirmSenhaRef.current.value,
    };

    console.log(user);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const FormCadastro = () => {
    return (
      <Paper component="form" onSubmit={handleSubmit}>
        <FormControl sx={sxForm} variant="outlined" required>
          <InputLabel htmlFor="outlined-required-nome" required>
            Nome
          </InputLabel>
          <OutlinedInput
            id="outlined-required-nome"
            type="text"
            inputRef={nomeRef}
          />
        </FormControl>
        <FormControl sx={sxForm} variant="outlined" required>
          <InputLabel htmlFor="outlined-required-email" required>
            Email
          </InputLabel>
          <OutlinedInput
            id="outlined-required-email"
            type="email"
            inputRef={emailRef}
          />
        </FormControl>

        <FormControl sx={sxForm} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password" required>
            Senha
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            inputRef={senha}
            endAdornment={
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
            }
          />
        </FormControl>

        <FormControl sx={sxForm} variant="outlined" required>
          <InputLabel htmlFor="outlined-required-confirSenha" required>
            Confirmação de senha
          </InputLabel>
          <OutlinedInput
            id="outlined-required-confirSenha"
            type={showPassword ? "text" : "password"}
            inputRef={confirmSenhaRef}
            endAdornment={
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
            }
          ></OutlinedInput>
        </FormControl>

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

  return (
    <Grid container justifyContent="center" mt={4}>
      <Paper
        component="div"
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexBasis: "40vw",
        }}
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb={3}
        >
          <Typography variant="h2">ReactGram</Typography>
          <Typography variant="body1">
            Cadastre-se para ver as fotos dos seus amigos.
          </Typography>
        </Grid>
        <FormCadastro />

        <Grid item sx={{ sxForm, p: 2 }} variant="outlined">
          <Divider variant="fullWidth" />
        </Grid>

        <Grid
          item
          sx={{
            sxForm,
            p: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          variant="outlined"
        >
          Já possui conta?
          <Link href="/login" to={"/login"} ml={0.2} underline="hover">
            Clique aqui.
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Cadastro;
