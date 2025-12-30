import React from "react";

import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "~/ui/atoms/Link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export function meta() {
  return [{ title: "Courses | Music Notebook" }];
}

export default function CoursesRoute() {
  const { completedCourseIds } = useUserProgress();
  const { courses } = useCourseData();

  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Stack alignContent={"center"} alignItems={"center"}>
          <Typography variant="h3">Courses</Typography>
          <Typography variant="subtitle1">
            Explore the courses below. Click a course to open its topics.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          {courses.map((course) => {
            const isCompleted = completedCourseIds.includes(course.id);
            return (
              <Paper
                key={course.id}
                variant="outlined"
                sx={{
                  flexGrow: 1,
                  minHeight: 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: 1,
                  bgcolor: isCompleted ? "success.light" : "background.paper",
                }}
              >
                <Typography variant="h4">{course.title}</Typography>
                <Typography variant="subtitle1">
                  {course.description}
                </Typography>
                <Button
                  component={Link}
                  to={`/course/${course.id}`}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                >
                  Explore {course.title}
                </Button>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}
