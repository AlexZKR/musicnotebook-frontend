import React from "react";
import { Link as RouterLink } from "react-router";
import {
  Paper,
  Typography,
  Box,
  Button,
  alpha,
  useTheme,
  LinearProgress,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { Topic } from "~/features/theory/model/topic";

interface TopicListItemProps {
  topic: Topic;
  courseId: number;
  index: number;
  totalNotebooks: number;
  completedNotebooks: number;
  dense?: boolean;
}

export default function TopicListItem({
  topic,
  index,
  totalNotebooks,
  completedNotebooks,
  courseId,
  dense = false,
}: TopicListItemProps) {
  const theme = useTheme();

  // Calculate percentage safely
  const percentage = Math.round(
    totalNotebooks > 0 ? (completedNotebooks / totalNotebooks) * 100 : 0
  );

  const isCompleted = percentage === 100;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: dense ? 2 : 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: dense ? 2 : 3,
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        borderColor: isCompleted ? "success.light" : "divider",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: 3,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Index Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: dense ? 44 : 56,
          height: dense ? 44 : 56,
          borderRadius: 2.5,
          bgcolor: isCompleted
            ? alpha(theme.palette.success.main, 0.1)
            : alpha(theme.palette.primary.main, 0.08),
          color: isCompleted ? "success.main" : "primary.main",
          fontWeight: 800,
          fontSize: dense ? "1rem" : "1.25rem",
          flexShrink: 0,
        }}
      >
        {isCompleted ? <CheckCircleIcon /> : index + 1}
      </Box>

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Header Section */}
        <Box mb={dense ? 1.5 : 2}>
          <Typography
            variant={dense ? "subtitle1" : "h6"}
            fontWeight="800"
            sx={{ lineHeight: 1.2, mb: 0.5 }}
          >
            {topic.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.7rem",
              letterSpacing: 1,
              fontWeight: 600,
            }}
          >
            {topic.subtitle}
          </Typography>
        </Box>

        {/* Description */}
        {!dense && topic.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            {topic.description}
          </Typography>
        )}

        {/* Progress Section - The Redesign */}
        <Box sx={{ mt: "auto" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="caption" fontWeight="600" color="text.primary">
              {completedNotebooks} of {totalNotebooks} Notebooks
            </Typography>
            <Typography
              variant="caption"
              fontWeight="bold"
              color={isCompleted ? "success.main" : "primary.main"}
            >
              {percentage}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: dense ? 6 : 8,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.grey[500], 0.12),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor: isCompleted ? "success.main" : "primary.main",
              },
            }}
          />
        </Box>
      </Box>

      {/* Action Button - Vertically centered on Desktop */}
      <Box sx={{ alignSelf: { sm: "center" }, flexShrink: 0 }}>
        <Button
          component={RouterLink}
          to={`/course/${courseId}/topic/${topic.id}`}
          variant={isCompleted ? "outlined" : "contained"}
          color={isCompleted ? "success" : "primary"}
          endIcon={<ArrowForwardIcon />}
          size={dense ? "small" : "medium"}
          sx={{
            borderRadius: "99px",
            textTransform: "none",
            fontWeight: 700,
            px: dense ? 2 : 3,
            minWidth: dense ? 120 : 140,
            boxShadow: isCompleted ? "none" : 2,
          }}
        >
          {isCompleted ? "Review" : "Continue"}
        </Button>
      </Box>
    </Paper>
  );
}
