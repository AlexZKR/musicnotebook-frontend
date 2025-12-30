import type { Edge } from "@xyflow/react";
import type { CourseId } from "./course";
import type { NotebookId } from "./notebook";

export type TopicId = number;

export type RoadmapGraphData = {
  edges: Edge[];
  unlockOrder: readonly NotebookId[];
};

export type Topic = {
  id: TopicId;
  courseId: CourseId;

  title: string;
  subtitle: string;
  description?: string;

  position: {
    x: number;
    y: number;
  };

  notebookOrder: readonly NotebookId[];
  roadmapGraph: RoadmapGraphData;
};
