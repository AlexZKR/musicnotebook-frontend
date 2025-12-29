import type { BlockData } from "~/features/notebook/model/block";

export const MUSICAL_NOTATION_LESSON: BlockData[] = [
  {
    id: "mn-intro",
    type: "text",
    content:
      "# Musical Notation 101 🎼\n\nWelcome to your first lesson! We will learn how to read notes on a **Staff**.\n\nA musical staff consists of **5 lines** and **4 spaces**. Notes can be placed on a line or in a space.",
  },
  {
    id: "mn-staff-demo",
    type: "music",
    content: `T: The Staff
M: 4/4
L: 1/1
K: C
E F G A B c |]`,
  },
  {
    id: "mn-clef",
    type: "text",
    content:
      "### The Treble Clef 𝄞\n\nThe symbol at the beginning of the staff is called the **Treble Clef** (or G Clef). It generally indicates notes above Middle C.\n\n### Note Names\n\nIn Western music, we use the first 7 letters of the alphabet: **A B C D E F G**.\n\nOnce you get to G, you go back to A. \n\n**Try this:** In the block below, try changing the notes to spell out `C D E F G A B c` (Note: lowercase 'c' is the higher octave).",
  },
  {
    id: "mn-practice",
    type: "music",
    content: `T: C Major Scale
M: 4/4
L: 1/4
K: C
C D E F | G A B c |]`,
  },
];
