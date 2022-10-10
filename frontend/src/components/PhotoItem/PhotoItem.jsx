import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { uploads } from "../../utils/config";

const PhotoItem = ({ photo }) => {
  const { user, loading } = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      {photo && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          flexBasis="500px"
        >
          <Card sx={{ maxWidth: "65vw" }}>
            <CardMedia
              component="img"
              image={`${uploads}/photos/${photo.imagem}`}
              sx={{ maxHeight: "700px" }}
            />
          </Card>
          <Typography variant="h5">{photo.titulo}</Typography>
          <Typography variant="body2">
            Publicada por:{" "}
            <Link
              to={`/users/${photo.userId}`}
              style={{ textDecoration: "none" }}
            >
              {photo.userName}
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PhotoItem;
