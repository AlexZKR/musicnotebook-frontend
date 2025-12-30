import type { TopicId } from "./topic";
import type { UserId } from "./user";

export type CourseId = number;

export type CourseDefinition = {
  id: CourseId;
  authorId: UserId;

  title: string;
  description: string;
  imageURL?: string;
  topicOrder: readonly TopicId[];
};
