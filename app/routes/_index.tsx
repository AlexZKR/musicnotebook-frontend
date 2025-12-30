import React from "react";
import {
  Container,
  Typography,
  Stack,
  Box,
  useTheme,
  Paper,
  alpha,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LinkIcon from "@mui/icons-material/Link";

import { HeroButton } from "~/ui/atoms";

export function meta() {
  return [
    { title: "Music Notebook | Theory Meets Practice" },
    {
      name: "description",
      content: "Interactive music theory and songbook application.",
    },
  ];
}

export default function IndexRoute() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing={4}
          sx={{
            minHeight: "60vh",
            py: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            Don&apos;t just learn music. <br />
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Interact with it.
            </Box>
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, fontWeight: 400, lineHeight: 1.6 }}
          >
            Bridge the gap between <strong>Theory</strong> and{" "}
            <strong>Practice</strong>. Create interactive notes for your
            learning journey and build a songbook that actually teaches you how
            to play.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} pt={2}>
            <HeroButton
              to="/courses"
              label="Explore Theory"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            />
            <HeroButton
              to="/songbook"
              label="Open Songbook"
              variant="outlined"
              color="inherit"
            />
          </Stack>
        </Stack>
      </Container>

      {/* Philosophy Section */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Theory Card */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <MenuBookIcon fontSize="large" />
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Theory
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Your Personal Knowledge Base
                </Typography>
                <Typography variant="body1" paragraph>
                  Don&apos;t just buy a course from an &quot;expert&quot; and
                  forget it. Build your own understanding.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our interactive notebooks allow you to write down what you
                  learn, embed playable music snippets, and visualize concepts
                  on a roadmap. It&apos;s theory, written by you, for you.
                </Typography>
              </Paper>
            </Grid>

            {/* Connector (Desktop Only) */}
            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "text.disabled",
                  gap: 1,
                }}
              >
                <LinkIcon sx={{ fontSize: 40, transform: "rotate(45deg)" }} />
                <Typography
                  variant="overline"
                  fontWeight="bold"
                  align="center"
                  sx={{ lineHeight: 1.2 }}
                >
                  Connects
                  <br />
                  To
                </Typography>
              </Box>
            </Grid>

            {/* Practice Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <LibraryMusicIcon fontSize="large" />
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Practice
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  The Ultimate Songbook
                </Typography>
                <Typography variant="body1" paragraph>
                  Static chords over text aren&apos;t enough. You need context.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create practice notebooks for every song. Add playing
                  instructions, record your progress, and{" "}
                  <strong>link back to the theory</strong> used in the song.
                  Understand <em>why</em> it sounds good, not just <em>how</em>{" "}
                  to play it.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
