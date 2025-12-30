import React from "react";
import {
  Paper,
  Button,
  IconButton,
  Divider,
  Tooltip,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import type { BlockType } from "~/features/notebook/model/block";

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
  const theme = useTheme();

  return (
    <Paper
      elevation={4} // Reduced elevation for a flatter, more minimal look
      sx={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        p: 0.75,
        borderRadius: "99px",
        zIndex: 1100,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {/* Text Block Button - Minimal Style */}
      <Button
        variant="text"
        color="inherit"
        startIcon={<TextFieldsIcon fontSize="small" />}
        onClick={() => onAddBlock("text")}
        sx={{
          px: { xs: 1.5, sm: 2 },
          py: 1,
          borderRadius: "99px",
          color: "text.secondary",
          fontSize: "0.875rem",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          Add Text
        </Box>
        <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
          Text
        </Box>
      </Button>

      {/* Music Block Button - Subtle Highlight */}
      <Button
        variant="text" // Changed from contained to text for less visual weight
        color="primary"
        startIcon={<MusicNoteIcon fontSize="small" />}
        onClick={() => onAddBlock("music")}
        sx={{
          px: { xs: 1.5, sm: 2 },
          py: 1,
          borderRadius: "99px",
          fontSize: "0.875rem",
          fontWeight: 600,
          // Subtle blue tint instead of solid block
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.12),
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          Add Music
        </Box>
        <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
          Music
        </Box>
      </Button>

      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ mx: 1, height: 20, alignSelf: "center" }}
      />

      <Tooltip title={areAllLocked ? "Unlock All Blocks" : "Lock All Blocks"}>
        <IconButton
          onClick={onToggleAllLocks}
          size="small"
          sx={{
            p: 1.25,
            color: areAllLocked ? "text.disabled" : "primary.main",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          {areAllLocked ? (
            <LockIcon fontSize="small" />
          ) : (
            <UnlockIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
