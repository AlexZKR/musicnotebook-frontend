import type { CourseDefinition } from "~/features/theory/model/course";
import type { NotebookId } from "~/features/theory/model/notebook";
import type { Topic } from "~/features/theory/model/topic";

export type CourseProgress = {
  topicCount: number;
  totalNotebooks: number;
  completedNotebookCount: number;
  status: "not-started" | "in-progress" | "completed";
  progressPercent: number;
};

export function getCourseProgress(
  course: CourseDefinition,
  topics: readonly Topic[],
  completedNotebooks: Set<NotebookId>
): CourseProgress {
  const courseTopics = course.topicOrder
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic));

  const topicCount = courseTopics.length;
  const notebookIds = new Set<NotebookId>();

  courseTopics.forEach((topic) => {
    topic.notebookOrder.forEach((id) => notebookIds.add(id));
  });

  const totalNotebooks = notebookIds.size;
  const completedNotebookCount = [...notebookIds].filter((id) =>
    completedNotebooks.has(id)
  ).length;

  const status =
    totalNotebooks === 0
      ? "not-started"
      : completedNotebookCount === totalNotebooks
        ? "completed"
        : completedNotebookCount > 0
          ? "in-progress"
          : "not-started";

  const progressPercent =
    totalNotebooks === 0
      ? 0
      : Math.round((completedNotebookCount / totalNotebooks) * 100);

  return {
    topicCount,
    totalNotebooks,
    completedNotebookCount,
    status,
    progressPercent,
  };
}
