import React from "react";
import { Outlet } from "react-router";
import { Box, Container } from "@mui/material"; // Import MUI components
import { AppNavBar } from "~/ui/organisms";

export function meta() {
  return [
    { title: "Music Notebook" },
    { name: "description", content: "Interactive Music Learning" },
  ];
}

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppNavBar />

      <Container
        component="main"
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
