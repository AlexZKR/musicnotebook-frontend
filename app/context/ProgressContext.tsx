import React, { createContext, useContext, useState, useEffect } from "react";

interface ProgressContextType {
  completedNodes: string[];
  markAsCompleted: (nodeId: string) => void;
  getNodeStatus: (nodeId: string) => "locked" | "unlocked" | "completed";
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

// The Linear Progression Path
// 1 (Notation) -> 2 (Intervals) -> 2-1 (Simple) -> 2-2 (Compound)
const UNLOCK_ORDER = ["1", "2", "2-1", "2-2"];

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("music-notebook-progress");
    if (saved) {
      try {
        setCompletedNodes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const markAsCompleted = (nodeId: string) => {
    if (!completedNodes.includes(nodeId)) {
      const newCompleted = [...completedNodes, nodeId];
      setCompletedNodes(newCompleted);
      localStorage.setItem(
        "music-notebook-progress",
        JSON.stringify(newCompleted)
      );
    }
  };

  const getNodeStatus = (
    nodeId: string
  ): "locked" | "unlocked" | "completed" => {
    // 1. If completed, return completed
    if (completedNodes.includes(nodeId)) return "completed";

    // 2. Find where this node is in the linear chain
    const index = UNLOCK_ORDER.indexOf(nodeId);

    // If not in our main chain (e.g., tutorial), treat as unlocked or handle separately
    if (index === -1) return "unlocked";

    // 3. First node is always unlocked
    if (index === 0) return "unlocked";

    // 4. Check if the PREVIOUS node in the chain is completed
    const prevNodeId = UNLOCK_ORDER[index - 1];
    if (completedNodes.includes(prevNodeId)) {
      return "unlocked";
    }

    // 5. Otherwise, it's locked
    return "locked";
  };

  return (
    <ProgressContext.Provider
      value={{ completedNodes, markAsCompleted, getNodeStatus }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
