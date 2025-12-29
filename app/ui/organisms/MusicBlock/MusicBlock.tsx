import React from "react";
import "abcjs/abcjs-audio.css";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DragIcon from "@mui/icons-material/OpenWith";
import DragOffIcon from "@mui/icons-material/PanToolAltOutlined";

import { NoteInfoDisplay } from "~/ui/molecules/NoteInfoDisplay";
import { NotebookBlock } from "~/ui/molecules/NotebookBlock";
import { useAbcJs } from "./useAbcJs";
import { useColorMode } from "~/context/ThemeContext";
import { buildAbcJsStyles } from "./abcjsAudioStyles";
import { AbcNotationEditor } from "./AbcNotationEditor";

export interface MusicBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

interface MusicBlockContentProps extends MusicBlockProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  isDraggingEnabled: boolean;
  setIsDraggingEnabled: (val: boolean) => void;
}

function MusicBlockContent({
  id,
  initialContent,
  isLocked,
  onUpdate,
  isEditing,
  setIsEditing,
  isDraggingEnabled,
  setIsDraggingEnabled,
}: Omit<MusicBlockContentProps, "onDelete">) {
  const theme = useTheme();
  const { mode } = useColorMode();
  const effectiveIsEditing = isLocked ? false : isEditing;
  const effectiveIsDraggingEnabled = isLocked ? false : isDraggingEnabled;

  const {
    abcString,
    noteInfo,
    handleContentChange,
    renderBackdrop,
    paperId,
    audioId,
    setHighlight,
  } = useAbcJs({
    id,
    initialContent,
    isLocked,
    isDraggingEnabled: effectiveIsDraggingEnabled,
    onUpdate,
  });

  const backdropResult = renderBackdrop(abcString);
  const headerLayout = {
    container: { pt: { xs: 0.25, sm: 0.5 }, pb: { xs: 2, sm: 3 } },
    header: { mb: 0.25, minHeight: 32 },
  } as const;

  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: "hidden",
        borderRadius: 2,
        transition: theme.transitions.create("box-shadow"),
        "&:hover": { boxShadow: theme.shadows[2] },
        bgcolor: "background.paper",
      }}
    >
      <style>{buildAbcJsStyles({ paperId, audioId, theme })}</style>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            ...headerLayout.container,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: headerLayout.header.mb,
              gap: 2,
              minHeight: headerLayout.header.minHeight,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {!isLocked && !noteInfo && (
                <Typography variant="caption" color="text.disabled">
                  {effectiveIsDraggingEnabled
                    ? "Click to play. Drag notes to change pitch."
                    : "Click notes to highlight them in code."}
                </Typography>
              )}

              {noteInfo && (
                <NoteInfoDisplay
                  name={noteInfo.name}
                  octave={noteInfo.octave}
                  measure={noteInfo.measure}
                />
              )}
            </Box>

            {!isLocked && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip
                  title={
                    effectiveIsDraggingEnabled
                      ? "Pitch Dragging Active"
                      : "Enable Pitch Dragging"
                  }
                >
                  <IconButton
                    onClick={() => setIsDraggingEnabled(!isDraggingEnabled)}
                    size="small"
                    sx={{
                      bgcolor: effectiveIsDraggingEnabled
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "action.hover",
                      color: effectiveIsDraggingEnabled
                        ? "primary.main"
                        : "text.secondary",
                      "&:hover": {
                        bgcolor: effectiveIsDraggingEnabled
                          ? alpha(theme.palette.primary.main, 0.2)
                          : "action.selected",
                      },
                    }}
                  >
                    {effectiveIsDraggingEnabled ? (
                      <DragIcon fontSize="small" />
                    ) : (
                      <DragOffIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    effectiveIsEditing ? "Close Editor" : "Edit Source Code"
                  }
                >
                  <IconButton
                    onClick={() => setIsEditing(!isEditing)}
                    size="small"
                    sx={{
                      bgcolor: effectiveIsEditing
                        ? "text.primary"
                        : "action.hover",
                      color: effectiveIsEditing
                        ? "background.paper"
                        : "text.secondary",
                      "&:hover": {
                        bgcolor: effectiveIsEditing
                          ? alpha(theme.palette.text.primary, 0.8)
                          : "action.selected",
                      },
                    }}
                  >
                    {effectiveIsEditing ? (
                      <CloseIcon fontSize="small" />
                    ) : (
                      <EditIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          <Box
            id={paperId}
            sx={{
              width: "100%",
              textAlign: "center",
              "& svg": { width: "100%", height: "auto" },
              // Invert music notation colors for dark mode
              ...(mode === "dark" && {
                "& path, & text": { fill: theme.palette.text.primary },
              }),
            }}
          />

          <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <div id={audioId} />
          </Box>
        </Box>

        {effectiveIsEditing && !isLocked && (
          <AbcNotationEditor
            paperId={paperId}
            abcString={abcString}
            backdropResult={backdropResult}
            onChange={handleContentChange}
            onClearHighlight={() => setHighlight(null)}
          />
        )}
      </Box>
    </Paper>
  );
}

export default function MusicBlock(props: MusicBlockProps) {
  return (
    <NotebookBlock
      id={props.id}
      isLocked={props.isLocked}
      onToggleLock={props.onToggleLock}
      onDelete={props.onDelete}
    >
      {(isEditing, setIsEditing, isDraggingEnabled, setIsDraggingEnabled) => (
        <MusicBlockContent
          {...props}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isDraggingEnabled={isDraggingEnabled}
          setIsDraggingEnabled={setIsDraggingEnabled}
        />
      )}
    </NotebookBlock>
  );
}
