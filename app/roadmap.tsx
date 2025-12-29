import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

// --- Types ---
// FIX: Added [key: string]: unknown to satisfy ReactFlow's Record<string, unknown> constraint
export type TopicData = {
  title: string;
  subtitle: string;
  status: "locked" | "unlocked" | "completed";
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
      className={`px-4 py-3 rounded-xl border-2 min-w-[200px] transition-all duration-200 ${
        statusColors[data.status as "locked" | "unlocked" | "completed"]
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
          <span className="text-xs font-bold text-green-600 mb-1">✓ DONE</span>
        )}
        <strong className="text-sm font-bold uppercase tracking-wide">
          {data.title as string}
        </strong>
        <span className="text-xs opacity-80 mt-1">
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

// --- Initial Data ---
const initialNodes: Node<TopicData>[] = [
  {
    id: "1",
    type: "topic",
    position: { x: 250, y: 0 },
    data: {
      title: "Musical Notation",
      subtitle: "Staff, Clefs & Notes",
      status: "completed",
    },
  },
  {
    id: "2",
    type: "topic",
    position: { x: 250, y: 150 },
    data: {
      title: "Intervals",
      subtitle: "Distance between notes",
      status: "unlocked",
    },
  },
  {
    id: "2-1",
    type: "topic",
    position: { x: 100, y: 300 },
    data: {
      title: "Simple Intervals",
      subtitle: "2nds, 3rds, 4ths",
      status: "unlocked", // Changed from locked to unlocked
    },
  },
  {
    id: "2-2",
    type: "topic",
    position: { x: 400, y: 300 },
    data: {
      title: "Compound Intervals",
      subtitle: "9ths, 11ths, 13ths",
      status: "unlocked", // Changed from locked to unlocked
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-2-1", source: "2", target: "2-1" },
  { id: "e2-2-2", source: "2", target: "2-2" },
];

interface RoadmapProps {
  onNodeClick: (nodeId: string, title: string) => void;
}

export default function Roadmap({ onNodeClick }: RoadmapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Cast node.data to TopicData to safely access properties
      const topicData = node.data as TopicData;

      // Only allow clicking if not locked
      if (topicData.status !== "locked") {
        onNodeClick(node.id, topicData.title);
      }
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-[80vh] border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
