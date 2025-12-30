import React, { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Alert,
  Grid,
  Paper,
  Collapse,
  alpha,
  useTheme,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
} from "~/features/theory/model/notebook";

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
  const [showTutorialBadge, setShowTutorialBadge] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("tutorialBadgeDismissed");
  });

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
    navigate(`/notebook/${nodeId}`);
  };

  if (isNaN(topicIdInt) || Number.isNaN(courseIdInt))
    return <Navigate to="/courses" />;
  if (!topic) {
    return (
      <Box sx={{ py: 8 }}>
        <Alert severity="error">Topic not found.</Alert>
      </Box>
    );
  }

  const handleTutorialLaunch = () => {
    navigate(`/notebook/1`);
  };

  const dismissTutorialBadge = () => {
    localStorage.setItem("tutorialBadgeDismissed", "1");
    setShowTutorialBadge(false);
  };

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
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Section */}
        <TopicHeader
          topic={topic}
          courseId={topic.courseId}
          completedCount={stats.completed}
          totalCount={stats.total}
          variant="compact"
        />
        {showTutorialBadge && (
          <Box mb={2} display="flex" justifyContent="center">
            <Chip
              label="Try the tutorial notebook"
              color="primary"
              onClick={handleTutorialLaunch}
              onDelete={dismissTutorialBadge}
              deleteIcon={<CloseIcon fontSize="small" />}
            />
          </Box>
        )}

        <Grid
          container
          spacing={2}
          alignItems="stretch"
          sx={{ flex: 1, minHeight: 0 }}
        >
          {/* LEFT PANEL: Notebook List */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              variant="outlined"
              sx={{
                height: "100%",
                minHeight: 0,
                overflow: "hidden",
                bgcolor: "transparent",
                border: "none",
                display: "flex",
                flexDirection: "column",
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

              <Box sx={{ flex: 1, minHeight: 0 }}>
                <HideableCompletionList
                  items={notebooks}
                  isItemCompleted={(notebook) => completedSet.has(notebook.id)}
                  showToggle={completedSet.size > 0}
                  spacing={2}
                  maxHeight="100%"
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
                    <Collapse
                      key={notebook.id}
                      in={!meta.isHidden}
                      unmountOnExit
                    >
                      <NotebookListItem
                        notebook={notebook}
                        index={meta.originalIndex}
                        status={getNodeStatus(notebook.id)}
                      />
                    </Collapse>
                  )}
                />
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT PANEL: Interactive Graph */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              variant="outlined"
              sx={{
                height: "100%",
                minHeight: 0,
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
    </Box>
  );
}
