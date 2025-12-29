import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  type Node,
  type OnNodesChange,
} from "@xyflow/react";
import { alpha, Paper, useTheme } from "@mui/material";
import TopicNode from "~/ui/molecules/TopicNode";
import { useRoadmapData } from "~/context/RoadmapDataContext";
import type { TopicData } from "~/features/roadmap/model/topic";
import { useColorMode } from "~/context/ThemeContext";

const NODE_TYPES = {
  topic: TopicNode,
};

export type RoadmapGraphProps = {
  nodes: Node<TopicData>[];
  onNodesChange: OnNodesChange<Node<TopicData>>;
  onNodeClick: (nodeId: string, title: string) => void;
};

export default function RoadmapGraph({
  nodes,
  onNodesChange,
  onNodeClick,
}: RoadmapGraphProps) {
  const theme = useTheme();
  const { mode } = useColorMode();

  const { edgesInitial } = useRoadmapData();
  const [edges, , onEdgesChange] = useEdgesState(edgesInitial);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const topicData = node.data as TopicData;

      if (topicData.status !== "locked") {
        onNodeClick(node.id, topicData.title);
      }
    },
    [onNodeClick]
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        height: "80vh",
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        bgcolor: "background.default",
        position: "relative",
        boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.06)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NODE_TYPES}
        onNodeClick={handleNodeClick}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.5}
        maxZoom={2}
        colorMode={mode}
      >
        <Controls
          className="touch-manipulation"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
          }}
        />
        <MiniMap
          zoomable
          pannable
          className="hidden sm:block"
          style={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
          }}
          maskColor={
            mode === "dark"
              ? alpha(theme.palette.common.black, 0.3)
              : alpha(theme.palette.common.white, 0.7)
          }
          nodeColor={(n) => {
            if (n.data?.status === "completed")
              return theme.palette.success.main;
            if (n.data?.status === "unlocked")
              return theme.palette.primary.main;
            return theme.palette.divider;
          }}
        />
        <Background
          gap={12}
          size={1}
          // Sync dot color with the theme
          color={mode === "dark" ? theme.palette.primary.dark : "#ccc"}
        />
      </ReactFlow>
    </Paper>
  );
}
