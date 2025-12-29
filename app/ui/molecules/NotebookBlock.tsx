import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";

interface NotebookBlockProps {
  id: string;
  isLocked?: boolean;
  onToggleLock: () => void;
  children: React.ReactNode;
}

export function NotebookBlock({
  id,
  isLocked,
  onToggleLock,
  children,
}: NotebookBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={`block-${id}`}
      className="relative flex items-start gap-2 group/sortable mb-8 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="mt-4 flex flex-col items-center gap-1 opacity-70 md:opacity-0 group-hover/sortable:opacity-100 transition-opacity">
        <div
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab text-gray-300 hover:text-gray-600 active:cursor-grabbing select-none touch-manipulation"
          title="Drag to reorder"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
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
      </div>

      <div className="grow min-w-0">{children}</div>
    </div>
  );
}
