import React from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import { CourseList } from "~/ui/molecules";
import { HeroButton } from "~/ui/atoms";

export function meta() {
  return [{ title: "Community Courses | Music Notebook" }];
}

export default function CoursesRoute() {
  const theme = useTheme();
  const { completedCourseIds, completedNodeIds } = useUserProgress();
  const { courses, topics } = useCourseData();

  return (
    <Container maxWidth="lg">
      <Stack spacing={8} py={{ xs: 4, md: 8 }}>
        {/* 1. Hero / Header Section */}
        <Stack spacing={3} textAlign="center" alignItems="center">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1.5,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              mb: 1,
            }}
          >
            <AutoStoriesIcon fontSize="large" />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Community Courses
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            sx={{ fontWeight: "normal", lineHeight: 1.6 }}
          >
            Explore music theory collections created by the community. These
            aren&apos;t just courses—they are{" "}
            <strong>interactive notebooks</strong>. Clone them, edit the notes,
            and make the knowledge your own.
          </Typography>

          <HeroButton
            to="/notebook/create"
            label="Create Your Notebook"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mt: 2,
              borderRadius: "99px",
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          />
        </Stack>

        {/* 2. Course Grid (Fixed Layout) */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            borderBottom={1}
            borderColor="divider"
            pb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              All Courses
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {courses.length} courses
            </Typography>
          </Box>

          <CourseList
            courses={courses}
            topics={topics}
            completedCourseIds={completedCourseIds}
            completedNodeIds={completedNodeIds}
          />
        </Box>
      </Stack>
    </Container>
  );
}
