import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
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

  const effectiveIsEditing = isLocked ? false : isEditing;
  const setEffectiveIsEditing = (val: boolean) => {
    if (isLocked) {
      if (!val) setIsEditing(false);
      return;
    }
    setIsEditing(val);
  };

  const handleToggleLock = () => {
    setIsEditing(false);
    onToggleLock();
  };

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
    <Box
      ref={setNodeRef}
      id={`block-${id}`}
      sx={{
        ...style,
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        mb: 8,
        scrollMarginTop: { xs: "112px", sm: "128px" },
        "&:hover .block-controls": {
          opacity: 1,
        },
      }}
      className="group/sortable"
    >
      <BlockSideControls
        isLocked={isLocked}
        onToggleLock={handleToggleLock}
        onDelete={onDelete}
        attributes={attributes}
        listeners={listeners}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {children(
          effectiveIsEditing,
          setEffectiveIsEditing,
          isDraggingEnabled,
          setIsDraggingEnabled
        )}
      </Box>
    </Box>
  );
}
