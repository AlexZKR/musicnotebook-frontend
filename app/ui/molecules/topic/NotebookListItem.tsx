import React from "react";
import { Link as RouterLink } from "react-router";
import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  alpha,
  useTheme,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

import type { Notebook } from "~/features/theory/model/notebook";
import type { NodeStatus } from "~/features/theory/model/notebook";

interface NotebookListItemProps {
  notebook: Notebook;
  index: number;
  status: NodeStatus;
}

export default function NotebookListItem({
  notebook,
  index,
  status,
}: NotebookListItemProps) {
  const theme = useTheme();
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 3,
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        opacity: isLocked ? 0.6 : 1,
        borderColor: isCompleted ? "success.light" : "divider",
        bgcolor: isCompleted
          ? alpha(theme.palette.success.main, 0.02)
          : "background.paper",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          borderColor: isLocked ? "divider" : "primary.main",
          boxShadow: isLocked ? 0 : 3,
          transform: isLocked ? "none" : "translateY(-2px)",
          bgcolor: isLocked ? "background.paper" : "background.paper",
        },
      }}
    >
      {/* Index / Status Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: 2,
          flexShrink: 0,
          bgcolor: isCompleted
            ? "success.main"
            : isLocked
              ? "action.disabledBackground"
              : "primary.main",
          color: isLocked ? "text.disabled" : "common.white",
          boxShadow: isLocked ? "none" : theme.shadows[2],
        }}
      >
        {isCompleted ? (
          <CheckCircleIcon fontSize="small" />
        ) : isLocked ? (
          <LockIcon fontSize="small" />
        ) : (
          <Typography variant="h6" fontWeight="bold">
            {index + 1}
          </Typography>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Typography
            variant="h6"
            fontWeight="bold"
            noWrap
            color={isLocked ? "text.secondary" : "text.primary"}
          >
            {notebook.title}
          </Typography>
          {isCompleted && (
            <Chip
              label="Completed"
              size="small"
              color="success"
              variant="outlined"
              sx={{ height: 20, fontSize: "0.65rem", fontWeight: "bold" }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {isLocked
            ? "Complete previous lessons to unlock."
            : "Interactive lesson"}
        </Typography>
      </Box>

      {/* Action Button */}
      <Box sx={{ flexShrink: 0 }}>
        {isLocked ? (
          <Button disabled variant="text" startIcon={<LockIcon />}>
            Locked
          </Button>
        ) : (
          <Button
            component={RouterLink}
            to={`/notebook/${notebook.id}`}
            variant={isCompleted ? "outlined" : "contained"}
            color={isCompleted ? "success" : "primary"}
            endIcon={isCompleted ? <EditIcon /> : <PlayArrowIcon />}
            sx={{
              borderRadius: "99px",
              textTransform: "none",
              fontWeight: 700,
              minWidth: 100,
            }}
          >
            {isCompleted ? "Review" : "Start"}
          </Button>
        )}
      </Box>
    </Paper>
  );
}
