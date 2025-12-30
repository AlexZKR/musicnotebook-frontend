import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useCourseData } from "~/context/CourseContext";
import type { CourseId } from "~/features/theory/model/course";
import type { NodeStatus, NotebookId } from "~/features/theory/model/notebook";
import type { TopicId } from "~/features/theory/model/topic";
import { MOCK_USER_CURRENT } from "~/features/theory/data/mockTheoryData";

type UserProgress = {
  completedNodeIds: readonly NotebookId[];
  completedTopicIds: readonly TopicId[];
  completedCourseIds: readonly CourseId[];
  markNodeCompleted: (nodeId: NotebookId) => void;
  unmarkNodeCompleted: (nodeId: NotebookId) => void;
  getNodeStatus: (nodeId: NotebookId) => NodeStatus;
  isTopicCompleted: (topicId: TopicId) => boolean;
  isCourseCompleted: (courseId: CourseId) => boolean;
};

type UserContextType = {
  progress: UserProgress;
};

const PROGRESS_STORAGE_KEY = "music-notebook-progress";
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { getUnlockOrder, getTopicByNotebookId, topics, courses } =
    useCourseData();
  const [completedNodeIds, setCompletedNodeIds] = useState<
    readonly NotebookId[]
  >(() => {
    if (typeof window === "undefined")
      return MOCK_USER_CURRENT.completedNotebookIds;
    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return MOCK_USER_CURRENT.completedNotebookIds;
  });

  const markNodeCompleted = useCallback((nodeId: NotebookId) => {
    setCompletedNodeIds((prev) => {
      if (prev.includes(nodeId)) return prev;
      const next = [...prev, nodeId];
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const unmarkNodeCompleted = useCallback((nodeId: NotebookId) => {
    setCompletedNodeIds((prev) => {
      if (!prev.includes(nodeId)) return prev;
      const next = prev.filter((id) => id !== nodeId);
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getNodeStatus = useCallback(
    (nodeId: NotebookId): NodeStatus => {
      if (completedNodeIds.includes(nodeId)) return "completed";

      const topic = getTopicByNotebookId(nodeId);
      const unlockOrder = topic ? getUnlockOrder(topic.id) : [];
      const index = unlockOrder.indexOf(nodeId);
      if (index <= 0) return "unlocked";

      const prevNodeId = unlockOrder[index - 1];
      if (prevNodeId !== undefined && completedNodeIds.includes(prevNodeId)) {
        return "unlocked";
      }

      return "locked";
    },
    [completedNodeIds, getTopicByNotebookId, getUnlockOrder]
  );

  const completedTopicIds = useMemo<TopicId[]>(() => {
    if (topics.length === 0) return [];
    const completedNotebookSet = new Set<NotebookId>(completedNodeIds);
    return topics
      .filter(
        (topic) =>
          topic.notebookOrder.length > 0 &&
          topic.notebookOrder.every((notebookId) =>
            completedNotebookSet.has(notebookId)
          )
      )
      .map((topic) => topic.id);
  }, [completedNodeIds, topics]);

  const completedTopicSet = useMemo(
    () => new Set(completedTopicIds),
    [completedTopicIds]
  );

  const completedCourseIds = useMemo<CourseId[]>(
    () =>
      courses
        .filter((course) =>
          course.topicOrder.every((topicId) => completedTopicSet.has(topicId))
        )
        .map((course) => course.id),
    [completedTopicSet, courses]
  );

  const completedCourseSet = useMemo(
    () => new Set(completedCourseIds),
    [completedCourseIds]
  );

  const isTopicCompleted = useCallback(
    (topicId: TopicId) => completedTopicSet.has(topicId),
    [completedTopicSet]
  );

  const isCourseCompleted = useCallback(
    (courseId: CourseId) => completedCourseSet.has(courseId),
    [completedCourseSet]
  );

  const value = useMemo<UserContextType>(
    () => ({
      progress: {
        completedNodeIds,
        completedTopicIds,
        completedCourseIds,
        markNodeCompleted,
        unmarkNodeCompleted,
        getNodeStatus,
        isTopicCompleted,
        isCourseCompleted,
      },
    }),
    [
      completedNodeIds,
      completedTopicIds,
      completedCourseIds,
      markNodeCompleted,
      unmarkNodeCompleted,
      getNodeStatus,
      isTopicCompleted,
      isCourseCompleted,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}

export function useUserProgress(): UserProgress {
  return useUser().progress;
}
