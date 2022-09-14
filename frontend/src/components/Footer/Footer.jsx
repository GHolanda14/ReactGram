import React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Typography
      component="footer"
      minHeight="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <p>ReactGram &copy;</p>
    </Typography>
  );
};

export default Footer;
