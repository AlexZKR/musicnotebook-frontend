import React from "react";
import { Box, Typography, Stack, Chip, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import CourseProgressCard from "~/ui/molecules/course/CourseProgressCard";

import type { CourseDefinition } from "~/features/roadmap/model/course";

interface CourseHeaderProps {
  course: CourseDefinition;
  progress?: {
    completedNotebooks: number;
    totalNotebooks: number;
  };
}

export default function CourseHeader({ course, progress }: CourseHeaderProps) {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 5 },
        borderBottom: 1,
        borderColor: "divider",
        mb: 6,
      }}
    >
      <Grid container spacing={6} alignItems="center">
        {/* Left Column: Course Info */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Stack spacing={3}>
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
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  mb: 2,
                  lineHeight: 1.1,
                }}
              >
                {course.title}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontWeight: "normal", lineHeight: 1.6 }}
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
