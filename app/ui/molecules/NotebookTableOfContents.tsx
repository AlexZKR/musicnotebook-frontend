import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  alpha,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DescriptionIcon from "@mui/icons-material/Description";

import type { BlockData } from "~/features/notebook/model/block";
import { getBlockTitle } from "~/features/notebook/model/block";

interface NotebookTableOfContentsProps {
  blocks: BlockData[];
}

export function NotebookTableOfContents({
  blocks,
}: NotebookTableOfContentsProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(`block-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Box sx={{ width: "100%", maxWidth: { xl: 384 }, flexShrink: 0 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          position: { xl: "sticky" },
          top: { xl: 96 },
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Accordion
          expanded={isExpanded}
          onChange={() => setIsExpanded(!isExpanded)}
          disableGutters
          elevation={0}
          sx={{
            bgcolor: "transparent",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: "1.2rem" }} />}
            sx={{
              px: 2,
              minHeight: 48,
              "& .MuiAccordionSummary-content": { my: 1 },
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "text.secondary",
              }}
            >
              Contents
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, borderTop: 1, borderColor: "divider" }}>
            <List
              sx={{
                maxHeight: "calc(80vh - 48px)",
                overflowY: "auto",
                py: 1,
              }}
            >
              {blocks.map((block, index) => (
                <ListItem key={block.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      scrollToBlock(block.id);
                    }}
                    sx={{
                      py: 0.75,
                      px: 2,
                      transition: theme.transitions.create("background-color"),
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        "& .block-index": { color: "primary.main" },
                      },
                    }}
                  >
                    <Typography
                      variant="overline"
                      className="block-index"
                      sx={{
                        width: 24,
                        mr: 1,
                        fontFamily: "monospace",
                        color: "text.disabled",
                        transition: "inherit",
                      }}
                    >
                      {index + 1}.
                    </Typography>
                    <ListItemIcon
                      sx={{ minWidth: 32, color: "text.secondary" }}
                    >
                      {block.type === "music" ? (
                        <MusicNoteIcon fontSize="small" />
                      ) : (
                        <DescriptionIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={getBlockTitle(block)}
                      primaryTypographyProps={{
                        variant: "body2",
                        noWrap: true,
                        sx: { fontWeight: 500 },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}
