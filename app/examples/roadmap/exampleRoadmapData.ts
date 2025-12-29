import type { Edge, Node } from "@xyflow/react";

import type { BlockData } from "~/features/notebook/model/block";
import type { TopicData } from "~/features/roadmap/model/topic";

import { MUSICAL_NOTATION_LESSON } from "~/examples/roadmapNotebooks/musicalNotaionLesson";
import { INTERVALS_LESSON } from "~/examples/roadmapNotebooks/musicalIntervalsLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/examples/roadmapNotebooks/simpleIntervalsLesson";
import { COMPOUND_INTERVALS_LESSON } from "~/examples/roadmapNotebooks/compoundIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/examples/roadmapNotebooks/tutorialContent";

export const EXAMPLE_ROADMAP_NOTEBOOK_IDS = [
  "1",
  "2",
  "2-1",
  "2-2",
  "tutorial",
] as const;
export type ExampleRoadmapNotebookId =
  (typeof EXAMPLE_ROADMAP_NOTEBOOK_IDS)[number];

export const EXAMPLE_ROADMAP_UNLOCK_ORDER: readonly ExampleRoadmapNotebookId[] =
  ["1", "2", "2-1", "2-2"];

export type ExampleRoadmapNotebookDefinition = {
  id: ExampleRoadmapNotebookId;
  title: string;
  blocks: BlockData[];
  trackProgress: boolean;
};

const EXAMPLE_NOTEBOOKS: Record<
  ExampleRoadmapNotebookId,
  ExampleRoadmapNotebookDefinition
> = {
  "1": {
    id: "1",
    title: "Musical Notation",
    blocks: MUSICAL_NOTATION_LESSON,
    trackProgress: true,
  },
  "2": {
    id: "2",
    title: "Intervals",
    blocks: INTERVALS_LESSON,
    trackProgress: true,
  },
  "2-1": {
    id: "2-1",
    title: "Simple Intervals",
    blocks: SIMPLE_INTERVALS_LESSON,
    trackProgress: true,
  },
  "2-2": {
    id: "2-2",
    title: "Compound Intervals",
    blocks: COMPOUND_INTERVALS_LESSON,
    trackProgress: true,
  },
  tutorial: {
    id: "tutorial",
    title: "Tutorial",
    blocks: TUTORIAL_CONTENT,
    trackProgress: false,
  },
};

export function isExampleRoadmapNotebookId(
  value: string
): value is ExampleRoadmapNotebookId {
  return (EXAMPLE_ROADMAP_NOTEBOOK_IDS as readonly string[]).includes(value);
}

export function getExampleRoadmapNotebook(
  notebookId: string
): ExampleRoadmapNotebookDefinition | null {
  if (!isExampleRoadmapNotebookId(notebookId)) return null;
  return EXAMPLE_NOTEBOOKS[notebookId];
}

// Initial layout; statuses are filled from user progress at runtime.
export const EXAMPLE_ROADMAP_NODES_INITIAL: Node<TopicData>[] = [
  {
    id: "1",
    type: "topic",
    position: { x: 250, y: 0 },
    data: {
      title: "Musical Notation",
      subtitle: "Staff, Clefs & Notes",
      status: "unlocked",
    },
  },
  {
    id: "2",
    type: "topic",
    position: { x: 250, y: 150 },
    data: {
      title: "Intervals",
      subtitle: "Distance between notes",
      status: "locked",
    },
  },
  {
    id: "2-1",
    type: "topic",
    position: { x: 100, y: 300 },
    data: {
      title: "Simple Intervals",
      subtitle: "2nds, 3rds, 4ths",
      status: "locked",
    },
  },
  {
    id: "2-2",
    type: "topic",
    position: { x: 400, y: 300 },
    data: {
      title: "Compound Intervals",
      subtitle: "9ths, 11ths, 13ths",
      status: "locked",
    },
  },
];

export const EXAMPLE_ROADMAP_EDGES_INITIAL: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-2-1", source: "2", target: "2-1" },
  { id: "e2-2-2", source: "2", target: "2-2" },
];
