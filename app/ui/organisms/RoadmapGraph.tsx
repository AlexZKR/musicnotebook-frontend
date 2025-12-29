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

import TopicNode from "~/ui/molecules/TopicNode";
import { useRoadmapData } from "~/context/RoadmapDataContext";
import type { TopicData } from "~/features/roadmap/model/topic";

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
  const { edgesInitial } = useRoadmapData();
  const [edges, , onEdgesChange] = useEdgesState(edgesInitial);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const topicData = node.data as TopicData;

      // Only allow clicking if not locked
      if (topicData.status !== "locked") {
        onNodeClick(node.id, topicData.title);
      }
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-[80vh] border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
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
      >
        <Controls className="touch-manipulation" />
        <MiniMap zoomable pannable className="hidden sm:block" />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
