import type { BlockData } from "~/features/notebook/model/block";
import type { TopicId } from "./topic";

export type NotebookId = number;

export type Notebook = {
  id: NotebookId;
  title: string;
  blocks: BlockData[];
  trackProgress: boolean;
};

export type NodeStatus = "locked" | "unlocked" | "completed";

export type NotebookNodeDefinition = {
  id: NotebookId;
  topicId: TopicId;

  title: string;
  subtitle: string;
  description?: string;
  status: NodeStatus;

  position: {
    x: number;
    y: number;
  };

  justCompleted?: boolean;
  [key: string]: unknown;
};
