import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  LinearProgress,
  alpha,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type CourseProgressCardProps = {
  completedNotebooks: number;
  totalNotebooks: number;
};

export default function CourseProgressCard({
  completedNotebooks,
  totalNotebooks,
}: CourseProgressCardProps) {
  const percentage =
    totalNotebooks > 0
      ? Math.round((completedNotebooks / totalNotebooks) * 100)
      : 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: "blur(12px)",
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
              color: "warning.main",
              display: "flex",
            }}
          >
            <EmojiEventsIcon />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Course Progress
          </Typography>
        </Box>

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            mb={1}
          >
            <Typography variant="h3" fontWeight="800" color="primary.main">
              {percentage}%
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="medium"
            >
              {completedNotebooks} / {totalNotebooks} Notebooks
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
