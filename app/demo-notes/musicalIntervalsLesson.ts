import type { BlockData } from "~/notebook";

export const INTERVALS_LESSON: BlockData[] = [
  {
    id: "int-intro",
    type: "text",
    content:
      "# Introduction to Intervals 📏\n\nAn **Interval** is the distance in pitch between two notes.\n\nIntervals are the building blocks of melody and harmony. Understanding them is crucial for everything from identifying chords to writing catchy tunes.",
  },
  {
    id: "int-semitone",
    type: "text",
    content:
      "### The Basic Unit: Semitone\n\nThe smallest interval in Western music is the **Semitone** (or Half Step). \n- On a piano, it's the distance to the immediate next key (black or white).\n- On a guitar, it's one fret.",
  },
  {
    id: "int-demo-basic",
    type: "music",
    content: `T: A Simple Interval
M: 4/4
L: 1/1
K: C
"Interval" [C D] |]`,
  },
  {
    id: "int-structure",
    type: "text",
    content:
      "### How we will learn this\n\nThere are many intervals to learn! We have broken them down into two main categories in the roadmap:\n\n1. **Simple Intervals**: Intervals within an octave (Unison to Octave).\n2. **Compound Intervals**: Intervals larger than an octave (9ths, 11ths, etc.).\n\n**Please go back to the roadmap and select 'Simple Intervals' to begin your deep dive!**",
  },
];
