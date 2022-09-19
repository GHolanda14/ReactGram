import React from "react";

import { Grid, Paper, Typography } from "@mui/material";
import FormEdit from "../../components/Forms/FormEdit";
let sxForm = { m: 1, width: "95%" };

const EditProfile = () => {
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
          <Typography variant="h6" fontWeight="bold">
            Edite seus dados
          </Typography>
          <Typography variant="body1">
            Adicione uma imagem de perfil e conte um pouco mais sobre você...
          </Typography>
        </Grid>

        <FormEdit />
      </Paper>
    </Grid>
  );
};

export default EditProfile;
