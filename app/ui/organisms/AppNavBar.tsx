import React, { useState } from "react";
import { NavLink } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { ThemeToggle, NavButton, TheoryPracticeNav, Logo } from "~/ui/atoms";
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
  alpha,
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
    alert("To be implemented.");
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box sx={{ width: isMobile ? "auto" : 200 }}>
          <Logo onClick={handleMenuClose} />
        </Box>

        {!isMobile && <TheoryPracticeNav />}

        {/* Right Side Actions */}
        {!isMobile ? (
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            sx={{ width: 200, justifyContent: "flex-end" }}
          >
            <NavButton to="/about">About</NavButton>
            <ThemeToggle />
            <Button
              onClick={handleSignIn}
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
            >
              Sign in
            </Button>
          </Box>
        ) : (
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
                to="/courses"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <MenuBookIcon fontSize="small" />
                </ListItemIcon>
                <Typography fontWeight={600}>Theory</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/songbook"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <LibraryMusicIcon fontSize="small" />
                </ListItemIcon>
                <Typography fontWeight={600}>Practice</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                component={NavLink}
                to="/about"
                onClick={handleMenuClose}
              >
                <Typography>About</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignIn}>
                <Typography>Sign in</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Helper for the mobile menu icon
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
