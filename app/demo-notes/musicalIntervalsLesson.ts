import type { BlockData } from "~/notebook";

export const INTERVALS_LESSON: BlockData[] = [
  {
    id: "int-intro",
    type: "text",
    content:
      "# Understanding Intervals 📏\n\nAn **Interval** is simply the distance in pitch between two notes.\n\nThe smallest interval in Western music is the **Semitone** (or Half Step).\n\n### Naming Intervals\nWe name intervals by counting the lines and spaces on the staff between the two notes (inclusive).",
  },
  {
    id: "int-demo-1",
    type: "music",
    content: `T: Seconds and Thirds
M: 4/4
L: 1/4
K: C
"2nd" [C D]2 "3rd" [C E]2 "4th" [C F]2 "5th" [C G]2 |]`,
  },
  {
    id: "int-thirds",
    type: "text",
    content:
      "### Major vs. Minor Thirds\n\nThe quality of an interval changes the mood. A **Major 3rd** (4 semitones) sounds happy, while a **Minor 3rd** (3 semitones) sounds sad.\n\n**Experiment:**\nIn the block below, the first chord is a Major 3rd (C to E). Change the `E` to `_E` (E flat) to hear a Minor 3rd.",
  },
  {
    id: "int-practice",
    type: "music",
    content: `T: Major vs Minor
M: 4/4
L: 1/2
K: C
[C E] [C _E] |]`,
  },
  {
    id: "int-challenge",
    type: "text",
    content:
      "### Challenge\n\nCan you create a **Perfect 5th**? It is 7 semitones (e.g., C to G). Try writing it below!",
  },
  {
    id: "int-challenge-block",
    type: "music",
    content: `T: Perfect 5th Challenge
M: 4/4
L: 1/1
K: C
C G |]`,
  },
];
