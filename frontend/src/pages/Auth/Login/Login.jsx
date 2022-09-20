import React from "react";
import "../Auth.css";

import { Divider, Grid, Link, Paper, Typography } from "@mui/material";

import FormLogin from "../../../components/Forms/FormLogin";

let sxForm = { m: 1, width: "95%" };

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

        <FormLogin />

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
          Não tem uma conta?
          <Link href="/cadastro" ml={0.2} underline="hover">
            Cadastre-se
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default Login;
