import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Box, Typography, useTheme, alpha } from "@mui/material"; // Added MUI imports
import type { NotebookNodeDefinition } from "~/features/theory/model/notebook";

export default function NotebookNode({
  data,
  isConnectable,
}: {
  data: NotebookNodeDefinition;
  isConnectable: boolean;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getStyles = () => {
    switch (data.status) {
      case "completed":
        return {
          bgcolor: isDark
            ? alpha(theme.palette.success.main, 0.15)
            : "success.light",
          borderColor: "success.main",
          color: isDark
            ? theme.palette.success.light
            : theme.palette.success.dark,
        };
      case "unlocked":
        return {
          bgcolor: "background.paper",
          borderColor: "primary.main",
          color: "text.primary",
          boxShadow: theme.shadows[2],
        };
      case "locked":
      default:
        return {
          bgcolor: isDark ? alpha(theme.palette.divider, 0.1) : "grey.100",
          borderColor: "divider",
          color: "text.disabled",
        };
    }
  };

  const styles = getStyles();

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        border: "2px solid",
        minWidth: { xs: 160, sm: 200 },
        transition: "all 0.4s ease-in-out",
        textAlign: "center",
        cursor: data.status === "locked" ? "not-allowed" : "pointer",
        ...styles,
        // Completion Animation
        ...(data.justCompleted && {
          transform: "scale(1.1)",
          ring: `4px solid ${theme.palette.success.light}`,
        }),
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: theme.palette.divider, width: 8, height: 8 }}
      />

      <Box display="flex" flexDirection="column" alignItems="center">
        {data.status === "completed" && (
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", color: "success.main", mb: 0.5 }}
          >
            ✓ DONE
          </Typography>
        )}
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 800, textTransform: "uppercase" }}
        >
          {data.title}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {data.subtitle}
        </Typography>
      </Box>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: theme.palette.divider, width: 8, height: 8 }}
      />
    </Box>
  );
}
