import React from "react";
import { Box, Typography, Link, Container, Stack, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]),
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="space-evenly">
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Bow Space
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © 2023 Bow Space. All rights reserved.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Links
            </Typography>
            <Link href="/" variant="body2" color="text.secondary" display="block">
              Home
            </Link>
            <Link href="/about" variant="body2" color="text.secondary" display="block">
              About
            </Link>
            <Link href="/contact" variant="body2" color="text.secondary" display="block">
              Contact
            </Link>
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#34405E" }}>
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#34405E" }}>
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#34405E" }}>
                <Instagram />
              </IconButton>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
