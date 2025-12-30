import type { Node } from "@xyflow/react";

import type { CourseDefinition } from "~/features/roadmap/model/course";
import type {
  Notebook,
  NotebookId,
  NotebookNodeDefinition,
  NodeStatus,
} from "~/features/roadmap/model/notebook";
import type { RoadmapGraphData, Topic } from "~/features/roadmap/model/topic";

import { COMPOUND_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/compoundIntervalsLesson";
import { INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/musicalIntervalsLesson";
import { MUSICAL_NOTATION_LESSON } from "~/features/roadmap/data/notebooks/musicalNotationLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/simpleIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/features/roadmap/data/notebooks/tutorialContent";

export const ROADMAP_NOTEBOOK_IDS = [1, 2, 3, 4, 5] as const;
export type RoadmapNotebookId = (typeof ROADMAP_NOTEBOOK_IDS)[number];

export const ROADMAP_NOTEBOOKS: Record<RoadmapNotebookId, Notebook> = {
  1: {
    id: 1,
    title: "Musical Notation",
    blocks: MUSICAL_NOTATION_LESSON,
    trackProgress: true,
  },
  2: {
    id: 2,
    title: "Intervals",
    blocks: INTERVALS_LESSON,
    trackProgress: true,
  },
  3: {
    id: 3,
    title: "Simple Intervals",
    blocks: SIMPLE_INTERVALS_LESSON,
    trackProgress: true,
  },
  4: {
    id: 4,
    title: "Compound Intervals",
    blocks: COMPOUND_INTERVALS_LESSON,
    trackProgress: true,
  },
  5: {
    id: 5,
    title: "Tutorial",
    blocks: TUTORIAL_CONTENT,
    trackProgress: false,
  },
};

export const ROADMAP_COURSES: CourseDefinition[] = [
  {
    id: 1,
    title: "Foundations",
    description:
      "Get comfortable with staves, clefs, and the relationship between notation and pitch.",
    topicOrder: [1, 2],
    authorId: "1",
  },
  {
    id: 2,
    title: "Interval Deep Dive",
    description:
      "Expand your interval vocabulary with focused practice on compound and simple leaps.",
    topicOrder: [3, 4],
    authorId: "2",
  },
];

export const ROADMAP_GRAPH: RoadmapGraphData = {
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
  ],
  unlockOrder: ROADMAP_NOTEBOOK_IDS.slice(0, 4),
};

export const ROADMAP_TOPICS: Topic[] = [
  {
    id: 1,
    courseId: 1,
    title: "Musical Notation",
    subtitle: "Staff, clefs & notes",
    description: "Understand how notation maps to pitch and rhythm.",
    position: { x: 250, y: 0 },
    notebookOrder: [1],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 2,
    courseId: 1,
    title: "Intervals",
    subtitle: "Distance between notes",
    description: "Measure melodic and harmonic distances between tones.",
    position: { x: 250, y: 150 },
    notebookOrder: [2],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 3,
    courseId: 2,
    title: "Simple Intervals",
    subtitle: "2nds, 3rds, 4ths",
    description: "Practice identifying and hearing small-scale intervals.",
    position: { x: 100, y: 300 },
    notebookOrder: [3],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 4,
    courseId: 2,
    title: "Compound Intervals",
    subtitle: "9ths, 11ths, 13ths",
    description: "Tackle wide intervals and extended range leaps.",
    position: { x: 400, y: 300 },
    notebookOrder: [4],
    roadmapGraph: ROADMAP_GRAPH,
  },
];

const getInitialStatus = (notebookId: NotebookId): NodeStatus =>
  notebookId === ROADMAP_GRAPH.unlockOrder[0] ? "unlocked" : "locked";

const buildRoadmapNodes = (): Node<NotebookNodeDefinition>[] =>
  ROADMAP_TOPICS.map((topic) => {
    const [notebookId] = topic.notebookOrder;
    return {
      id: `${notebookId}`,
      type: "notebook",
      position: topic.position,
      data: {
        id: notebookId,
        topicId: topic.id,
        title: topic.title,
        subtitle: topic.subtitle,
        description: topic.description,
        status: getInitialStatus(notebookId),
        position: topic.position,
      },
    };
  });

export const ROADMAP_NODES = buildRoadmapNodes();

export function isRoadmapNotebookId(
  value: unknown
): value is RoadmapNotebookId {
  return (
    typeof value === "number" &&
    ROADMAP_NOTEBOOK_IDS.includes(value as RoadmapNotebookId)
  );
}

export function getRoadmapNotebook(notebookId: NotebookId): Notebook | null {
  if (!isRoadmapNotebookId(notebookId)) return null;
  return ROADMAP_NOTEBOOKS[notebookId];
}
