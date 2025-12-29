import React from "react";
import { Paper, Stack, Typography, Avatar, Button, Box } from "@mui/material";

interface BannerProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
  severity?: "primary" | "secondary"; // Extendable for different brand colors
}

export default function Banner({
  icon,
  title,
  description,
  actionLabel,
  onActionClick,
  severity = "primary",
}: BannerProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 1, // Uses theme.ts borderRadius * 3 (approx 36px)
        background: (theme) =>
          theme.palette.mode === "light"
            ? `linear-gradient(to right, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`
            : `linear-gradient(to right, ${theme.palette.primary.dark}20, ${theme.palette.secondary.dark}20)`,
        borderColor: `${severity}.light`,
        borderWidth: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={3} alignItems="center">
          {icon && (
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "background.paper",
                boxShadow: 1,
                fontSize: "1.5rem",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {icon}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Stack>

        {actionLabel && onActionClick && (
          <Button
            variant="contained"
            color={severity}
            onClick={onActionClick}
            sx={{ whiteSpace: "nowrap", px: 3 }}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
