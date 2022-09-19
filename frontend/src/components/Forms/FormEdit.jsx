import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Badge,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { uploads } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { perfil, resetMessage } from "../../slices/userSlice";

const FormEdit = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");
  const [bio, setBio] = useState("");
  const [senha, setSenha] = useState("");
  const avatarUrl = null;
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  let sxForm = { m: 1, width: "95%" };

  useEffect(() => {
    dispatch(perfil());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setBio(user.bio);
      // console.log(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      {user ? (
        <>
          <Grid item display="flex" justifyContent="center">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  aria-label="upload picture"
                  size="small"
                  component="label"
                  sx={{ bgcolor: "primary.main" }}
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                sx={{ width: 66, height: 66 }}
                src={avatarUrl ? avatarUrl : null}
              />
            </Badge>
          </Grid>
          <TextField
            label="Nome"
            variant="outlined"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
            sx={sxForm}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            sx={sxForm}
          />

          <TextField
            label="Bio"
            variant="outlined"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            sx={sxForm}
          />
          <TextField
            label="Quer alterar sua senha?"
            type="password"
            variant="outlined"
            value={senha || ""}
            onChange={(e) => setSenha(e.target.value)}
            sx={sxForm}
          />
          <FormControl sx={sxForm} variant="outlined">
            <Button type="submit" variant="contained">
              <span style={false ? { color: "#DDD" } : { color: "#000" }}>
                {/* {loading ? "Enviando" : "Atualizar"} */}
                Atualizar
              </span>
              <InputAdornment position="start">
                {/* {loading && <CircularProgress color="inherit" size={20} />} */}
              </InputAdornment>
            </Button>
          </FormControl>
        </>
      ) : (
        <p>Carregando</p>
      )}
    </Paper>
  );
};

export default FormEdit;
