import React from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HeroButton } from "~/ui/atoms";

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
          <HeroButton
            to="/courses"
            label="See Courses"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          />
          <HeroButton
            to="/about"
            label="Learn More"
            variant="outlined"
            color="inherit"
          />
        </Stack>
      </Stack>
    </Container>
  );
}
