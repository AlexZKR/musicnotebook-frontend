import React from "react";
import { Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { Link as RouterLink } from "react-router";

type HeroButtonProps = {
  to: string;
  label: string;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: "primary" | "success" | "inherit";
  sx?: SxProps;
};

export default function HeroButton({
  to,
  label,
  variant = "contained",
  size = "large",
  startIcon,
  endIcon,
  color,
  sx,
}: HeroButtonProps) {
  return (
    <Button
      component={RouterLink}
      to={to}
      variant={variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      color={color}
      sx={{ px: 4, py: 1.5, fontSize: "1.1rem", textTransform: "none", ...sx }}
    >
      {label}
    </Button>
  );
}
