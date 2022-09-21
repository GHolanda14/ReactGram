import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { perfil, resetMessage, updateProfile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

const FormEdit = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState("");
  const [bio, setBio] = useState("");
  const [senha, setSenha] = useState("");
  const [preview, setPreview] = useState("");

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
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nome: null,
      email: null,
      senha: null,
      bio: null,
      imagemPerfil: null,
    };

    if (nome) userData.nome = nome;

    if (email) userData.email = email;

    if (bio) userData.bio = bio;

    if (imagemPerfil) userData.imagemPerfil = imagemPerfil;

    if (senha) userData.senha = senha;

    //construindo form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handlePicture = (e) => {
    const imagem = e.target.files[0];

    setPreview(imagem);
    setImagemPerfil(imagem);
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
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handlePicture}
                  />
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : user.imagemPerfil &&
                      `${uploads}/users/${user.imagemPerfil}`
                }
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
              <span style={loading ? { color: "#DDD" } : { color: "#000" }}>
                {loading ? "Enviando" : "Atualizar"}
              </span>
              <InputAdornment position="start">
                {loading && <CircularProgress color="inherit" size={20} />}
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
