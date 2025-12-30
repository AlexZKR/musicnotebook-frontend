import type { Edge, Node } from "@xyflow/react";

import type { Notebook, NotebookId, NotebookNodeDefinition } from "./notebook";

export type RoadmapData = {
  nodes: Node<NotebookNodeDefinition>[];
  edges: Edge[];
  unlockOrder: readonly NotebookId[];
  isNotebookId: (id: NotebookId) => boolean;
  getNotebook: (id: NotebookId) => Notebook | null;
};
