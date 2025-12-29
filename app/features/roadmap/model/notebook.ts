import type { BlockData } from "~/features/notebook/model/block";

export type RoadmapNotebook = {
  id: string;
  title: string;
  blocks: BlockData[];
  trackProgress: boolean;
};
