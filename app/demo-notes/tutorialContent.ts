import type { BlockData } from "~/notebook";

// --- TUTORIAL CONTENT DATA ---
export const TUTORIAL_CONTENT: BlockData[] = [
  {
    id: "tut-1",
    type: "text",
    content:
      "# Welcome to Music Notebook! 👋\n\nThis is an **Interactive Notebook**. Unlike a PDF or a physical book, you can edit everything you see here.\n\nThis tutorial will show you how to use the musical features and the basics of **ABC Notation**.",
    isLocked: true,
  },
  {
    id: "tut-2",
    type: "text",
    content:
      "### 1. Playback & Code\n\nBelow is a music block. \n1. Click the **Play** button (bottom right of the block) to hear it.\n2. Click the **Edit Code** button to see the ABC notation used to generate it.",
    isLocked: true,
  },
  {
    id: "tut-3",
    type: "music",
    content: `T: My First Melody
M: 4/4
L: 1/4
K: C
C D E F | G2 G2 | A A G G | F F E2 |]`,
    isLocked: false,
  },
  {
    id: "tut-4",
    type: "text",
    content:
      "### 2. Interactive Dragging 🖱️\n\nDid you know you can compose with your mouse?\n\n**Try this:** In the block below, click on a note head and **drag it up or down**. You'll hear the pitch change, and the code will update automatically!",
    isLocked: true,
  },
  {
    id: "tut-5",
    type: "music",
    content: `T: Drag Me!
M: 4/4
L: 1/4
K: C
C E G c | c G E C |]`,
    isLocked: false,
  },
  {
    id: "tut-abc-intro",
    type: "text",
    content:
      "### 3. ABC Notation Basics 📝\n\nOur notebooks use **ABC Notation**, a simple text-based format for music. You don't need to be an expert, but knowing the basics helps!\n\n**Pitch:**\n* `C D E F G A B` are the notes in the middle octave.\n* `c d e f g a b` (lowercase) are notes an octave higher.\n* `C, D, E,` (with a comma) are notes an octave lower.\n\n**Rhythm:**\n* A number after a letter multiplies the length: `C2` is twice as long as `C`.\n* A slash divides the length: `C/2` is half as long.\n\n**Try editing the block below:** Change `C` to `c` (high C) or `C2` (long C).",
    isLocked: true,
  },
  {
    id: "tut-abc-demo",
    type: "music",
    content: `T: ABC Playground
M: 4/4
L: 1/4
K: C
C D E F | G A B c | C2 G2 | c4 |]`,
    isLocked: false,
  },
  {
    id: "tut-abc-advanced",
    type: "text",
    content:
      "### 4. Keys and Chords\n\n**Key Signature (`K:`):**\nChange `K: C` to `K: G` (one sharp) or `K: F` (one flat) to automatically change the key signature.\n\n**Chords:**\nPut notes inside brackets `[]` to play them together. Example: `[C E G]` is a C Major chord.\n\n**Try it below:** Change the Key to `K: D` (two sharps) and listen!",
    isLocked: true,
  },
  {
    id: "tut-abc-chords",
    type: "music",
    content: `T: Chords & Keys
M: 4/4
L: 1/2
K: C
[C E G] [F A c] | [G B d] [C E G] |]`,
    isLocked: false,
  },
  {
    id: "tut-6",
    type: "text",
    content:
      "### 5. Reordering & Locking Blocks\n\nYou can rearrange this entire page. Hover your mouse over the **left side** of any block (text or music) to see a drag handle (::). Grab it to move sections around.\n\n**Locking:**\nNotice the lock icon next to the drag handle? You can click it to **Lock** or **Unlock** any block.\n* **Locked Blocks:** Cannot be edited. Great for reading.\n* **Unlocked Blocks:** Fully editable.\n\n**Global Lock:**\nUse the lock button in the floating toolbar (bottom center) to lock or unlock ALL blocks at once.",
    isLocked: true,
  },
];
