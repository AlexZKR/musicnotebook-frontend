import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { Route } from "./+types/notebook";
import { Notebook } from "~/ui/templates";

import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import { useConfetti } from "~/hooks/useConfetti";

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

  const { markNodeCompleted, unmarkNodeCompleted, getNodeStatus } =
    useUserProgress();

  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/courses");
  }, [navigate]);

  const runConfetti = useConfetti();

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
          onClick={goBack}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Container>
    );
  }

  const handleComplete = () => {
    runConfetti();

    if (notebook.trackProgress) {
      markNodeCompleted(notebook.id);
    }

    window.setTimeout(() => {
      goBack();
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
        <Typography variant="h5" fontWeight="bold">
          {notebook.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {notebook.trackProgress &&
            getNodeStatus(notebook.id) !== "completed" && (
              <Button
                onClick={handleComplete}
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                sx={{ fontWeight: 700 }}
              >
                Mark as Done
              </Button>
            )}
          {notebook.trackProgress &&
            getNodeStatus(notebook.id) === "completed" && (
              <Button
                onClick={() => unmarkNodeCompleted(notebook.id)}
                variant="outlined"
                color="inherit"
                sx={{ fontWeight: 700 }}
              >
                Mark as Not Done
              </Button>
            )}
          <Button
            onClick={goBack}
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            sx={{ fontWeight: "medium" }}
          >
            Back
          </Button>
        </Stack>
      </Stack>

      <Notebook
        key={notebook.id}
        initialBlocks={notebook.blocks}
        onComplete={notebook.trackProgress ? handleComplete : undefined}
      />
    </Box>
  );
}
