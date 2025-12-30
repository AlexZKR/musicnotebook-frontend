import React from "react";
import { Box, Typography, Stack, Chip, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import CourseProgressCard from "~/ui/molecules/course/CourseProgressCard";

import type { CourseDefinition } from "~/features/theory/model/course";

interface CourseHeaderProps {
  course: CourseDefinition;
  progress?: {
    completedNotebooks: number;
    totalNotebooks: number;
  };
  variant?: "default" | "compact";
}

export default function CourseHeader({
  course,
  progress,
  variant = "default",
}: CourseHeaderProps) {
  const isCompact = variant === "compact";

  return (
    <Box
      sx={{
        py: isCompact ? { xs: 2, md: 3 } : { xs: 4, md: 5 },
        borderBottom: 1,
        borderColor: "divider",
        mb: isCompact ? { xs: 2, md: 3 } : 6,
      }}
    >
      <Grid container spacing={isCompact ? 3 : 6} alignItems="center">
        {/* Left Column: Course Info */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Stack spacing={isCompact ? 1.5 : 3}>
            {/* Meta Badges */}
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<ClassIcon fontSize="small" />}
                label="Course"
                size="small"
                color="primary"
                sx={{ fontWeight: "bold" }}
              />
              <Chip
                icon={<PersonIcon fontSize="small" />}
                label={`Author ID: ${course.authorId}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            {/* Titles */}
            <Box>
              <Typography
                variant={isCompact ? "h3" : "h2"}
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  fontSize: isCompact
                    ? { xs: "1.75rem", md: "2.25rem" }
                    : { xs: "2.5rem", md: "3.5rem" },
                  mb: isCompact ? 1 : 2,
                  lineHeight: 1.1,
                }}
              >
                {course.title}
              </Typography>
              <Typography
                variant={isCompact ? "body1" : "h5"}
                color="text.secondary"
                sx={{
                  fontWeight: "normal",
                  lineHeight: isCompact ? 1.45 : 1.6,
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
                {course.description}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Right Column: Progress Card */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          {progress && (
            <CourseProgressCard
              completedNotebooks={progress.completedNotebooks}
              totalNotebooks={progress.totalNotebooks}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
