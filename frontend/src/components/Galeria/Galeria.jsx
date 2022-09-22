import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Galeria = ({ photos, uploads }) => {
  return (
    <>
      <Typography variant="h4">Minhas fotos</Typography>
      {photos ? (
        // <ImageList sx={{ width: 800 }} cols={4} rowHeight={300}>
        //   {photos.map((photo) => (
        //     <ImageListItem>
        //       <Card sx={{ maxHeight: 300 }}>
        //         <CardMedia
        //           style={{ heigth: 0 }}
        //           component="img"
        //           image={`${uploads}/photos/${photo.imagem}?w=300&h=300&fit=crop&auto=format`}
        //         />
        //         <CardActions
        //           sx={{ display: "flex", justifyContent: "space-around" }}
        //         >
        //           <VisibilityIcon />
        //           <EditIcon />
        //           <DeleteForeverIcon />
        //         </CardActions>
        //       </Card>
        //     </ImageListItem>
        //   ))}
        // </ImageList>
        <Grid
          container
          sx={{ maxWidth: 800 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          spacing={1}
        >
          {photos.map((photo) => (
            <Grid item xs={1} sm={2} md={4} key={photo.id}>
              <Card sx={{ overflow: "visible", maxHeight: 300 }}>
                <CardMedia
                  component="img"
                  image={`${uploads}/photos/${photo.imagem}`}
                />
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <VisibilityIcon />
                  <EditIcon />
                  <DeleteForeverIcon />
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
