import type { CourseDefinition } from "~/features/theory/model/course";
import type { Notebook, NotebookId } from "~/features/theory/model/notebook";
import type { Topic } from "~/features/theory/model/topic";
import type { BlockData } from "~/features/notebook/model/block";

// Import real lesson content
import { MUSICAL_NOTATION_LESSON } from "~/features/theory/data/notebooks/musicalNotationLesson";
import { INTERVALS_LESSON } from "~/features/theory/data/notebooks/musicalIntervalsLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/features/theory/data/notebooks/simpleIntervalsLesson";
import { COMPOUND_INTERVALS_LESSON } from "~/features/theory/data/notebooks/compoundIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/features/theory/data/notebooks/tutorialContent";

// --- 1. NOTEBOOK CONTENT (DATABASE) ---

const getPlaceholderContent = (title: string): BlockData[] => [
  {
    id: `ph-text-${crypto.randomUUID()}`,
    type: "text",
    content: `# ${title}\n\nThis is a placeholder lesson for **${title}**. \n\nIn a real application, this would contain specific curriculum content, exercises, and examples.`,
    isLocked: true,
  },
  {
    id: `ph-music-${crypto.randomUUID()}`,
    type: "music",
    content: `T: Exercise\nM: 4/4\nL: 1/4\nK: C\nC D E F | G A B c |]`,
    isLocked: false,
  },
];

export const ROADMAP_NOTEBOOKS: Record<NotebookId, Notebook> = {
  // --- Course 1: Foundations ---
  101: {
    id: 101,
    title: "The Grand Staff",
    trackProgress: true,
    blocks: MUSICAL_NOTATION_LESSON,
  },
  102: {
    id: 102,
    title: "Treble Clef Details",
    trackProgress: true,
    blocks: getPlaceholderContent("Treble Clef"),
  },
  103: {
    id: 103,
    title: "Bass Clef Essentials",
    trackProgress: true,
    blocks: getPlaceholderContent("Bass Clef"),
  },
  104: {
    id: 104,
    title: "Ledger Lines",
    trackProgress: true,
    blocks: getPlaceholderContent("Ledger Lines"),
  },

  110: {
    id: 110,
    title: "The Pulse",
    trackProgress: true,
    blocks: getPlaceholderContent("Pulse"),
  },
  111: {
    id: 111,
    title: "Quarter Notes & Rests",
    trackProgress: true,
    blocks: getPlaceholderContent("Quarters & Rests"),
  },
  112: {
    id: 112,
    title: "Time Signatures (4/4)",
    trackProgress: true,
    blocks: getPlaceholderContent("Time Signatures"),
  },
  113: {
    id: 113,
    title: "Ties and Dots",
    trackProgress: true,
    blocks: getPlaceholderContent("Ties and Dots"),
  },

  // --- Course 2: Harmony ---
  201: {
    id: 201,
    title: "What is an Interval?",
    trackProgress: true,
    blocks: INTERVALS_LESSON,
  },
  202: {
    id: 202,
    title: "Simple Intervals",
    trackProgress: true,
    blocks: SIMPLE_INTERVALS_LESSON,
  },
  203: {
    id: 203,
    title: "Perfect Consonance",
    trackProgress: true,
    blocks: getPlaceholderContent("Perfect Consonance"),
  },
  204: {
    id: 204,
    title: "Major vs Minor 3rds",
    trackProgress: true,
    blocks: getPlaceholderContent("Major vs Minor"),
  },

  210: {
    id: 210,
    title: "Compound Intervals",
    trackProgress: true,
    blocks: COMPOUND_INTERVALS_LESSON,
  },
  211: {
    id: 211,
    title: "Tension: The Tritone",
    trackProgress: true,
    blocks: getPlaceholderContent("The Tritone"),
  },
  212: {
    id: 212,
    title: "Inverting Intervals",
    trackProgress: true,
    blocks: getPlaceholderContent("Inversions"),
  },

  220: {
    id: 220,
    title: "Building Major Triads",
    trackProgress: true,
    blocks: getPlaceholderContent("Major Triads"),
  },
  221: {
    id: 221,
    title: "Building Minor Triads",
    trackProgress: true,
    blocks: getPlaceholderContent("Minor Triads"),
  },
  222: {
    id: 222,
    title: "Diminished Chords",
    trackProgress: true,
    blocks: getPlaceholderContent("Diminished Chords"),
  },
  223: {
    id: 223,
    title: "Augmented Chords",
    trackProgress: true,
    blocks: getPlaceholderContent("Augmented Chords"),
  },

  // --- Course 3: Rhythm ---
  301: {
    id: 301,
    title: "Eighth Notes",
    trackProgress: true,
    blocks: getPlaceholderContent("Eighth Notes"),
  },
  302: {
    id: 302,
    title: "Sixteenth Notes",
    trackProgress: true,
    blocks: getPlaceholderContent("Sixteenth Notes"),
  },
  303: {
    id: 303,
    title: "The Backbeat",
    trackProgress: true,
    blocks: getPlaceholderContent("Backbeat"),
  },

  310: {
    id: 310,
    title: "Swing Feel",
    trackProgress: true,
    blocks: getPlaceholderContent("Swing Feel"),
  },
  311: {
    id: 311,
    title: "Syncopation",
    trackProgress: true,
    blocks: getPlaceholderContent("Syncopation"),
  },
  312: {
    id: 312,
    title: "Polyrhythms Intro",
    trackProgress: true,
    blocks: getPlaceholderContent("Polyrhythms"),
  },
  313: {
    id: 313,
    title: "3 over 2",
    trackProgress: true,
    blocks: getPlaceholderContent("3 over 2"),
  },

  // --- Tutorial ---
  999: {
    id: 999,
    title: "Interactive Tutorial",
    trackProgress: true,
    blocks: TUTORIAL_CONTENT,
  },
};

