import React from "react";
import { NavLink } from "react-router";
import { Button } from "@mui/material";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavButton = ({ to, children, onClick }: NavButtonProps) => (
  <Button
    component={NavLink}
    to={to}
    end={to === "/"}
    color="inherit"
    onClick={onClick}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.875rem",
      "&.active": {
        color: "primary.main",
      },
    }}
  >
    {children}
  </Button>
);
