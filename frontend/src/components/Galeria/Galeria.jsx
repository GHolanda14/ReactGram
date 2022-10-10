import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePhoto,
  getUserPhotos,
  resetMessage,
} from "../../slices/photoSlice";
const Galeria = ({ id, uploads, changeForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photos } = useSelector((state) => state.photo);

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleEdit = (photo) => {
    changeForm(photo);
  };

  const handlePhoto = (id) => {
    navigate(`/photos/${id}`);
  };

  useEffect(() => {
    dispatch(getUserPhotos(id));
    dispatch(resetMessage());
  }, [dispatch]);
  return (
    <>
      <Typography variant="h4">Minhas fotos</Typography>
      {photos ? (
        <Grid
          container
          sx={{ maxWidth: 800 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          spacing={1}
        >
          {photos.map((photo) => (
            <Grid item xs={1} sm={2} md={4} key={photo._id}>
              <Card>
                <CardMedia
                  component="img"
                  image={`${uploads}/photos/${photo.imagem}`}
                />
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <IconButton onClick={() => handlePhoto(photo._id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(photo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(photo._id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">Não existem postagens ainda</Typography>
      )}
    </>
  );
};

export default Galeria;
