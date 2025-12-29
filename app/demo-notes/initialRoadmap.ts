import type { TopicData } from "~/roadmap";

// Initial Nodes State moved here
export const initialNodes: Node<TopicData>[] = [
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
      status: "unlocked",
    },
  },
  {
    id: "2-2",
    type: "topic",
    position: { x: 400, y: 300 },
    data: {
      title: "Compound Intervals",
      subtitle: "9ths, 11ths, 13ths",
      status: "unlocked",
    },
  },
];
