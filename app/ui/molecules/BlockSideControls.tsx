import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import TrashIcon from "@mui/icons-material/Delete";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface BlockSideControlsProps {
  isLocked?: boolean;
  onToggleLock: () => void;
  onDelete: () => void;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export function BlockSideControls({
  isLocked,
  onToggleLock,
  onDelete,
  attributes,
  listeners,
}: BlockSideControlsProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-1 opacity-70 md:opacity-0 group-hover/sortable:opacity-100 transition-opacity">
      <div
        {...attributes}
        {...listeners}
        className="p-2 cursor-grab text-gray-300 hover:text-gray-600 active:cursor-grabbing select-none touch-manipulation"
        title="Drag to reorder"
      >
        <DragIndicatorIcon />
      </div>

      <button
        onClick={onToggleLock}
        className={`p-2 rounded-full transition-colors ${
          isLocked
            ? "text-gray-400 hover:text-gray-600"
            : "text-blue-400 hover:text-blue-600 bg-blue-50"
        }`}
        title={isLocked ? "Unlock Block" : "Lock Block"}
      >
        {isLocked ? <LockIcon /> : <UnlockIcon />}
      </button>

      {!isLocked && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors touch-manipulation"
          title="Delete Block"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}
