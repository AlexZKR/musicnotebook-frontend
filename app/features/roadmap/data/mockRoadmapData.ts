import type { Node } from "@xyflow/react";

import type { CourseDefinition } from "~/features/roadmap/model/course";
import type {
  Notebook,
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";
import type { RoadmapGraphData, Topic } from "~/features/roadmap/model/topic";

import { COMPOUND_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/compoundIntervalsLesson";
import { INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/musicalIntervalsLesson";
import { MUSICAL_NOTATION_LESSON } from "~/features/roadmap/data/notebooks/musicalNotationLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/simpleIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/features/roadmap/data/notebooks/tutorialContent";

export const ROADMAP_NOTEBOOK_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type RoadmapNotebookId = (typeof ROADMAP_NOTEBOOK_IDS)[number];

export const ROADMAP_NOTEBOOKS: Record<RoadmapNotebookId, Notebook> = {
  1: {
    id: 1,
    title: "Musical Notation I",
    blocks: MUSICAL_NOTATION_LESSON,
    trackProgress: true,
  },
  2: {
    id: 2,
    title: "Musical Notation II",
    blocks: MUSICAL_NOTATION_LESSON,
    trackProgress: true,
  },
  3: {
    id: 3,
    title: "Intervals Overview",
    blocks: INTERVALS_LESSON,
    trackProgress: true,
  },
  4: {
    id: 4,
    title: "Simple Intervals Practice",
    blocks: SIMPLE_INTERVALS_LESSON,
    trackProgress: true,
  },
  5: {
    id: 5,
    title: "Compound Intervals",
    blocks: COMPOUND_INTERVALS_LESSON,
    trackProgress: true,
  },
  6: {
    id: 6,
    title: "Intervals in Context",
    blocks: INTERVALS_LESSON,
    trackProgress: true,
  },
  7: {
    id: 7,
    title: "Rhythm Essentials",
    blocks: TUTORIAL_CONTENT,
    trackProgress: true,
  },
  8: {
    id: 8,
    title: "Rhythm Drills",
    blocks: TUTORIAL_CONTENT,
    trackProgress: true,
  },
  9: {
    id: 9,
    title: "Ear Training",
    blocks: SIMPLE_INTERVALS_LESSON,
    trackProgress: true,
  },
  10: {
    id: 10,
    title: "Improv Warmup",
    blocks: COMPOUND_INTERVALS_LESSON,
    trackProgress: false,
  },
};

export const ROADMAP_COURSES: CourseDefinition[] = [
  {
    id: 1,
    title: "Foundations",
    description: "Cover notation and high-level interval literacy.",
    topicOrder: [1, 2],
    authorId: "user-1",
  },
  {
    id: 2,
    title: "Intervals Deep Dive",
    description: "Practice interval fluency with melodic and harmonic drills.",
    topicOrder: [3, 4, 5, 6],
    authorId: "user-1",
  },
  {
    id: 3,
    title: "Applied Listening",
    description: "Apply the knowledge to rhythm and ear training.",
    topicOrder: [7, 8],
    authorId: "user-2",
  },
];

export const ROADMAP_GRAPH: RoadmapGraphData = {
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e6-7", source: "6", target: "7" },
  ],
  unlockOrder: ROADMAP_NOTEBOOK_IDS.slice(0, 8),
};

export const ROADMAP_TOPICS: Topic[] = [
  {
    id: 1,
    courseId: 1,
    title: "Musical Notation",
    subtitle: "Read sheets fluently",
    description: "Master staff, clefs, and the building blocks of notation.",
    position: { x: 220, y: 0 },
    notebookOrder: [1, 2],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 2,
    courseId: 1,
    title: "Intervals Basics",
    subtitle: "Identify key distances",
    description: "Learn interval names and recognize them on the staff.",
    position: { x: 220, y: 180 },
    notebookOrder: [3],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 3,
    courseId: 2,
    title: "Simple Interval Practice",
    subtitle: "Melodic leaps",
    description: "Hear and notate simple intervals cleanly.",
    position: { x: 100, y: 360 },
    notebookOrder: [4, 5],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 4,
    courseId: 2,
    title: "Compound Interval Practice",
    subtitle: "Extended leaps",
    description: "Work with 9ths, 11ths, and 13ths in real contexts.",
    position: { x: 320, y: 360 },
    notebookOrder: [6],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 5,
    courseId: 2,
    title: "Rhythm Essentials",
    subtitle: "Pulse & groove",
    description: "Map beats and subdivisions with confidence.",
    position: { x: 520, y: 360 },
    notebookOrder: [7, 8],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 6,
    courseId: 2,
    title: "Listening Lab",
    subtitle: "Ear training",
    description: "Detect intervals inside chords and melodies.",
    position: { x: 720, y: 360 },
    notebookOrder: [9],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 7,
    courseId: 3,
    title: "Improvisation Warmup",
    subtitle: "Apply the theory",
    description: "Practice creative responses using intervals and rhythm.",
    position: { x: 220, y: 540 },
    notebookOrder: [10],
    roadmapGraph: ROADMAP_GRAPH,
  },
  {
    id: 8,
    courseId: 3,
    title: "Performance Tips",
    subtitle: "Stay grounded",
    description: "Reflect on how to keep theory flowing on stage.",
    position: { x: 520, y: 540 },
    notebookOrder: [],
    roadmapGraph: ROADMAP_GRAPH,
  },
];

export const MOCK_USERS = [
  {
    id: "user-1",
    name: "Current Player",
    completedNotebookIds: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "user-2",
    name: "Fresh Learner",
    completedNotebookIds: [2, 5],
  },
];

export const MOCK_USER_CURRENT = MOCK_USERS[0];

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
        status:
          notebookId === ROADMAP_GRAPH.unlockOrder[0] ? "unlocked" : "locked",
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
