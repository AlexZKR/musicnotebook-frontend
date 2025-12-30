import React, { useState, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router";
import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useCourseData } from "~/context/CourseContext";
import { CourseHeader } from "~/ui/organisms";
import { TopicListItem } from "~/ui/molecules";
import { useUserProgress } from "~/context/UserContext";
import { HideCompletedToggle } from "~/ui/atoms";

export function meta({ params }: { params: { courseId: string } }) {
  return [{ title: `Course ${params.courseId} | Music Notebook` }];
}

export default function CourseRoute() {
  const { courseId } = useParams();
  const { getCourse, getTopics } = useCourseData();
  const { completedNodeIds, isTopicCompleted } = useUserProgress();

  // State for toggling completed topics
  const [hideCompleted, setHideCompleted] = useState(false);

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
    <Box>
      <Container maxWidth="lg">
        {/* Back Navigation */}
        <Box sx={{ py: 2 }}>
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
        />

        {/* Topics List Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" fontWeight="bold">
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

          {(() => {
            const completedTopicCount = topics.filter((topic) =>
              isTopicCompleted(topic.id)
            ).length;

            if (
              completedTopicCount === 0 ||
              (stats.total > 0 && stats.completed === stats.total)
            )
              return null;

            return (
              <HideCompletedToggle
                checked={hideCompleted}
                onChange={setHideCompleted}
                hiddenCount={completedTopicCount}
                showHiddenCount={
                  hideCompleted &&
                  !(stats.total > 0 && stats.completed === stats.total)
                }
              />
            );
          })()}
        </Box>

        {/* Topics List */}
        <Stack spacing={2} pb={12}>
          {topics.map((topic, index) => {
            const isCompleted = isTopicCompleted(topic.id);
            const total = topic.notebookOrder.length;
            const completed = topic.notebookOrder.filter((id) =>
              completedSet.has(id)
            ).length;

            // Determine if we should show this item
            const isVisible = !hideCompleted || !isCompleted;

            return (
              <Collapse key={topic.id} in={isVisible} unmountOnExit>
                <TopicListItem
                  topic={topic}
                  index={index}
                  totalNotebooks={total}
                  completedNotebooks={completed}
                />
              </Collapse>
            );
          })}

          {topics.length === 0 && (
            <Typography color="text.secondary" fontStyle="italic">
              No topics have been added to this course yet.
            </Typography>
          )}

          {/* Empty State when everything is hidden */}
          {hideCompleted &&
            topics.every((t) => isTopicCompleted(t.id)) &&
            topics.length > 0 && (
              <Box py={4} textAlign="center">
                <Typography color="text.secondary">
                  All topics are completed and hidden.
                </Typography>
                <Button onClick={() => setHideCompleted(false)} sx={{ mt: 1 }}>
                  Show completed topics
                </Button>
              </Box>
            )}
        </Stack>
      </Container>
    </Box>
  );
}
