import React, { createContext, useContext } from "react";
import type { Edge, Node } from "@xyflow/react";

import type { RoadmapNotebook } from "~/features/roadmap/model/notebook";
import type { TopicData } from "~/features/roadmap/model/topic";
import {
  EXAMPLE_ROADMAP_EDGES_INITIAL,
  EXAMPLE_ROADMAP_NODES_INITIAL,
  EXAMPLE_ROADMAP_UNLOCK_ORDER,
  getExampleRoadmapNotebook,
  isExampleRoadmapNotebookId,
} from "~/examples/roadmap/exampleRoadmapData";

export type RoadmapData = {
  nodesInitial: Node<TopicData>[];
  edgesInitial: Edge[];
  unlockOrder: readonly string[];
  isNotebookId: (id: string) => boolean;
  getNotebook: (id: string) => RoadmapNotebook | null;
};

const RoadmapDataContext = createContext<RoadmapData | undefined>(undefined);

export function RoadmapDataProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: RoadmapData;
}) {
  const defaultValue: RoadmapData = {
    nodesInitial: EXAMPLE_ROADMAP_NODES_INITIAL,
    edgesInitial: EXAMPLE_ROADMAP_EDGES_INITIAL,
    unlockOrder: EXAMPLE_ROADMAP_UNLOCK_ORDER as readonly string[],
    isNotebookId: isExampleRoadmapNotebookId,
    getNotebook: getExampleRoadmapNotebook,
  };

  return (
    <RoadmapDataContext.Provider value={value ?? defaultValue}>
      {children}
    </RoadmapDataContext.Provider>
  );
}

export function useRoadmapData(): RoadmapData {
  const ctx = useContext(RoadmapDataContext);
  if (!ctx) {
    throw new Error("useRoadmapData must be used within a RoadmapDataProvider");
  }
  return ctx;
}
