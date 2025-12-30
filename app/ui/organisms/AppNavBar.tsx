import React, { useState } from "react";
import { NavLink } from "react-router";
import { Logo } from "~/ui/atoms/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeToggle, NavButton } from "~/ui/atoms";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

type AppNavBarProps = {
  onSignIn?: () => void;
};

export default function AppNavBar({ onSignIn }: AppNavBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    handleMenuClose();
    if (onSignIn) return onSignIn();
    alert(
      "To be implemented. You will be able to log in to track your progress."
    );
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: "background.paper",
        backdropFilter: "blur(8px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo onClick={handleMenuClose} />

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box display="flex" gap={2} alignItems="center">
            <ThemeToggle />
            <NavButton to="/courses">Courses</NavButton>
            <NavButton to="/">Home</NavButton>
            <NavButton to="/about">About</NavButton>
            <Button
              onClick={handleSignIn}
              color="inherit"
              sx={{ fontWeight: 600, textTransform: "none" }}
            >
              Sign in
            </Button>
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
            <ThemeToggle />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem
                component={NavLink}
                to="/roadmap"
                onClick={handleMenuClose}
              >
                <Typography fontWeight={600}>Roadmap</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/"
                end
                onClick={handleMenuClose}
              >
                <Typography fontWeight={600}>Home</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/about"
                onClick={handleMenuClose}
              >
                <Typography fontWeight={600}>About</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignIn}>
                <Typography fontWeight={600}>Sign in</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
