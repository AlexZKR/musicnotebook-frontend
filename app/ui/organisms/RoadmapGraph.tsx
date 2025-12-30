import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  type Node,
  type OnNodesChange,
  type Edge,
} from "@xyflow/react";
import { alpha, Paper, useTheme } from "@mui/material";
import NotebookNode from "~/ui/molecules/roadmap/NotebookNode";
import type {
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";
import { useColorMode } from "~/context/ThemeContext";

const NODE_TYPES = {
  notebook: NotebookNode,
};

export type RoadmapGraphProps = {
  nodes: Node<NotebookNodeDefinition>[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node<NotebookNodeDefinition>>;
  onNodeClick: (nodeId: NotebookId, title: string) => void;
};

export default function RoadmapGraph({
  nodes,
  edges,
  onNodesChange,
  onNodeClick,
}: RoadmapGraphProps) {
  const theme = useTheme();
  const { mode } = useColorMode();

  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setFlowEdges(edges);
  }, [edges, setFlowEdges]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<NotebookNodeDefinition>) => {
      const notebookData = node.data;

      if (notebookData.status !== "locked") {
        onNodeClick(notebookData.id, notebookData.title);
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
        overflow: "visible",
        bgcolor: "background.default",
        position: "relative",
        boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.06)",
      }}
    >
      <ReactFlow
        style={{ width: "100%", height: "100%" }}
        nodes={nodes}
        edges={flowEdges}
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