export const ROADMAP_NOTEBOOK_IDS = Object.keys(ROADMAP_NOTEBOOKS).map(Number);
export type RoadmapNotebookId = number;

// --- 2. TOPICS (API RESPONSES) ---

// CONSTANTS FOR LAYOUT
const Y_BASELINE = 100;
const X_START = 50;
const X_GAP = 280;

export const ROADMAP_TOPICS: Topic[] = [
  // --- COURSE 1: FOUNDATIONS (FULLY COMPLETED) ---
  {
    id: 10,
    courseId: 1,
    title: "Pitch & Notation",
    subtitle: "The Language of Music",
    description:
      "Navigate the Grand Staff, understand Clefs, and learn how to communicate musical ideas.",
    position: { x: 0, y: 0 },
    notebookOrder: [101, 102, 103, 104],
    topicGraph: {
      nodes: [
        {
          id: "t10-n101",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 101,
            topicId: 10,
            title: "The Grand Staff",
            subtitle: "Lesson 1",
            status: "completed",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t10-n102",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 102,
            topicId: 10,
            title: "Treble Clef",
            subtitle: "Lesson 2",
            status: "completed",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t10-n103",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 103,
            topicId: 10,
            title: "Bass Clef",
            subtitle: "Lesson 3",
            status: "completed",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
        {
          id: "t10-n104",
          type: "notebook",
          position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          data: {
            id: 104,
            topicId: 10,
            title: "Ledger Lines",
            subtitle: "Lesson 4",
            status: "completed",
            position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-101-102",
          source: "t10-n101",
          target: "t10-n102",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-102-103",
          source: "t10-n102",
          target: "t10-n103",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-103-104",
          source: "t10-n103",
          target: "t10-n104",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },
  {
    id: 11,
    courseId: 1,
    title: "Rhythm Basics",
    subtitle: "Time & Pulse",
    description:
      "Learn to count, feel the beat, and read basic time signatures.",
    position: { x: 0, y: 0 },
    notebookOrder: [110, 111, 112, 113],
    topicGraph: {
      nodes: [
        {
          id: "t11-n110",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 110,
            topicId: 11,
            title: "The Pulse",
            subtitle: "Lesson 1",
            status: "completed",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t11-n111",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 111,
            topicId: 11,
            title: "Quarters",
            subtitle: "Lesson 2",
            status: "completed",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t11-n112",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 112,
            topicId: 11,
            title: "Time Signatures",
            subtitle: "Lesson 3",
            status: "completed",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
        {
          id: "t11-n113",
          type: "notebook",
          position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          data: {
            id: 113,
            topicId: 11,
            title: "Ties & Dots",
            subtitle: "Lesson 4",
            status: "completed",
            position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-110-111",
          source: "t11-n110",
          target: "t11-n111",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-111-112",
          source: "t11-n111",
          target: "t11-n112",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-112-113",
          source: "t11-n112",
          target: "t11-n113",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },

  // --- COURSE 2: HARMONY (HALF COMPLETED) ---
  {
    id: 20,
    courseId: 2,
    title: "Intervals",
    subtitle: "Distance Between Notes",
    description:
      "The atoms of harmony. Learn to identify and construct distances between pitches.",
    position: { x: 0, y: 0 },
    notebookOrder: [201, 202, 203, 204],
    topicGraph: {
      nodes: [
        // All nodes in this topic are completed
        {
          id: "t20-n201",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 201,
            topicId: 20,
            title: "What is an Interval?",
            subtitle: "Lesson 1",
            status: "completed",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t20-n202",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 202,
            topicId: 20,
            title: "Simple Intervals",
            subtitle: "Lesson 2",
            status: "completed",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t20-n203",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 203,
            topicId: 20,
            title: "Perfect Consonance",
            subtitle: "Lesson 3",
            status: "completed",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
        {
          id: "t20-n204",
          type: "notebook",
          position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          data: {
            id: 204,
            topicId: 20,
            title: "Major vs Minor",
            subtitle: "Lesson 4",
            status: "completed",
            position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-201-202",
          source: "t20-n201",
          target: "t20-n202",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-202-203",
          source: "t20-n202",
          target: "t20-n203",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-203-204",
          source: "t20-n203",
          target: "t20-n204",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },
  {
    id: 21,
    courseId: 2,
    title: "Advanced Intervals",
    subtitle: "Compound & Inverted",
    description:
      "Taking intervals beyond the octave and flipping them upside down.",
    position: { x: 0, y: 0 },
    notebookOrder: [210, 211, 212],
    topicGraph: {
      nodes: [
        // One completed, one unlocked (in progress point), one locked
        {
          id: "t21-n210",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 210,
            topicId: 21,
            title: "Compound Intervals",
            subtitle: "Lesson 1",
            status: "completed",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t21-n211",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 211,
            topicId: 21,
            title: "The Tritone",
            subtitle: "Lesson 2",
            status: "unlocked",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t21-n212",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 212,
            topicId: 21,
            title: "Inversions",
            subtitle: "Lesson 3",
            status: "locked",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-210-211",
          source: "t21-n210",
          target: "t21-n211",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-211-212",
          source: "t21-n211",
          target: "t21-n212",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },
  {
    id: 22,
    courseId: 2,
    title: "Triads",
    subtitle: "Three-Note Chords",
    description:
      "Stacking thirds to create Major, Minor, Diminished, and Augmented chords.",
    position: { x: 0, y: 0 },
    notebookOrder: [220, 221, 222, 223],
    topicGraph: {
      nodes: [
        // All locked
        {
          id: "t22-n220",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 220,
            topicId: 22,
            title: "Major Triads",
            subtitle: "Lesson 1",
            status: "locked",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t22-n221",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 221,
            topicId: 22,
            title: "Minor Triads",
            subtitle: "Lesson 2",
            status: "locked",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t22-n222",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 222,
            topicId: 22,
            title: "Diminished",
            subtitle: "Lesson 3",
            status: "locked",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
        {
          id: "t22-n223",
          type: "notebook",
          position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          data: {
            id: 223,
            topicId: 22,
            title: "Augmented",
            subtitle: "Lesson 4",
            status: "locked",
            position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-220-221",
          source: "t22-n220",
          target: "t22-n221",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-221-222",
          source: "t22-n221",
          target: "t22-n222",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-221-223",
          source: "t22-n221",
          target: "t22-n223",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },

  // --- COURSE 3: RHYTHM (NOT STARTED) ---
  {
    id: 30,
    courseId: 3,
    title: "Subdivision",
    subtitle: "Cutting Time",
    description:
      "Going beyond the quarter note. Eighths, sixteenths, and accuracy.",
    position: { x: 0, y: 0 },
    notebookOrder: [301, 302, 303],
    topicGraph: {
      nodes: [
        {
          id: "t30-n301",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 301,
            topicId: 30,
            title: "Eighth Notes",
            subtitle: "Lesson 1",
            status: "unlocked",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t30-n302",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 302,
            topicId: 30,
            title: "Sixteenth Notes",
            subtitle: "Lesson 2",
            status: "locked",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t30-n303",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 303,
            topicId: 30,
            title: "The Backbeat",
            subtitle: "Lesson 3",
            status: "locked",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-301-302",
          source: "t30-n301",
          target: "t30-n302",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-302-303",
          source: "t30-n302",
          target: "t30-n303",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },
  {
    id: 31,
    courseId: 3,
    title: "Complex Feel",
    subtitle: "Swing & Syncopation",
    description: "Adding groove and human feel to your rhythmic vocabulary.",
    position: { x: 0, y: 0 },
    notebookOrder: [310, 311, 312, 313],
    topicGraph: {
      nodes: [
        {
          id: "t31-n310",
          type: "notebook",
          position: { x: X_START, y: Y_BASELINE },
          data: {
            id: 310,
            topicId: 31,
            title: "Swing Feel",
            subtitle: "Lesson 1",
            status: "locked",
            position: { x: X_START, y: Y_BASELINE },
          },
        },
        {
          id: "t31-n311",
          type: "notebook",
          position: { x: X_START + X_GAP, y: Y_BASELINE },
          data: {
            id: 311,
            topicId: 31,
            title: "Syncopation",
            subtitle: "Lesson 2",
            status: "locked",
            position: { x: X_START + X_GAP, y: Y_BASELINE },
          },
        },
        {
          id: "t31-n312",
          type: "notebook",
          position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          data: {
            id: 312,
            topicId: 31,
            title: "Polyrhythms",
            subtitle: "Lesson 3",
            status: "locked",
            position: { x: X_START + X_GAP * 2, y: Y_BASELINE },
          },
        },
        {
          id: "t31-n313",
          type: "notebook",
          position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          data: {
            id: 313,
            topicId: 31,
            title: "3 over 2",
            subtitle: "Lesson 4",
            status: "locked",
            position: { x: X_START + X_GAP * 3, y: Y_BASELINE },
          },
        },
      ],
      edges: [
        {
          id: "e-310-311",
          source: "t31-n310",
          target: "t31-n311",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-311-312",
          source: "t31-n311",
          target: "t31-n312",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
        {
          id: "e-312-313",
          source: "t31-n312",
          target: "t31-n313",
          animated: true,
          style: { stroke: "#94a3b8", strokeWidth: 2 },
        },
      ],
    },
  },

  // --- TUTORIAL ---
  {
    id: 99,
    courseId: 0,
    title: "Tutorial",
    subtitle: "App Basics",
    description: "Learn how to use Music Notebook.",
    position: { x: 0, y: 0 },
    notebookOrder: [999],
    topicGraph: {
      nodes: [
        {
          id: "t99-n999",
          type: "notebook",
          position: { x: 400, y: 150 },
          data: {
            id: 999,
            topicId: 99,
            title: "Interactive Tutorial",
            subtitle: "Start Here",
            status: "unlocked",
            position: { x: 400, y: 150 },
          },
        },
      ],
      edges: [],
    },
  },
];

// --- 3. COURSES ---

export const ROADMAP_COURSES: CourseDefinition[] = [
  {
    id: 1,
    authorId: "user-1", // Created by current user
    title: "Music Theory Foundations",
    description:
      "Start here. Master the staff, clefs, and basic rhythm to build a rock-solid musical vocabulary.",
    topicOrder: [10, 11],
  },
  {
    id: 2,
    authorId: "user-1", // Created by current user
    title: "Harmony & Composition",
    description:
      "Deep dive into the building blocks of chords and melodies. From basic intervals to complex triads.",
    topicOrder: [20, 21, 22],
  },
  {
    id: 3,
    authorId: "user-system", // Created by ANOTHER user
    title: "Rhythm & Groove",
    description:
      "Unlock your internal clock. Learn to feel subdivisions, swing, and polyrhythms.",
    topicOrder: [30, 31],
  },
];

// --- 4. USER DATA ---

export const MOCK_USERS = [
  {
    id: "user-1",
    name: "Current Player",
    completedNotebookIds: [
      // Course 1: Fully Completed (Topics 10 & 11)
      101, 102, 103, 104, 110, 111, 112, 113,

      // Course 2: Half Completed (Topic 20 complete, Topic 21 started)
      201, 202, 203, 204, 210,

      // Course 3: Not Started (No IDs)
    ],
  },
];

export const MOCK_USER_CURRENT = MOCK_USERS[0];

// --- 5. HELPERS ---

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
