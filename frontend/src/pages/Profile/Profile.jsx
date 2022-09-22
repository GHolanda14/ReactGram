import React from "react";
import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetError,
  resetMessage,
  getUserPhotos,
} from "../../slices/photoSlice";
import {
  Avatar,
  Divider,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Galeria from "../../components/Galeria/Galeria";
// import { toast } from "react-toastify";

let sxForm = { m: 1, width: "95%" };

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);
  const { photos } = useSelector((state) => state.photo);
  console.log(photos);
  const [imagem, setImagem] = useState("");
  const [titulo, setTitulo] = useState("");
  const tituloRef = useRef("");

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const validateTitulo = errorPhoto && errorPhoto.includes("título");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tituloRef.current.value);
    const photoData = {
      titulo: tituloRef.current.value,
      imagem,
    };
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));
    // setTitulo("");
    // setImagem("");
    // const notify = () => toast.success("Sucesso demais bixo");
    // notify;

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handlePicture = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImagem(image);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Header */}
      <Box sx={{ maxWidth: 800, width: "100%" }}>
        <Box display="flex" justifyContent="center">
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Avatar
              src={user.imagemPerfil && `${uploads}/users/${user.imagemPerfil}`}
              sx={{ width: 130, height: 130 }}
              alt={user.nome}
            />
          </Box>
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {user.nome}
            </Typography>
            <Typography variant="body1">{user.bio}</Typography>
          </Box>
        </Box>
        <Divider variant="middle" />
      </Box>
      {id === user._id && (
        <Box
          sx={{ maxWidth: 800, width: "100%" }}
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
        >
          <TextField
            label="Título para a foto"
            variant="outlined"
            placeholder="Insira um título"
            sx={sxForm}
            inputRef={tituloRef}
            onChange={() => dispatch(resetError())}
            // value={titulo}
            // onChange={(e) => {
            //   if (errorPhoto) {
            //     dispatch(resetError());
            //   }
            //   setTitulo(e.target.value);
            // }}
            required
            error={validateTitulo}
            helperText={validateTitulo && errorPhoto}
          />

          <FormControl sx={sxForm}>
            <Card>
              <input
                hidden
                accept="image/*"
                id="teste"
                type="file"
                onChange={handlePicture}
              />
              {imagem && (
                <IconButton
                  onClick={() => setImagem("")}
                  sx={{
                    position: "absolute",
                    right: 3,
                    top: 3,
                    zIndex: 2000,
                    bgcolor: "#808080",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}

              <CardActionArea
                onClick={() => document.getElementById("teste").click()}
              >
                {imagem ? (
                  loadingPhoto ? (
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        Carregando...
                      </Typography>
                    </CardContent>
                  ) : (
                    <CardMedia
                      component="img"
                      image={URL.createObjectURL(imagem)}
                    />
                  )
                ) : (
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Adicione a foto
                    </Typography>
                    <AddPhotoAlternateIcon fontSize="large" />
                  </CardContent>
                )}
              </CardActionArea>
            </Card>
          </FormControl>

          <FormControl sx={sxForm}>
            <Button type="submit" variant="contained">
              Postar
            </Button>
          </FormControl>
        </Box>
      )}
      <Galeria photos={photos} uploads={uploads} />
    </Box>
  );
};

export default Profile;
