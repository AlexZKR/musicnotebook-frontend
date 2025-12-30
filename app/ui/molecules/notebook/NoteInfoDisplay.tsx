import React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

interface NoteInfoDisplayProps {
  name: string;
  octave: number;
  measure: number;
}

export function NoteInfoDisplay({
  name,
  octave,
  measure,
}: NoteInfoDisplayProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        animation: "fade-in 0.2s ease-out",
        "@keyframes fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Pitch Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "primary.light",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          color: "primary.main",
          boxShadow: theme.shadows[1],
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          Pitch
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", lineHeight: 1 }}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontWeight: "medium", color: "primary.light" }}
        >
          {octave}
        </Typography>
      </Box>

      {/* Bar Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
          color: "text.secondary",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "text.disabled",
          }}
        >
          Bar
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {measure}
        </Typography>
      </Box>
    </Stack>
  );
}
