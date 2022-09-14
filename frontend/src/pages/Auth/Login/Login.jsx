import "../Auth.css";
import React from "react";
import Form from "../../../components/Form/Form";
import { Grid, Paper, Typography } from "@mui/material";

const Login = () => {
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
            Logue para começar a curtir as fotos!
          </Typography>
        </Grid>
        <Form type="login" />
      </Paper>
    </Grid>
  );
};

export default Login;
