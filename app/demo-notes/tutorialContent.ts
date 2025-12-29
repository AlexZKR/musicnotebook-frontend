import type { BlockData } from "~/notebook";

// --- TUTORIAL CONTENT DATA ---
export const TUTORIAL_CONTENT: BlockData[] = [
  {
    id: "tut-1",
    type: "text",
    content:
      "# Welcome to Music Notebook! 👋\n\nThis is an **Interactive Notebook**. Unlike a PDF or a physical book, you can edit everything you see here.\n\nThis short tutorial will show you how to use the musical features.",
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
    id: "tut-6",
    type: "text",
    content:
      "### 3. Reordering Blocks\n\nYou can rearrange this entire page. Hover your mouse over the **left side** of any block (text or music) to see a drag handle (::). Grab it to move sections around.\n\n**You are now ready to start your journey!** Click 'Back to Map' above to choose a real lesson.",
  },
];
