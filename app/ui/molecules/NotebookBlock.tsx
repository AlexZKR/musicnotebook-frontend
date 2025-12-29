import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockSideControls } from "./BlockSideControls";

interface NotebookBlockProps {
  id: string;
  isLocked?: boolean;
  onToggleLock: () => void;
  onDelete: () => void;
  children: (
    isEditing: boolean,
    setIsEditing: (val: boolean) => void,
    isDraggingEnabled: boolean,
    setIsDraggingEnabled: (val: boolean) => void
  ) => React.ReactNode;
}

export function NotebookBlock({
  id,
  isLocked,
  onToggleLock,
  onDelete,
  children,
}: NotebookBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  // Sync state with isLocked: if locked, we cannot be editing.
  if (isLocked && isEditing) {
    setIsEditing(false);
  }

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
      <BlockSideControls
        isLocked={isLocked}
        onToggleLock={onToggleLock}
        onDelete={onDelete}
        attributes={attributes}
        listeners={listeners}
      />

      <div className="grow min-w-0">
        {children(
          isEditing,
          setIsEditing,
          isDraggingEnabled,
          setIsDraggingEnabled
        )}
      </div>
    </div>
  );
}
