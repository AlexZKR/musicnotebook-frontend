import React from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Typography,
  Stack,
  Button,
  LinearProgress,
  alpha,
  useTheme,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";

import type { Topic } from "~/features/roadmap/model/topic";

interface TopicHeaderProps {
  topic: Topic;
  courseId: number | string;
  completedCount: number;
  totalCount: number;
  variant?: "default" | "compact";
}

export default function TopicHeader({
  topic,
  courseId,
  completedCount,
  totalCount,
  variant = "default",
}: TopicHeaderProps) {
  const theme = useTheme();
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isCompact = variant === "compact";

  return (
    <Box sx={{ mb: isCompact ? 2 : 6 }}>
      {/* Breadcrumb / Back */}
      <Box sx={{ mb: isCompact ? 1 : 3 }}>
        <Button
          component={RouterLink}
          to={`/course/${courseId}`}
          startIcon={<ArrowBackIcon />}
          color="inherit"
          sx={{
            opacity: 0.7,
            "&:hover": { opacity: 1, bgcolor: "transparent" },
          }}
        >
          Back to Course
        </Button>
      </Box>

      <Grid container spacing={isCompact ? 2 : 4} alignItems="flex-end">
        {/* Left: Title & Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={isCompact ? 1 : 2}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="primary.main"
            >
              <SchoolIcon fontSize="small" />
              <Typography
                variant="overline"
                fontWeight="bold"
                letterSpacing={1}
              >
                Topic Module
              </Typography>
            </Box>
            <Typography
              variant={isCompact ? "h4" : "h2"}
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: isCompact
                  ? { xs: "1.5rem", md: "2rem" }
                  : { xs: "2rem", md: "3rem" },
                lineHeight: 1.1,
              }}
            >
              {topic.title}
            </Typography>
            <Typography
              variant={isCompact ? "body1" : "h6"}
              color="text.secondary"
              sx={{
                fontWeight: "normal",
                maxWidth: "600px",
                ...(isCompact
                  ? {
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
                  : undefined),
              }}
            >
              {topic.description}
            </Typography>
          </Stack>
        </Grid>

        {/* Right: Topic Progress */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: isCompact ? 2 : 2.5,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Topic Progress
              </Typography>
              <Typography variant="h6" fontWeight="800" color="primary.main">
                {percentage}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                },
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block", textAlign: "right" }}
            >
              {completedCount} of {totalCount} lessons completed
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
