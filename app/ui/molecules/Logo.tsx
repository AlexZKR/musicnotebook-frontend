import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Link from "../atoms/Link";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  const theme = useTheme();

  return (
    <Link
      to="/"
      onClick={onClick}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover .logo-icon": {
          transform: "rotate(-12deg) scale(1.1)",
        },
        "&:hover .logo-text": {
          color: "primary.main",
        },
      }}
    >
      {/* Icon Wrapper */}
      <Box
        className="logo-icon"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 2, // Matches theme.shape.borderRadius
          bgcolor: "primary.main",
          color: "primary.contrastText",
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
          transition: theme.transitions.create([
            "transform",
            "background-color",
          ]),
        }}
      >
        <MusicNoteIcon sx={{ fontSize: 28 }} />
      </Box>

      {/* Text Branding */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          className="logo-text"
          sx={{
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "text.primary", // Automatically switches in Dark Mode
            transition: theme.transitions.create("color"),
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Music
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "text.secondary",
            fontSize: "0.65rem",
          }}
        >
          Notebook
        </Typography>
      </Box>
    </Link>
  );
}
