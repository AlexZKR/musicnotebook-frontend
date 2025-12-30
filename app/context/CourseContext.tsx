import React, { createContext, useContext } from "react";
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
import type { Topic } from "~/features/roadmap/model/topic";
import {
  ROADMAP_COURSES,
  ROADMAP_GRAPH,
  ROADMAP_NOTEBOOKS,
  ROADMAP_TOPICS,
  getRoadmapNotebook,
  isRoadmapNotebookId,
} from "~/features/roadmap/data/mockRoadmapData";

const buildGraphNodes = (topics: Topic[]): Node<NotebookNodeDefinition>[] =>
  topics.map((topic) => {
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

export type CourseData = {
  courses: readonly CourseDefinition[];
  topics: readonly Topic[];
  notebooks: Record<NotebookId, Notebook>;
  getCourse: (id: CourseId) => CourseDefinition | null;
  getTopics: (courseId: CourseId) => readonly Topic[];
  getGraphNodes: () => Node<NotebookNodeDefinition>[];
  getGraphEdges: () => Edge[];
  getUnlockOrder: () => readonly NotebookId[];
  isNotebookId: (id: NotebookId) => boolean;
  getNotebook: (id: NotebookId) => Notebook | null;
};

const CourseContext = createContext<CourseData | undefined>(undefined);

export function CourseProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: CourseData;
}) {
  const defaultValue: CourseData = {
    courses: ROADMAP_COURSES,
    topics: ROADMAP_TOPICS,
    notebooks: ROADMAP_NOTEBOOKS,
    getCourse: (id: CourseId) =>
      ROADMAP_COURSES.find((course) => course.id === id) ?? null,
    getTopics: (courseId: CourseId) =>
      ROADMAP_TOPICS.filter((topic) => topic.courseId === courseId),
    getGraphNodes: () => buildGraphNodes(ROADMAP_TOPICS),
    getGraphEdges: () => ROADMAP_GRAPH.edges,
    getUnlockOrder: () => ROADMAP_GRAPH.unlockOrder,
    isNotebookId: isRoadmapNotebookId,
    getNotebook: getRoadmapNotebook,
  };

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
