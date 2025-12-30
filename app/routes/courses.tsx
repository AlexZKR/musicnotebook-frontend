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
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* 1. Hero / Header Section */}
        <Stack spacing={2} textAlign="center" alignItems="center">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
            }}
          >
            <AutoStoriesIcon fontSize="medium" />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Community Courses
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth="md"
            sx={{
              fontWeight: "normal",
              lineHeight: 1.45,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
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
              borderRadius: "99px",
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          />
        </Stack>

        {/* 2. Course Grid */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden", mt: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            borderBottom={1}
            borderColor="divider"
            pb={1}
          >
            <Typography variant="h5" fontWeight="bold">
              All Courses
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {courses.length} courses
            </Typography>
          </Box>

          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
              pr: 1,
              pt: 1,
              pb: 2,
            }}
          >
            <CourseList
              courses={courses}
              topics={topics}
              completedCourseIds={completedCourseIds}
              completedNodeIds={completedNodeIds}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
