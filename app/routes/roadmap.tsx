import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useNodesState, type Node } from "@xyflow/react";
import type { Route } from "./+types/roadmap";

import RoadmapGraph from "~/ui/organisms/RoadmapGraph";
import { useUserProgress } from "~/context/UserContext";
import { useRoadmapData } from "~/context/RoadmapDataContext";
import type { TopicData } from "~/features/roadmap/model/topic";

const JUST_COMPLETED_CLEAR_DELAY_MS = 3000;

type RoadmapLocationState = {
  justCompletedNotebookId?: string;
} | null;

export function meta({}: Route.MetaArgs) {
  return [{ title: "Roadmap | Music Notebook" }];
}

export default function RoadmapRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as RoadmapLocationState;

  const { completedNodeIds, getNodeStatus } = useUserProgress();
  const { nodesInitial } = useRoadmapData();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesInitial as Node<TopicData>[]
  );

  // Sync node statuses from UserContext progress.
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: getNodeStatus(node.id),
        },
      }))
    );
  }, [completedNodeIds, getNodeStatus, setNodes]);

  // Animate the node that was just completed (when we return from notebook).
  useEffect(() => {
    const justCompletedNotebookId = locationState?.justCompletedNotebookId;
    if (!justCompletedNotebookId) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== justCompletedNotebookId) return node;
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

    // Clear history state so refresh/back doesn't re-trigger.
    navigate(".", { replace: true, state: null });

    const timeoutId = window.setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== justCompletedNotebookId) return node;
          const { justCompleted, ...rest } = node.data;
          return { ...node, data: rest };
        })
      );
    }, JUST_COMPLETED_CLEAR_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [locationState?.justCompletedNotebookId, navigate, setNodes]);

  const handleNodeClick = (nodeId: string) => {
    navigate(`/notebook/${nodeId}`);
  };

  const handleTutorialClick = () => {
    navigate("/notebook/tutorial");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Your Roadmap</h1>
        <p className="text-gray-500">
          Explore the graph below. Click a topic to open its notebook.
        </p>
      </div>

      {/* Tutorial Banner */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-blue-100">
            🎓
          </div>
          <div>
            <h3 className="font-bold text-gray-900">New here?</h3>
            <p className="text-sm text-gray-600">
              Take the interactive tutorial to learn how to use the notebook
              features.
            </p>
          </div>
        </div>
        <button
          onClick={handleTutorialClick}
          className="whitespace-nowrap px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-200"
        >
          Start Tutorial
        </button>
      </div>

      <div className="grow min-h-[500px] border border-gray-200 rounded-2xl shadow-sm overflow-hidden relative">
        <RoadmapGraph
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeClick={(nodeId) => handleNodeClick(nodeId)}
        />
      </div>
    </div>
  );
}
