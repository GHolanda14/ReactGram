import React from "react";
import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../slices/userSlice";
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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

let sxForm = { m: 1, width: "95%" };

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("uhu");
  };

  const handlePicture = (e) => {
    const imagem = e.target.files[0];
    if (imagem) {
      setPreview(imagem);
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
              src={`${uploads}/users/${user.imagemPerfil}`}
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
              {preview && (
                <IconButton
                  onClick={() => setPreview("")}
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
                {preview ? (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(preview)}
                  />
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
    </Box>
  );
};

export default Profile;
