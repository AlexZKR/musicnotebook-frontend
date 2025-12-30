import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  Panel, // 👈 Added Panel import
  useEdgesState,
  type Node,
  type OnNodesChange,
  type Edge,
} from "@xyflow/react";
import { alpha, Box, useTheme } from "@mui/material";
import NotebookNode from "~/ui/molecules/topicGraph/NotebookNode";
import type {
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/theory/model/notebook";
import { useColorMode } from "~/context/ThemeContext";

const NODE_TYPES = {
  notebook: NotebookNode,
};

export type TopicGraphProps = {
  nodes: Node<NotebookNodeDefinition>[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node<NotebookNodeDefinition>>;
  onNodeClick: (nodeId: NotebookId, title: string) => void;
};

export default function TopicGraph({
  nodes,
  edges,
  onNodesChange,
  onNodeClick,
}: TopicGraphProps) {
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
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
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
        {/* 1. Background goes first (bottom layer) */}
        <Background
          gap={12}
          size={1}
          color={mode === "dark" ? theme.palette.primary.dark : "#ccc"}
        />

        {/* 2. Controls wrapped in Panel with high Z-Index */}
        <Panel
          position="bottom-left"
          style={{ zIndex: 100, marginBottom: 16, marginLeft: 16 }}
        >
          <Controls
            className="touch-manipulation"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[2],
              display: "flex",
            }}
          />
        </Panel>

        {/* 3. MiniMap wrapped in Panel with high Z-Index */}
        <Panel
          position="bottom-right"
          style={{ zIndex: 100, marginBottom: 16, marginRight: 16 }}
        >
          <MiniMap
            zoomable
            pannable
            style={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[2],
              height: 120, // Explicit height ensures visibility
              width: 180, // Explicit width
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
        </Panel>
      </ReactFlow>
    </Box>
  );
}
