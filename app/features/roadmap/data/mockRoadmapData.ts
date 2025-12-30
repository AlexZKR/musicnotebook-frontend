import type { Node } from "@xyflow/react";

import type { CourseDefinition } from "~/features/roadmap/model/course";
import type {
  Notebook,
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";
import type { Topic, TopicGraphData } from "~/features/roadmap/model/topic";

import { COMPOUND_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/compoundIntervalsLesson";
import { INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/musicalIntervalsLesson";
import { MUSICAL_NOTATION_LESSON } from "~/features/roadmap/data/notebooks/musicalNotationLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/features/roadmap/data/notebooks/simpleIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/features/roadmap/data/notebooks/tutorialContent";

const lessonLibrary = [
  MUSICAL_NOTATION_LESSON,
  INTERVALS_LESSON,
  SIMPLE_INTERVALS_LESSON,
  COMPOUND_INTERVALS_LESSON,
  TUTORIAL_CONTENT,
];

export const ROADMAP_NOTEBOOK_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;
export type RoadmapNotebookId = (typeof ROADMAP_NOTEBOOK_IDS)[number];

const notebookDefinitions = [
  { id: 1, title: "Clefs & Staff Basics", lessonIndex: 0 },
  { id: 2, title: "Ledger Lines & Rests", lessonIndex: 0 },
  { id: 3, title: "Interval Listening I", lessonIndex: 1 },
  { id: 4, title: "Interval Listening II", lessonIndex: 1 },
  { id: 5, title: "Simple Interval Practice", lessonIndex: 2 },
  { id: 6, title: "Compound Interval Practice", lessonIndex: 3 },
  { id: 7, title: "Chordal Interval Mapping", lessonIndex: 3 },
  { id: 8, title: "Rhythm Fundamentals", lessonIndex: 4 },
  { id: 9, title: "Rhythm In Motion", lessonIndex: 4 },
  { id: 10, title: "Live Ear Training", lessonIndex: 1 },
  { id: 11, title: "Improvisation Warmup", lessonIndex: 3 },
  { id: 12, title: "Performance Techniques", lessonIndex: 4 },
] as const;

export const ROADMAP_NOTEBOOKS: Record<NotebookId, Notebook> =
  Object.fromEntries(
    notebookDefinitions.map(({ id, title, lessonIndex }) => [
      id,
      {
        id,
        title,
        blocks: lessonLibrary[lessonIndex],
        trackProgress: true,
      },
    ])
  ) as Record<RoadmapNotebookId, Notebook>;

export const ROADMAP_COURSES: CourseDefinition[] = [
  {
    id: 1,
    authorId: "user-1",
    title: "Notation Foundations",
    description:
      "Read sheets with confidence and move through clefs with ease.",
    topicOrder: [1, 2],
  },
  {
    id: 2,
    authorId: "user-1",
    title: "Intervals & Harmony",
    description: "Hear how intervals function inside chords and melodies.",
    topicOrder: [3, 4],
  },
  {
    id: 3,
    authorId: "user-2",
    title: "Applied Rhythm & Listening",
    description: "Connect time, feel, and improvisation to theory.",
    topicOrder: [5, 6],
  },
];

type TopicDefinition = Omit<Topic, "topicGraph">;

const topicBases: TopicDefinition[] = [
  {
    id: 1,
    courseId: 1,
    title: "Clef & Staff Literacy",
    subtitle: "Clefs, ledger lines, and positioning.",
    description:
      "Trace notes across treble, bass, and alto clefs with confidence.",
    position: { x: 180, y: 0 },
    notebookOrder: [1, 2],
  },
  {
    id: 2,
    courseId: 1,
    title: "Interval Basics",
    subtitle: "Steps & leaps",
    description: "Reference seconds, thirds, and fourths inside melodies.",
    position: { x: 220, y: 200 },
    notebookOrder: [3, 4, 5],
  },
  {
    id: 3,
    courseId: 2,
    title: "Harmony in Motion",
    subtitle: "Chordal intervals",
    description:
      "Stack intervals to build triads, sevenths, and inversion shapes.",
    position: { x: 120, y: 360 },
    notebookOrder: [6, 7],
  },
  {
    id: 4,
    courseId: 2,
    title: "Live Ear Examples",
    subtitle: "Ear training demo",
    description: "Trace interval movement inside recordings and melodies.",
    position: { x: 320, y: 360 },
    notebookOrder: [10, 11],
  },
  {
    id: 5,
    courseId: 3,
    title: "Rhythmic Foundations",
    subtitle: "Pulse & subdivision",
    description: "Feel grooves, odd meters, and expressive accents.",
    position: { x: 520, y: 360 },
    notebookOrder: [8, 9],
  },
  {
    id: 6,
    courseId: 3,
    title: "Applied Performance",
    subtitle: "Improvisation & stage craft",
    description: "Use rhythm and intervals to deliver confident performances.",
    position: { x: 520, y: 540 },
    notebookOrder: [12],
  },
];

const buildTopicGraph = (topic: TopicDefinition): TopicGraphData => {
  const nodes: Node<NotebookNodeDefinition>[] = topic.notebookOrder.map(
    (notebookId, index) => {
      const notebook = ROADMAP_NOTEBOOKS[notebookId];
      const horizontalOffset =
        (index - (topic.notebookOrder.length - 1) / 2) * 90;
      const nodePosition = {
        x: topic.position.x + horizontalOffset,
        y: topic.position.y + index * 30,
      };

      return {
        id: `topic-${topic.id}-node-${notebookId}`,
        type: "notebook",
        position: nodePosition,
        data: {
          id: notebookId,
          topicId: topic.id,
          title: notebook.title,
          subtitle: topic.subtitle,
          description: topic.description,
          status: index === 0 ? "unlocked" : "locked",
          position: nodePosition,
        },
      };
    }
  );

  const edges = nodes.slice(1).map((node, index) => ({
    id: `topic-${topic.id}-edge-${index}`,
    source: nodes[index].id,
    target: node.id,
    animated: true,
  }));

  return {
    nodes,
    edges,
  };
};

export const ROADMAP_TOPICS: Topic[] = topicBases.map((base) => ({
  ...base,
  topicGraph: buildTopicGraph(base),
}));

export const MOCK_USERS = [
  {
    id: "user-1",
    name: "Current Player",
    completedNotebookIds: [1, 2, 3, 4, 5, 6, 7, 10],
  },
  {
    id: "user-2",
    name: "Fresh Learner",
    completedNotebookIds: [2, 5, 8],
  },
];

export const MOCK_USER_CURRENT = MOCK_USERS[0];

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
