import React from "react";
import "../Auth.css";

import { Divider, Grid, Link, Paper, Typography } from "@mui/material";

import Form from "../../../components/Form/Form";

const Cadastro = () => {
  let sxForm = { m: 1, width: "95%" };

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

        <Form type="cadastro" />

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
