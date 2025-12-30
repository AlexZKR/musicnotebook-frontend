import React from "react";
import { Link as RouterLink } from "react-router";
import {
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";

export interface CourseCardProps {
  id: number | string;
  title: string;
  description: string;
  isCompleted?: boolean;
  topicCount?: number;
  status?: "completed" | "in-progress" | "not-started";
  progressPercent?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  isCompleted = false,
  topicCount,
  status = "not-started",
  progressPercent = 0,
}: CourseCardProps) {
  const statusLabel =
    status === "completed"
      ? "Completed"
      : status === "in-progress"
        ? "In Progress"
        : "Not Started";
  const statusColor =
    status === "completed"
      ? "success"
      : status === "in-progress"
        ? "primary"
        : "default";
  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        position: "relative",
        overflow: "hidden",
        borderColor: isCompleted ? "success.light" : "divider",
        bgcolor: isCompleted
          ? (theme) => alpha(theme.palette.success.main, 0.04)
          : "background.paper",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 4,
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Decorative Background Icon for Completed State */}
      {isCompleted && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            opacity: 0.1,
            pointerEvents: "none",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 120, color: "success.main" }} />
        </Box>
      )}

      <Stack spacing={2} sx={{ flexGrow: 1, zIndex: 1 }}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            gap={1}
            mb={1}
          >
            <Typography variant="h5" component="h2" fontWeight="800">
              {title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={statusLabel}
                color={statusColor === "default" ? undefined : statusColor}
                variant={status === "not-started" ? "outlined" : "filled"}
                size="small"
              />
              {isCompleted && (
                <Chip
                  label="Done"
                  color="success"
                  size="small"
                  icon={<CheckCircleIcon />}
                />
              )}
            </Stack>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        </Box>

        {topicCount !== undefined && (
          <Box display="flex" alignItems="center" gap={0.5} mt="auto">
            <SchoolIcon
              fontSize="small"
              sx={{ color: "text.disabled", fontSize: "1rem" }}
            />
            <Typography
              variant="caption"
              color="text.disabled"
              fontWeight="bold"
            >
              {topicCount} {topicCount === 1 ? "TOPIC" : "TOPICS"}
            </Typography>
          </Box>
        )}
      </Stack>

      <Box sx={{ mt: 3, zIndex: 1 }}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          {progressPercent !== undefined && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {progressPercent}%
              </Typography>
            </Box>
          )}
          <Button
            component={RouterLink}
            to={`/course/${id}`}
            variant={isCompleted ? "outlined" : "contained"}
            color={isCompleted ? "success" : "primary"}
            size="large"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
          >
            {isCompleted ? "Review Course" : "Start Learning"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
