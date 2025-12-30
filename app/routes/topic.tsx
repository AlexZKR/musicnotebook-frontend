import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useNodesState, type Node } from "@xyflow/react";

import RoadmapGraph from "~/ui/organisms/RoadmapGraph";
import { useCourseData } from "~/context/CourseContext";
import { useUserProgress } from "~/context/UserContext";
import type {
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";
import { Paper, Stack, Typography } from "@mui/material";
import Banner from "~/ui/atoms/Banner";

const JUST_COMPLETED_CLEAR_DELAY_MS = 3000;

type TopicLocationState = {
  justCompletedNotebookId?: NotebookId;
} | null;

export function meta() {
  return [{ title: "Topic | Music Notebook" }];
}

export default function TopicRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as TopicLocationState;

  const { completedNodeIds, getNodeStatus } = useUserProgress();
  const { getGraphNodes } = useCourseData();
  const topicNodes = useMemo(() => getGraphNodes(), [getGraphNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    topicNodes as Node<NotebookNodeDefinition>[]
  );

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

  useEffect(() => {
    const justCompletedNotebookId = locationState?.justCompletedNotebookId;
    if (!justCompletedNotebookId) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.id !== justCompletedNotebookId) return node;
        return {
          ...node,
          data: {
            ...node.data,
            status: "completed",
            justCompleted: true,
          },
        };
      })
    );

    navigate(".", { replace: true, state: null });

    const timeoutId = window.setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.data.id !== justCompletedNotebookId) return node;
          const { justCompleted: _, ...rest } = node.data;
          return { ...node, data: rest };
        })
      );
    }, JUST_COMPLETED_CLEAR_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [locationState?.justCompletedNotebookId, navigate, setNodes]);

  const handleNodeClick = (nodeId: NotebookId) => {
    navigate(`/notebook/${nodeId}`);
  };

  const handleTutorialClick = () => {
    navigate("/notebook/tutorial");
  };

  return (
    <Stack spacing={4}>
      <Stack alignContent={"center"} alignItems={"center"}>
        <Typography variant="h3">Your Roadmap</Typography>
        <Typography variant="subtitle1">
          Explore the graph below. Click a topic to open its notebook.
        </Typography>
      </Stack>

      <Banner
        icon="🎓"
        title="New here?"
        description="Take the interactive tutorial to learn how to use the notebook features."
        actionLabel="Start Tutorial"
        onActionClick={handleTutorialClick}
      />

      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          minHeight: 500,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          boxShadow: 1,
        }}
      >
        <RoadmapGraph
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeClick={(nodeId) => handleNodeClick(nodeId)}
        />
      </Paper>
    </Stack>
  );
}
