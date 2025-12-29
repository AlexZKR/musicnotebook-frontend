import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "~/context/ThemeContext";

export const ThemeToggle = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
