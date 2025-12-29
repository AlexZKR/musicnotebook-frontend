import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  type Node,
  type Edge,
  Handle,
  Position,
  type NodeProps,
  type OnNodesChange,
} from "@xyflow/react";

// --- Types ---
export type TopicData = {
  title: string;
  subtitle: string;
  status: "locked" | "unlocked" | "completed";
  justCompleted?: boolean; // New flag for animation
  [key: string]: unknown;
};

// --- Custom Node Component ---
const TopicNode = ({ data, isConnectable }: NodeProps<Node<TopicData>>) => {
  const statusColors = {
    locked: "bg-gray-100 border-gray-300 text-gray-400",
    unlocked:
      "bg-white border-blue-500 shadow-md text-gray-800 hover:ring-2 ring-blue-200 cursor-pointer",
    completed: "bg-green-50 border-green-500 shadow-sm text-green-900",
  };

  return (
    <div
      className={`px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 min-w-[160px] sm:min-w-[200px] transition-all duration-700 ${
        statusColors[data.status as "locked" | "unlocked" | "completed"]
      } ${
        data.justCompleted
          ? "scale-110 ring-4 ring-green-400 shadow-xl shadow-green-200"
          : "scale-100"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-gray-400 !w-3 !h-3"
      />

      <div className="flex flex-col items-center text-center">
        {data.status === "completed" && (
          <span className="text-[10px] sm:text-xs font-bold text-green-600 mb-1 animate-in fade-in zoom-in duration-500">
            ✓ DONE
          </span>
        )}
        <strong className="text-xs sm:text-sm font-bold uppercase tracking-wide">
          {data.title as string}
        </strong>
        <span className="text-[10px] sm:text-xs opacity-80 mt-0.5 sm:mt-1">
          {data.subtitle as string}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-gray-400 !w-3 !h-3"
      />
    </div>
  );
};

const nodeTypes = {
  topic: TopicNode,
};

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-2-1", source: "2", target: "2-1" },
  { id: "e2-2-2", source: "2", target: "2-2" },
];

interface RoadmapProps {
  nodes: Node<TopicData>[];
  onNodesChange: OnNodesChange<Node<TopicData>>;
  onNodeClick: (nodeId: string, title: string) => void;
}

export default function Roadmap({
  nodes,
  onNodesChange,
  onNodeClick,
}: RoadmapProps) {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
        nodeTypes={nodeTypes}
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
