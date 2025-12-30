import React from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  Avatar,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ShareIcon from "@mui/icons-material/Share";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export function meta() {
  return [{ title: "About | Music Notebook" }];
}

type FeaturePointProps = {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
};

function FeaturePoint({ icon, title, text }: FeaturePointProps) {
  const theme = useTheme();
  return (
    <Box display="flex" gap={2}>
      <Avatar
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AboutRoute() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={8}>
        {/* Header */}
        <Box textAlign="center">
          <Typography
            variant="overline"
            color="primary"
            fontWeight="bold"
            letterSpacing={1.5}
          >
            Our Mission
          </Typography>
          <Typography variant="h2" fontWeight="800" sx={{ mt: 1, mb: 3 }}>
            Reclaiming Music Education
          </Typography>
          <Typography variant="h5" color="text.secondary" fontWeight="normal">
            We believe that the best way to learn music isn&apos;t to passively
            consume a video course. It&apos;s to actively{" "}
            <strong>build your own textbook</strong>.
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <FeaturePoint
              icon={<EditNoteIcon />}
              title="Active Learning over Passive Watching"
              text={
                <>
                  Most platforms sell you a course from an expert. You watch it,
                  nod your head, and forget it a week later.{" "}
                  <strong>Music Notebook</strong> is different. It&apos;s a
                  place for <em>you</em> to take notes. When you write down a
                  concept and create a musical example for it yourself, you own
                  that knowledge forever.
                </>
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FeaturePoint
              icon={<MusicNoteIcon />}
              title="A Songbook That Teaches You"
              text={
                <>
                  Traditional songbooks are just chords on a page. Ours are
                  interactive documents. Found a song with a weird chord? Link
                  that measure directly to your &quot;Secondary Dominants&quot;
                  theory notebook. Connect the <em>Practice</em> of playing to
                  the <em>Theory</em> of understanding.
                </>
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FeaturePoint
              icon={<ShareIcon />}
              title="Shareable Knowledge"
              text="Once you've built a great explanation or a perfect practice guide for a song, share it. Clone notebooks from others, improve them, and contribute back to the community."
            />
          </Grid>
        </Grid>

        {/* Closing */}
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "1px dashed",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" fontStyle="italic" color="text.secondary">
            &quot;Music theory is not a set of rules. It is a set of
            tools.&quot;
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
