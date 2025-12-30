import type { Edge, Node } from "@xyflow/react";
import type { CourseId } from "./course";
import type { NotebookId, NotebookNodeDefinition } from "./notebook";

export type TopicId = number;

export type TopicGraphData = {
  nodes: Node<NotebookNodeDefinition>[];
  edges: Edge[];
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
  topicGraph: TopicGraphData;
};
