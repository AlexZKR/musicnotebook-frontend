import React from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import type { TopicData, TopicStatus } from "~/features/roadmap/model/topic";

const STATUS_COLORS: Record<TopicStatus, string> = {
  locked: "bg-gray-100 border-gray-300 text-gray-400",
  unlocked:
    "bg-white border-blue-500 shadow-md text-gray-800 hover:ring-2 ring-blue-200 cursor-pointer",
  completed: "bg-green-50 border-green-500 shadow-sm text-green-900",
};

export default function TopicNode({
  data,
  isConnectable,
}: NodeProps<Node<TopicData>>) {
  return (
    <div
      className={`px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 min-w-[160px] sm:min-w-[200px] transition-all duration-700 ${
        STATUS_COLORS[data.status]
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
        className="bg-gray-400! w-3! h-3!"
      />

      <div className="flex flex-col items-center text-center">
        {data.status === "completed" && (
          <span className="text-[10px] sm:text-xs font-bold text-green-600 mb-1 animate-in fade-in zoom-in duration-500">
            ✓ DONE
          </span>
        )}
        <strong className="text-xs sm:text-sm font-bold uppercase tracking-wide">
          {data.title}
        </strong>
        <span className="text-[10px] sm:text-xs opacity-80 mt-0.5 sm:mt-1">
          {data.subtitle}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="bg-gray-400! w-3! h-3!"
      />
    </div>
  );
}
