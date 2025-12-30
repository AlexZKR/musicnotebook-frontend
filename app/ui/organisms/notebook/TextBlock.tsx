import React, { useState, useRef, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Box, alpha, useTheme } from "@mui/material";
import { NotebookBlock } from "~/ui/molecules/notebook/NotebookBlock";
import { useColorMode } from "~/context/ThemeContext";

export interface TextBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

interface TextBlockContentProps extends TextBlockProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

function TextBlockContent({
  initialContent,
  isLocked,
  onUpdate,
  isEditing,
  setIsEditing,
}: Omit<TextBlockContentProps, "onDelete">) {
  const theme = useTheme();
  const { mode } = useColorMode();
  const [value, setValue] = useState(initialContent);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync content if it changes externally
  useEffect(() => {
    setValue(initialContent);
  }, [initialContent]);

  const editorCommands = commands
    .getCommands()
    .filter((cmd) => cmd.name !== "fullscreen");

  const handleChange = (val: string | undefined) => {
    const newVal = val || "";
    setValue(newVal);
    onUpdate(newVal);
  };

  // Handle clicking outside to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, setIsEditing]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        borderRadius: 1,
        transition: theme.transitions.create([
          "box-shadow",
          "background-color",
        ]),
        ...(isEditing && {
          zIndex: 10,
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}, ${theme.shadows[4]}`,
        }),
        ...(!isEditing &&
          !isLocked && {
            "&:hover": {
              bgcolor: alpha(theme.palette.action.hover, 0.04),
              boxShadow: `inset 0 0 0 1px ${theme.palette.divider}`,
            },
          }),
      }}
    >
      {isEditing ? (
        <Box data-color-mode={mode}>
          <MDEditor
            value={value}
            onChange={handleChange}
            preview="edit"
            height={300}
            visibleDragbar={true}
            commands={editorCommands}
          />
        </Box>
      ) : (
        <Box
          onClick={() => !isLocked && setIsEditing(true)}
          onKeyDown={(e) => {
            if (!isLocked && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setIsEditing(true);
            }
          }}
          role="button"
          tabIndex={isLocked ? -1 : 0}
          data-color-mode={mode}
          sx={{
            p: { xs: 2, sm: 3 },
            minHeight: isLocked ? 48 : 96,
            cursor: isLocked ? "default" : "text",
            borderRadius: 1,
            color: "text.primary",
            outline: "none",
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            },
            // Maintain typography styles for Markdown content
            "& .wmde-markdown": {
              bgcolor: "transparent !important",
              color: "inherit !important",
              fontFamily: theme.typography.fontFamily,
              fontSize: "0.95rem",
              lineHeight: 1.6,
            },
          }}
        >
          <MDEditor.Markdown source={value} />
        </Box>
      )}
    </Box>
  );
}

export default function TextBlock(props: TextBlockProps) {
  return (
    <NotebookBlock
      id={props.id}
      isLocked={props.isLocked}
      onToggleLock={props.onToggleLock}
      onDelete={props.onDelete}
    >
      {(isEditing, setIsEditing) => (
        <TextBlockContent
          {...props}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </NotebookBlock>
  );
}
