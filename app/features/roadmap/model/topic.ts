export type TopicStatus = "locked" | "unlocked" | "completed";

export type TopicData = {
  title: string;
  subtitle: string;
  status: TopicStatus;
  justCompleted?: boolean;
  [key: string]: unknown;
};
