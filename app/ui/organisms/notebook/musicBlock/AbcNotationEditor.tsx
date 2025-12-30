import React from "react";
import { Box, Paper, Typography, alpha, useTheme } from "@mui/material";

type BackdropResult =
  | string
  | {
      before: string;
      match: string;
      after: string;
    };

export type AbcNotationEditorProps = {
  paperId: string;
  abcString: string;
  backdropResult: BackdropResult;
  onChange: (value: string) => void;
  onClearHighlight: () => void;
};

export function AbcNotationEditor({
  paperId,
  abcString,
  backdropResult,
  onChange,
  onClearHighlight,
}: AbcNotationEditorProps) {
  const theme = useTheme();

  return (
    <Box
      id={`${paperId}-editor`}
      sx={{
        p: { xs: 2, sm: 3 },
        borderTop: 1,
        borderColor: "divider",
        bgcolor: alpha(theme.palette.action.hover, 0.04),
      }}
    >
      <Typography
        variant="overline"
        sx={{
          fontWeight: "bold",
          color: "text.secondary",
          mb: 1,
          display: "block",
        }}
      >
        ABC Notation Editor
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          position: "relative",
          height: { xs: 200, sm: 240 },
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            p: 2,
            fontFamily: "monospace",
            fontSize: "0.875rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            pointerEvents: "none",
            color: "text.primary",
          }}
        >
          {typeof backdropResult === "string" ? (
            backdropResult
          ) : (
            <>
              {backdropResult.before}
              <Box
                component="span"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.45),
                  borderRadius: "2px",
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                {backdropResult.match}
              </Box>
              {backdropResult.after}
            </>
          )}
        </Box>

        <textarea
          value={abcString}
          onChange={(e) => {
            onChange(e.target.value);
            onClearHighlight();
          }}
          spellCheck="false"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: "16px",
            fontFamily: "monospace",
            fontSize: "14px",
            background: "transparent",
            color: "transparent",
            caretColor: theme.palette.text.primary,
            border: "none",
            outline: "none",
            resize: "none",
            zIndex: 1,
          }}
        />
      </Paper>
    </Box>
  );
}
