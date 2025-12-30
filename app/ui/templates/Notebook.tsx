import React from "react";
import type { BlockData } from "~/features/notebook/model/block";
import { DEFAULT_BLOCKS } from "~/features/notebook/model/block";
import { NotebookEditor } from "~/ui/organisms/notebook/NotebookEditor";

export interface NotebookProps {
  initialBlocks?: BlockData[];
  onComplete?: () => void;
}

export default function Notebook({ initialBlocks, onComplete }: NotebookProps) {
  return (
    <NotebookEditor
      initialBlocks={initialBlocks || DEFAULT_BLOCKS}
      onComplete={onComplete}
    />
  );
}
