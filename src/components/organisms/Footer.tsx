import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "./Footer.css";

const Footer: React.FC<{
  className?: string | undefined;
}> = (className) => {
  return (
    <footer className={className.className}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © Viphkee "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
