import { CheckCircleOutline } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Banner from "~/ui/atoms/Banner";
import Link from "~/ui/atoms/Link";

export function meta() {
  return [{ title: "About | Music Notebook" }];
}

export default function AboutRoute() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        About Music Notebook
      </Typography>

      <Stack spacing={3}>
        <Typography>
          Music Notebook is a Proof-of-Concept (POC) application designed to
          reimagine how we learn music theory. Traditional learning methods
          often separate <em>theory</em> (textbooks) from <em>practice</em>{" "}
          (instruments). We combine them into{" "}
          <strong>interactive documents</strong>.
        </Typography>

        <Alert
          severity="warning"
          icon={<span style={{ fontSize: "1.25rem" }}>🎓</span>}
          sx={{
            alignItems: "flex-start",
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Just getting started?
          </AlertTitle>
          Check out our{" "}
          <Link
            to="/notebook/tutorial"
            color="inherit"
            underline="always"
            sx={{ fontWeight: "bold" }}
          >
            Interactive Tutorial
          </Link>{" "}
          to see the features in action before diving into the main curriculum.
        </Alert>

        <Typography>
          This app uses <strong>ABC Notation</strong> for rendering music.
          It&apos;s a simple, text-based format for music notation. While you
          don&apos;t need to be an expert, knowing the basics helps you create
          your own exercises.{" "}
          <Link
            to="/notebook/tutorial"
            color="inherit"
            underline="always"
            sx={{ fontWeight: "bold" }}
          >
            Learn ABC Notation Basics in the Tutorial
          </Link>
          . For more advanced documentation, visit the{" "}
          <Link
            to="https://abcnotation.com"
            color="inherit"
            underline="always"
            sx={{ fontWeight: "bold" }}
          >
            ABC Notation website
          </Link>
          .
        </Typography>

        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Features
        </Typography>

        <Typography>
          Inspired by developer tools like Jupyter Notebooks, our platform
          allows you to:
        </Typography>

        <List sx={{ pl: 0 }}>
          {[
            "Read explanations alongside the music notation.",
            <>
              <strong>Edit musical notation</strong> in real-time and hear the
              results immediately using our audio engine.
            </>,
            "Visualize concepts through a connected knowledge graph (Roadmap).",
          ].map((text, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ px: 1, py: 0 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleOutline fontSize="inherit" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Banner
          title="Current Status"
          description="This project is currently in active development. Features like user accounts, progress tracking, and community-shared lessons are coming soon!"
        />
      </Stack>
    </Container>
  );
}
