import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useCourseData } from "~/context/CourseContext";

export function meta() {
  return [{ title: "Course | Music Notebook" }];
}

export default function CourseRoute() {
  const { courseId = "" } = useParams();
  const numericCourseId = Number(courseId);
  const { getCourse } = useCourseData();
  const course = getCourse(numericCourseId);

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{course?.title}</Typography>
      <Typography variant="subtitle1">{course?.description}</Typography>
    </Stack>
  );
}
