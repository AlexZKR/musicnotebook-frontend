import React from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  Container,
  Typography,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function meta() {
  return [
    { title: "Music Notebook" },
    { name: "description", content: "Interactive Music Learning" },
  ];
}

export default function IndexRoute() {
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        spacing={4}
        sx={{
          minHeight: "80vh",
          py: { xs: 8, md: 12 }, // Responsive padding (xs=mobile, md=desktop)
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
        >
          Master Music Theory <br />
          <Box
            component="span"
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Interactive Way
          </Box>
        </Typography>

        {/* 3. The Subtext */}
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, fontWeight: 400, lineHeight: 1.6 }}
        >
          Forget dry textbooks. Music Notebook lets you learn theory through{" "}
          <Box component="strong" color="text.primary">
            interactive documents
          </Box>
          . Edit musical notation, hear the changes instantly, and visualize
          knowledge on a connected roadmap.
        </Typography>

        {/* 4. The Action Buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            component={RouterLink}
            to="/roadmap"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Start Roadmap
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            size="large"
            color="inherit" // Uses neutral color (gray/black/white)
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Learn More
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
