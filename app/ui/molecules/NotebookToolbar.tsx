import React from "react";
import type { BlockType } from "~/features/notebook/model/block";
import { LockIcon } from "~/ui/atoms/icons/LockIcon";
import { UnlockIcon } from "~/ui/atoms/icons/UnlockIcon";

interface NotebookToolbarProps {
  onAddBlock: (type: BlockType) => void;
  onToggleAllLocks: () => void;
  areAllLocked: boolean;
}

export function NotebookToolbar({
  onAddBlock,
  onToggleAllLocks,
  areAllLocked,
}: NotebookToolbarProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-white p-2 rounded-full shadow-lg border border-gray-200 z-50 max-w-[calc(100vw-2rem)]">
      <button
        onClick={() => onAddBlock("text")}
        className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-sm sm:text-base touch-manipulation"
      >
        <span>📝</span>
        <span className="hidden sm:inline">Add Text</span>
        <span className="sm:hidden">Text</span>
      </button>
      <button
        onClick={() => onAddBlock("music")}
        className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full font-medium transition-colors text-sm sm:text-base touch-manipulation"
      >
        <span>🎵</span>
        <span className="hidden sm:inline">Add Music</span>
        <span className="sm:hidden">Music</span>
      </button>

      <div className="w-px h-6 bg-gray-300 mx-0.5 sm:mx-1"></div>

      <button
        onClick={onToggleAllLocks}
        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
        title={areAllLocked ? "Unlock All Blocks" : "Lock All Blocks"}
      >
        {areAllLocked ? <LockIcon /> : <UnlockIcon />}
      </button>
    </div>
  );
}
