import React, { useMemo } from "react";
import { Box } from "@mui/material";

import type { CourseDefinition } from "~/features/roadmap/model/course";
import type { NotebookId } from "~/features/roadmap/model/notebook";
import type { Topic } from "~/features/roadmap/model/topic";
import { getCourseProgress } from "~/features/roadmap/utils/courseProgress";
import CourseCard from "./CourseCard";

type Props = {
  courses: readonly CourseDefinition[];
  topics: readonly Topic[];
  completedCourseIds: readonly CourseDefinition["id"][];
  completedNodeIds: readonly NotebookId[];
};

export default function CourseList({
  courses,
  topics,
  completedCourseIds,
  completedNodeIds,
}: Props) {
  const completedNodeSet = useMemo(
    () => new Set(completedNodeIds),
    [completedNodeIds]
  );

  return (
    <Box
      component="div"
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: {
          xs: "repeat(1, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      {courses.map((course) => {
        const progress = getCourseProgress(course, topics, completedNodeSet);
        return (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            isCompleted={completedCourseIds.includes(course.id)}
            topicCount={progress.topicCount}
            status={progress.status}
            progressPercent={progress.progressPercent}
          />
        );
      })}
    </Box>
  );
}
