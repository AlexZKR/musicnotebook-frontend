import type { BlockData } from "~/notebook";

export const SIMPLE_INTERVALS_LESSON: BlockData[] = [
  {
    id: "si-intro",
    type: "text",
    content:
      "# Simple Intervals\n\nSimple intervals are those that fit within one octave. We name them by counting the letter names from the bottom note to the top note.",
  },
  {
    id: "si-seconds",
    type: "text",
    content:
      "### 1. Seconds (2nd)\n\nA **Second** is the distance between two adjacent note names (e.g., C to D).\n- **Major 2nd**: 2 semitones (Happy, whole step)\n- **Minor 2nd**: 1 semitone (Tense, half step, Jaws theme)",
  },
  {
    id: "si-seconds-demo",
    type: "music",
    content: `T: Seconds
M: 4/4
L: 1/2
K: C
"Maj 2nd" [C D] "Min 2nd" [C _D] |]`,
  },
  {
    id: "si-thirds",
    type: "text",
    content:
      "### 2. Thirds (3rd)\n\nThirds determine if a chord is Major or Minor.\n- **Major 3rd**: 4 semitones (Bright, happy)\n- **Minor 3rd**: 3 semitones (Sad, dark)\n\n**Try it:** Change the E below to _E (flat) to hear the difference.",
  },
  {
    id: "si-thirds-demo",
    type: "music",
    content: `T: Thirds
M: 4/4
L: 1/1
K: C
[C E] |]`,
  },
  {
    id: "si-perfect",
    type: "text",
    content:
      "### 3. Perfect Intervals (4th & 5th)\n\nThe 4th and 5th are called 'Perfect' because they are highly consonant and stable.\n- **Perfect 4th**: 5 semitones (Here Comes the Bride)\n- **Perfect 5th**: 7 semitones (Star Wars theme)",
  },
  {
    id: "si-perfect-demo",
    type: "music",
    content: `T: Perfect Intervals
M: 4/4
L: 1/2
K: C
"P4" [C F] "P5" [C G] |]`,
  },
  {
    id: "si-quiz",
    type: "text",
    content:
      "### Pop Quiz\n\nCreate a **Perfect 5th** starting on D. (Hint: D is 2, so count up 7 semitones or 5 letter names).",
  },
  {
    id: "si-quiz-block",
    type: "music",
    content: `T: Quiz
M: 4/4
L: 1/1
K: C
D z |]`,
  },
];
