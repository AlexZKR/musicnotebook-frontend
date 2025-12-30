import React, { useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useCourseData } from "~/context/CourseContext";
import { CourseHeader } from "~/ui/organisms";
import { TopicListItem, HideableCompletionList } from "~/ui/molecules";
import { useUserProgress } from "~/context/UserContext";

export function meta({ params }: { params: { courseId: string } }) {
  return [{ title: `Course ${params.courseId} | Music Notebook` }];
}

export default function CourseRoute() {
  const { courseId } = useParams();
  const { getCourse, getTopics } = useCourseData();
  const { completedNodeIds, isTopicCompleted } = useUserProgress();

  // Convert string param to number ID
  const id = parseInt(courseId || "", 10);
  const course = !isNaN(id) ? getCourse(id) : null;
  const topics = useMemo(
    () => (!isNaN(id) ? getTopics(id) : []),
    [getTopics, id]
  );

  const completedSet = useMemo(
    () => new Set(completedNodeIds),
    [completedNodeIds]
  );

  // Calculate Course Statistics
  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    topics.forEach((t) => {
      total += t.notebookOrder.length;
      completed += t.notebookOrder.filter((nid) =>
        completedSet.has(nid)
      ).length;
    });
    return { total, completed };
  }, [topics, completedSet]);

  const hasCompletedTopics = useMemo(
    () => topics.some((topic) => isTopicCompleted(topic.id)),
    [isTopicCompleted, topics]
  );

  const isCourseFullyCompleted = useMemo(
    () => stats.total > 0 && stats.completed === stats.total,
    [stats]
  );

  if (!course) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Course not found.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/courses"
        >
          Back to Courses
        </Button>
      </Container>
    );
  }

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
        {/* Back Navigation */}
        <Box sx={{ pb: 1 }}>
          <Button
            component={RouterLink}
            to="/courses"
            startIcon={<ArrowBackIcon />}
            color="inherit"
            sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
          >
            Back to All Courses
          </Button>
        </Box>

        {/* Header Section with Progress */}
        <CourseHeader
          course={course}
          progress={{
            completedNotebooks: stats.completed,
            totalNotebooks: stats.total,
          }}
          variant="compact"
        />

        {/* Topics List Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              Topics
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 99,
                bgcolor: "action.selected",
                typography: "caption",
                fontWeight: "bold",
              }}
            >
              {topics.length}
            </Box>
          </Box>

          <Box />
        </Box>

        {/* Topics List */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <HideableCompletionList
            items={topics}
            isItemCompleted={(topic) => isTopicCompleted(topic.id)}
            showToggle={hasCompletedTopics && !isCourseFullyCompleted}
            spacing={2}
            maxHeight="100%"
            emptyState={({ hideCompleted: isHidden }) =>
              isHidden ? (
                <Typography color="text.secondary" fontStyle="italic">
                  All topics are completed and hidden.
                </Typography>
              ) : (
                <Typography color="text.secondary" fontStyle="italic">
                  No topics have been added to this course yet.
                </Typography>
              )
            }
            renderItem={(topic, meta) => {
              const total = topic.notebookOrder.length;
              const completed = topic.notebookOrder.filter((id) =>
                completedSet.has(id)
              ).length;

              return (
                <Collapse key={topic.id} in={!meta.isHidden} unmountOnExit>
                  <TopicListItem
                    topic={topic}
                    courseId={course.id}
                    index={meta.originalIndex}
                    totalNotebooks={total}
                    completedNotebooks={completed}
                    dense
                  />
                </Collapse>
              );
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
