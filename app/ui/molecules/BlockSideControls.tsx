import React from "react";
import { Stack, IconButton, Tooltip, alpha, useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  const theme = useTheme();

  return (
    <Stack
      className="block-controls"
      spacing={0.5}
      alignItems="center"
      sx={{
        mt: 2,
        opacity: { xs: 0.7, md: 0 },
        transition: theme.transitions.create("opacity"),
      }}
    >
      {/* 1. Drag Handle - Added disableInteractive and changed placement */}
      <Tooltip
        title="Drag to reorder"
        placement="left"
        disableInteractive
        enterDelay={400} // Optional: slightly delay to avoid flickering while moving mouse
      >
        <IconButton
          {...attributes}
          {...listeners}
          size="small"
          sx={{
            cursor: "grab",
            color: "text.disabled",
            "&:active": { cursor: "grabbing" },
            "&:hover": { color: "text.primary" },
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* 2. Lock Toggle - Added disableInteractive and changed placement */}
      <Tooltip
        title={isLocked ? "Unlock Block" : "Lock Block"}
        placement="left"
        disableInteractive
      >
        <IconButton
          onClick={onToggleLock}
          size="small"
          sx={{
            color: isLocked ? "text.disabled" : "primary.main",
            bgcolor: isLocked
              ? "transparent"
              : alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: isLocked
                ? "action.hover"
                : alpha(theme.palette.primary.main, 0.15),
            },
          }}
        >
          {isLocked ? (
            <LockIcon fontSize="small" />
          ) : (
            <UnlockIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      {/* 3. Delete Button - Added disableInteractive and changed placement */}
      {!isLocked && (
        <Tooltip title="Delete Block" placement="left" disableInteractive>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size="small"
            sx={{
              color: "text.disabled",
              "&:hover": {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
