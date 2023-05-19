import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="">
        Rafał Głowacki
      </Link>{" "}
      {2023}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 0,
        px: 2,
        mt: "auto",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          gap: "5px",
        }}
      >
        <Copyright />
        <Typography variant="body3" color="text.secondary">
          {"Zauważone błędy ślij na "}
          <Link color="inherit" href="mailto:sky@wir.pl">
            sky@wir.pl
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
