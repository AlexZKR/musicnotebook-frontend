import type { BlockData } from "~/notebook";

export const COMPOUND_INTERVALS_LESSON: BlockData[] = [
  {
    id: "ci-intro",
    type: "text",
    content:
      "# Compound Intervals\n\nCompound intervals are intervals that are **larger than an octave**. They are essentially simple intervals plus 7 note names (an octave).\n\nThey are often used in Jazz and complex chord extensions.",
  },
  {
    id: "ci-ninth",
    type: "text",
    content:
      "### The Ninth (9th)\n\nA 9th is just a **2nd** + an Octave.\n\nIt adds a beautiful, lush texture to chords. It sounds much more open than a 2nd.",
  },
  {
    id: "ci-ninth-demo",
    type: "music",
    content: `T: 2nd vs 9th
M: 4/4
L: 1/2
K: C
"2nd" [C D] "9th" [C d] |]`,
  },
  {
    id: "ci-eleventh",
    type: "text",
    content:
      "### The Eleventh (11th)\n\nAn 11th is a **4th** + an Octave.\n\nIn major chords, we often sharpen it (#11) to avoid clashing with the 3rd.",
  },
  {
    id: "ci-eleventh-demo",
    type: "music",
    content: `T: The 11th
M: 4/4
L: 1/1
K: C
[C f] |]`,
  },
  {
    id: "ci-calc",
    type: "text",
    content:
      "### The Rule of 7\n\nTo figure out a compound interval, just take the simple interval and add 7.\n\n* 2nd + 7 = 9th\n* 4th + 7 = 11th\n* 6th + 7 = 13th",
  },
];
