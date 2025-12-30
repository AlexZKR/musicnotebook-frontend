import React from "react";
import { NavLink, useLocation } from "react-router";
import { Button, Stack, Box, useTheme, alpha } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LinkIcon from "@mui/icons-material/Link";

type ModeButtonProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

function ModeButton({ to, label, icon }: ModeButtonProps) {
  const location = useLocation();
  const theme = useTheme();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      component={NavLink}
      to={to}
      variant={isActive ? "contained" : "text"}
      color="primary"
      startIcon={icon}
      sx={{
        borderRadius: "99px",
        px: 3,
        py: 1,
        fontWeight: 700,
        textTransform: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        bgcolor: isActive
          ? "primary.main"
          : alpha(theme.palette.text.primary, 0.05),
        color: isActive ? "common.white" : "text.secondary",
        "&:hover": {
          bgcolor: isActive
            ? "primary.dark"
            : alpha(theme.palette.primary.main, 0.1),
          transform: "translateY(-1px)",
        },
      }}
    >
      {label}
    </Button>
  );
}

export function TheoryPracticeNav() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <ModeButton
        to="/courses"
        label="Theory"
        icon={<MenuBookIcon fontSize="small" />}
      />

      <Box
        sx={{
          width: 48,
          height: 2,
          bgcolor: "divider",
          mx: -1,
          position: "relative",
          zIndex: -1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 0.5,
            bgcolor: "background.paper",
            borderRadius: "50%",
            border: "1px solid",
            borderColor: "divider",
            color: "text.disabled",
            animation: "spin 10s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          <LinkIcon sx={{ fontSize: 14 }} />
        </Box>
      </Box>

      <ModeButton
        to="/songbook"
        label="Practice"
        icon={<LibraryMusicIcon fontSize="small" />}
      />
    </Stack>
  );
}
