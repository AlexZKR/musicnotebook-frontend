// app/ui/theme.ts
import { createTheme, type ThemeOptions } from "@mui/material/styles";

// A fresh, minimal color palette
const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: "#2563eb", // Vibrant Blue
    },
    secondary: {
      main: "#ec4899", // Pink (great for accents)
    },
    background: {
      default: mode === "light" ? "#ffffff" : "#0f172a", // Clean white or deep slate
      paper: mode === "light" ? "#f8fafc" : "#1e293b", // Slightly distinct paper color
    },
    text: {
      primary: mode === "light" ? "#1e293b" : "#f1f5f9",
      secondary: mode === "light" ? "#64748b" : "#94a3b8",
    },
  },
  shape: {
    borderRadius: 12, // Softer corners
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none", // No uppercase buttons -> cleaner look
      fontWeight: 600,
    },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.background.default,
          color: themeParam.palette.text.primary,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "99px", // Pill-shaped buttons
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Removes the default MUI overlay in dark mode
        },
      },
    },
  },
});

export const createAppTheme = (mode: "light" | "dark") =>
  createTheme(getDesignTokens(mode));
