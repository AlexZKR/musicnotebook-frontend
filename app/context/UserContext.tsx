import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRoadmapData } from "~/context/RoadmapDataContext";

type NodeStatus = "locked" | "unlocked" | "completed";

type UserProgress = {
  completedNodeIds: string[];
  markNodeCompleted: (nodeId: string) => void;
  getNodeStatus: (nodeId: string) => NodeStatus;
};

type UserContextType = {
  progress: UserProgress;
};

const PROGRESS_STORAGE_KEY = "music-notebook-progress";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { unlockOrder } = useRoadmapData();
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return [];
  });

  const markNodeCompleted = useCallback((nodeId: string) => {
    setCompletedNodeIds((prev) => {
      if (prev.includes(nodeId)) return prev;
      const next = [...prev, nodeId];
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getNodeStatus = useCallback(
    (nodeId: string): NodeStatus => {
      if (completedNodeIds.includes(nodeId)) return "completed";

      const index = unlockOrder.indexOf(nodeId);
      if (index === -1) return "unlocked";
      if (index === 0) return "unlocked";

      const prevNodeId = unlockOrder[index - 1];
      if (
        typeof prevNodeId === "string" &&
        completedNodeIds.includes(prevNodeId)
      ) {
        return "unlocked";
      }

      return "locked";
    },
    [completedNodeIds, unlockOrder]
  );

  const value = useMemo<UserContextType>(
    () => ({
      progress: {
        completedNodeIds,
        markNodeCompleted,
        getNodeStatus,
      },
    }),
    [completedNodeIds, markNodeCompleted, getNodeStatus]
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
