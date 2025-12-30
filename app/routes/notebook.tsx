import React from "react";
import { useNavigate, useParams } from "react-router";
import confetti from "canvas-confetti";
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Container,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import type { Route } from "./+types/notebook";
import { Notebook } from "~/ui/templates";

import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import Link from "~/ui/atoms/Link";

const CONFETTI_DURATION_MS = 2000;
const CONFETTI_PARTICLE_COUNT = 3;
const CONFETTI_SPREAD = 55;
const CONFETTI_ANGLE_LEFT = 60;
const CONFETTI_ANGLE_RIGHT = 120;
const RETURN_ANIMATION_CLEAR_DELAY_MS = 3000;

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.notebookId} | Notebook | Music Notebook` }];
}

export default function NotebookRoute() {
  const navigate = useNavigate();
  const { notebookId = "" } = useParams();
  const numericNotebookId = Number(notebookId);
  const { getNotebook } = useCourseData();
  const notebook = Number.isNaN(numericNotebookId)
    ? null
    : getNotebook(numericNotebookId);

  const { markNodeCompleted } = useUserProgress();

  if (!notebook) {
    return (
      <Container maxWidth="sm" sx={{ py: 16, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Notebook not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The notebook you requested doesn’t exist.
        </Typography>
        <Button
          component={Link}
          to="/roadmap"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back to Roadmap
        </Button>
      </Container>
    );
  }

  const runConfetti = () => {
    const end = Date.now() + CONFETTI_DURATION_MS;

    const frame = () => {
      confetti({
        particleCount: CONFETTI_PARTICLE_COUNT,
        angle: CONFETTI_ANGLE_LEFT,
        spread: CONFETTI_SPREAD,
        origin: { x: 0 },
        colors: ["#60a5fa", "#34d399", "#f472b6"],
      });
      confetti({
        particleCount: CONFETTI_PARTICLE_COUNT,
        angle: CONFETTI_ANGLE_RIGHT,
        spread: CONFETTI_SPREAD,
        origin: { x: 1 },
        colors: ["#60a5fa", "#34d399", "#f472b6"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  };

  const handleComplete = () => {
    runConfetti();

    if (notebook.trackProgress) {
      markNodeCompleted(notebook.id);
    }

    window.setTimeout(() => {
      navigate("/roadmap", {
        state: notebook.trackProgress
          ? { justCompletedNotebookId: notebook.id }
          : null,
      });
    }, RETURN_ANIMATION_CLEAR_DELAY_MS);
  };

  return (
    <Box
      sx={{
        animation: "fade-in 0.3s ease-out",
        "@keyframes fade-in": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 4, pb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link to="/roadmap" color="inherit" underline="hover">
            Roadmap
          </Link>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold",
              bgcolor: "action.selected",
              px: 1,
              py: 0.25,
              borderRadius: 1,
            }}
          >
            {notebook.title}
          </Typography>
        </Breadcrumbs>

        <Button
          component={Link}
          to="/roadmap"
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          sx={{ fontWeight: "medium" }}
        >
          Back to Roadmap
        </Button>
      </Stack>

      <Notebook
        key={notebook.id}
        initialBlocks={notebook.blocks}
        onComplete={notebook.trackProgress ? handleComplete : undefined}
      />
    </Box>
  );
}
