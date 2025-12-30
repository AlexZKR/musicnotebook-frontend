import React, { useEffect, useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import {
  Container,
  Box,
  Typography,
  Alert,
  Grid,
  Paper,
  Collapse,
  alpha,
  useTheme,
} from "@mui/material";
import { useNodesState, type Node } from "@xyflow/react";

import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import { TopicHeader } from "~/ui/organisms";
import { NotebookListItem, HideableCompletionList } from "~/ui/molecules";
import TopicGraph from "~/ui/organisms/topic/TopicGraph";

import type {
  Notebook,
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";

export function meta({
  params,
}: {
  params: { courseId: string; topicId: string };
}) {
  return [
    {
      title: `Course ${params.courseId} · Topic ${params.topicId} | Music Notebook`,
    },
  ];
}

export default function TopicRoute() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { getTopics, getNotebook, getGraphNodes, getGraphEdges } =
    useCourseData();
  const { completedNodeIds, getNodeStatus } = useUserProgress();

  // 1. Resolve Topic
  const courseIdInt = parseInt(courseId || "", 10);
  const topicIdInt = parseInt(topicId || "", 10);
  const courseTopics = useMemo(
    () => (Number.isNaN(courseIdInt) ? [] : getTopics(courseIdInt)),
    [getTopics, courseIdInt]
  );
  const topic = useMemo(
    () => courseTopics.find((t) => t.id === topicIdInt),
    [courseTopics, topicIdInt]
  );

  // 2. Resolve Notebooks (List Data)
  const notebooks = useMemo(() => {
    if (!topic) return [];
    return topic.notebookOrder
      .map((notebookId) => getNotebook(notebookId))
      .filter((n): n is Notebook => n !== null);
  }, [topic, getNotebook]);

  const completedSet = useMemo(
    () => new Set<NotebookId>(completedNodeIds),
    [completedNodeIds]
  );

  // 3. Resolve Graph Nodes (Graph Data)
  // Filter the global node list to only show nodes belonging to this topic
  const initialTopicNodes = useMemo(
    () => (topic ? getGraphNodes(topic.id) : []),
    [getGraphNodes, topic]
  );
  const initialTopicEdges = useMemo(
    () => (topic ? getGraphEdges(topic.id) : []),
    [getGraphEdges, topic]
  );

  // 4. Initialize React Flow State
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialTopicNodes as Node<NotebookNodeDefinition>[]
  );

  // 5. Sync Node Status (Locked/Completed) with User Progress
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: getNodeStatus(node.data.id),
        },
      }))
    );
  }, [completedNodeIds, getNodeStatus, setNodes]);

  // 6. Calculate Progress Stats
  const stats = useMemo(() => {
    const total = notebooks.length;
    const completedSet = new Set(completedNodeIds);
    const completed = notebooks.filter((n) => completedSet.has(n.id)).length;
    return { total, completed };
  }, [notebooks, completedNodeIds]);

  const handleNodeClick = (nodeId: number) => {
    navigate(`/course/${courseIdInt}/topic/${topicIdInt}/notebook/${nodeId}`);
  };

  if (isNaN(topicIdInt) || Number.isNaN(courseIdInt))
    return <Navigate to="/courses" />;
  if (!topic) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Topic not found.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
      <Box py={{ xs: 4, md: 5 }}>
        {/* Header Section */}
        <TopicHeader
          topic={topic}
          courseId={topic.courseId}
          completedCount={stats.completed}
          totalCount={stats.total}
        />

        <Grid container spacing={4} alignItems="stretch">
          {/* LEFT PANEL: Notebook List */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              variant="outlined"
              sx={{
                height: "100%",
                maxHeight: { lg: "800px" },
                overflowY: "auto",
                bgcolor: "transparent",
                border: "none",
              }}
            >
              <Box mb={2} px={1}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Lesson List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notebooks.length} interactive lessons in this module.
                </Typography>
              </Box>

              <HideableCompletionList
                items={notebooks}
                isItemCompleted={(notebook) => completedSet.has(notebook.id)}
                showToggle={completedSet.size > 0}
                spacing={2}
                emptyState={({ itemCount, hideCompleted }) =>
                  itemCount === 0 ? (
                    <Alert severity="info" variant="outlined">
                      No lessons available yet.
                    </Alert>
                  ) : hideCompleted ? (
                    <Alert severity="info" variant="outlined">
                      All lessons are completed and hidden.
                    </Alert>
                  ) : (
                    <Alert severity="info" variant="outlined">
                      No lessons match the current filter.
                    </Alert>
                  )
                }
                renderItem={(notebook, meta) => (
                  <Collapse key={notebook.id} in={!meta.isHidden} unmountOnExit>
                    <NotebookListItem
                      notebook={notebook}
                      index={meta.originalIndex}
                      status={getNodeStatus(notebook.id)}
                    />
                  </Collapse>
                )}
              />
            </Paper>
          </Grid>

          {/* RIGHT PANEL: Interactive Graph */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              variant="outlined"
              sx={{
                height: "600px",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                borderColor: "divider",
                boxShadow: theme.shadows[1],
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 20,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="overline"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Topic Map
                </Typography>
              </Box>

              <TopicGraph
                nodes={nodes}
                edges={initialTopicEdges}
                onNodesChange={onNodesChange}
                onNodeClick={(nodeId) => handleNodeClick(nodeId)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
