import type { BlockData } from "~/notebook";

// --- TUTORIAL CONTENT DATA ---
export const TUTORIAL_CONTENT: BlockData[] = [
  {
    id: "tut-1",
    type: "text",
    content:
      "# Welcome to Music Notebook! 👋\n\nThis is an **Interactive Notebook**. Unlike a PDF or a physical book, you can edit everything you see here.\n\nThis tutorial will show you how to use the musical features and the basics of **ABC Notation**.",
  },
  {
    id: "tut-2",
    type: "text",
    content:
      "### 1. Playback & Code\n\nBelow is a music block. \n1. Click the **Play** button (bottom right of the block) to hear it.\n2. Click the **Edit Code** button to see the ABC notation used to generate it.",
  },
  {
    id: "tut-3",
    type: "music",
    content: `T: My First Melody
M: 4/4
L: 1/4
K: C
C D E F | G2 G2 | A A G G | F F E2 |]`,
  },
  {
    id: "tut-4",
    type: "text",
    content:
      "### 2. Interactive Dragging 🖱️\n\nDid you know you can compose with your mouse?\n\n**Try this:** In the block below, click on a note head and **drag it up or down**. You'll hear the pitch change, and the code will update automatically!",
  },
  {
    id: "tut-5",
    type: "music",
    content: `T: Drag Me!
M: 4/4
L: 1/4
K: C
C E G c | c G E C |]`,
  },
  {
    id: "tut-abc-intro",
    type: "text",
    content:
      "### 3. ABC Notation Basics 📝\n\nOur notebooks use **ABC Notation**, a simple text-based format for music. You don't need to be an expert, but knowing the basics helps!\n\n**Pitch:**\n* `C D E F G A B` are the notes in the middle octave.\n* `c d e f g a b` (lowercase) are notes an octave higher.\n* `C, D, E,` (with a comma) are notes an octave lower.\n\n**Rhythm:**\n* A number after a letter multiplies the length: `C2` is twice as long as `C`.\n* A slash divides the length: `C/2` is half as long.\n\n**Try editing the block below:** Change `C` to `c` (high C) or `C2` (long C).",
  },
  {
    id: "tut-abc-demo",
    type: "music",
    content: `T: ABC Playground
M: 4/4
L: 1/4
K: C
C D E F | G A B c | C2 G2 | c4 |]`,
  },
  {
    id: "tut-abc-advanced",
    type: "text",
    content:
      "### 4. Keys and Chords\n\n**Key Signature (`K:`):**\nChange `K: C` to `K: G` (one sharp) or `K: F` (one flat) to automatically change the key signature.\n\n**Chords:**\nPut notes inside brackets `[]` to play them together. Example: `[C E G]` is a C Major chord.\n\n**Try it below:** Change the Key to `K: D` (two sharps) and listen!",
  },
  {
    id: "tut-abc-chords",
    type: "music",
    content: `T: Chords & Keys
M: 4/4
L: 1/2
K: C
[C E G] [F A c] | [G B d] [C E G] |]`,
  },
  {
    id: "tut-6",
    type: "text",
    content:
      "### 5. Reordering Blocks\n\nYou can rearrange this entire page. Hover your mouse over the **left side** of any block (text or music) to see a drag handle (::). Grab it to move sections around.\n\n**You are now ready to start your journey!** Click 'Back to Map' above to choose a real lesson.",
  },
];
