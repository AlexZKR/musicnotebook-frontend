import React, { createContext, useContext, useMemo } from "react";
import type { Edge, Node } from "@xyflow/react";

import type {
  CourseDefinition,
  CourseId,
} from "~/features/roadmap/model/course";
import type {
  Notebook,
  NotebookId,
  NotebookNodeDefinition,
} from "~/features/roadmap/model/notebook";
import type { Topic, TopicId } from "~/features/roadmap/model/topic";
import {
  ROADMAP_COURSES,
  ROADMAP_NOTEBOOKS,
  ROADMAP_TOPICS,
  getRoadmapNotebook,
  isRoadmapNotebookId,
} from "~/features/roadmap/data/mockRoadmapData";

const topicLookup = new Map<TopicId, Topic>();
const notebookToTopic = new Map<NotebookId, Topic>();

ROADMAP_TOPICS.forEach((topic) => {
  topicLookup.set(topic.id, topic);
  topic.notebookOrder.forEach((notebookId) =>
    notebookToTopic.set(notebookId, topic)
  );
});

export type CourseData = {
  courses: readonly CourseDefinition[];
  topics: readonly Topic[];
  notebooks: Record<NotebookId, Notebook>;
  getCourse: (id: CourseId) => CourseDefinition | null;
  getTopics: (courseId: CourseId) => readonly Topic[];
  getTopic: (topicId: TopicId) => Topic | null;
  getTopicByNotebookId: (notebookId: NotebookId) => Topic | null;
  getGraphNodes: (topicId: TopicId) => Node<NotebookNodeDefinition>[];
  getGraphEdges: (topicId: TopicId) => Edge[];
  getUnlockOrder: (topicId: TopicId) => readonly NotebookId[];
  isNotebookId: (id: NotebookId) => boolean;
  getNotebook: (id: NotebookId) => Notebook | null;
};

const CourseContext = createContext<CourseData | undefined>(undefined);

const EMPTY_NODES: Node<NotebookNodeDefinition>[] = [];
const EMPTY_EDGES: Edge[] = [];

export function CourseProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: CourseData;
}) {
  const defaultValue: CourseData = useMemo(
    () => ({
      courses: ROADMAP_COURSES,
      topics: ROADMAP_TOPICS,
      notebooks: ROADMAP_NOTEBOOKS,
      getCourse: (id: CourseId) =>
        ROADMAP_COURSES.find((course) => course.id === id) ?? null,
      getTopics: (courseId: CourseId) =>
        ROADMAP_TOPICS.filter((topic) => topic.courseId === courseId),
      getTopic: (topicId: TopicId) => topicLookup.get(topicId) ?? null,
      getTopicByNotebookId: (notebookId: NotebookId) =>
        notebookToTopic.get(notebookId) ?? null,
      getGraphNodes: (topicId: TopicId) =>
        topicLookup.get(topicId)?.topicGraph.nodes ?? EMPTY_NODES,
      getGraphEdges: (topicId: TopicId) =>
        topicLookup.get(topicId)?.topicGraph.edges ?? EMPTY_EDGES,
      getUnlockOrder: (topicId: TopicId) =>
        topicLookup.get(topicId)?.notebookOrder ?? [],
      isNotebookId: isRoadmapNotebookId,
      getNotebook: getRoadmapNotebook,
    }),
    []
  );

  return (
    <CourseContext.Provider value={value ?? defaultValue}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseData(): CourseData {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error("useCourseData must be used within a CourseProvider");
  }
  return ctx;
}
