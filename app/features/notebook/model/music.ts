const allPitches = [
  "C,,,,",
  "D,,,,",
  "E,,,,",
  "F,,,,",
  "G,,,,",
  "A,,,,",
  "B,,,,",
  "C,,,",
  "D,,,",
  "E,,,",
  "F,,,",
  "G,,,",
  "A,,,",
  "B,,,",
  "C,,",
  "D,,",
  "E,,",
  "F,,",
  "G,,",
  "A,,",
  "B,,",
  "C,",
  "D,",
  "E,",
  "F,",
  "G,",
  "A,",
  "B,",
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "c",
  "d",
  "e",
  "f",
  "g",
  "a",
  "b",
  "c'",
  "d'",
  "e'",
  "f'",
  "g'",
  "a'",
  "b'",
  "c''",
  "d''",
  "e''",
  "f''",
  "g''",
  "a''",
  "b''",
  "c'''",
  "d'''",
  "e'''",
  "f'''",
  "g'''",
  "a'''",
  "b'''",
  "c''''",
  "d''''",
  "e''''",
  "f''''",
  "g''''",
  "a''''",
  "b''''",
];

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function getNoteName(midiPitch: number) {
  if (typeof midiPitch !== "number" || isNaN(midiPitch)) return "?";
  const noteIndex = midiPitch % 12;
  const octave = Math.floor(midiPitch / 12) - 1;
  return { name: NOTE_NAMES[noteIndex], octave: octave };
}

export function getMeasureNumber(abcString: string, charIndex: number) {
  if (charIndex < 0) return 1;
  const substring = abcString.slice(0, charIndex);
  const cleanString = substring.replace(/"[^"]*"/g, "");
  const matches = cleanString.match(/\|+|\[\||\|\]|:\||\|:/g);
  return matches ? matches.length + 1 : 1;
}

export function moveNote(note: string, step: number) {
  const x = allPitches.indexOf(note);
  if (x >= 0) return allPitches[x - step];
  return note;
}

export function tokenize(str: string) {
  const arr = str.split(/(!.+?!|".+?")/);
  let output: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    const token = arr[i];
    if (token.length > 0) {
      if (token[0] !== '"' && token[0] !== "!") {
        const arr2 = token.split(/([A-Ga-g][,']*)/);
        output = output.concat(arr2);
      } else {
        output.push(token);
      }
    }
  }
  return output;
}

export class CursorControl {
  rootSelector: string;
  cursor: SVGLineElement | null;
  onHighlight: ((start: number, end: number, event?: any) => void) | null;

  constructor(
    rootSelector: string,
    onHighlight?: (start: number, end: number, event?: any) => void
  ) {
    this.rootSelector = rootSelector;
    this.cursor = null;
    this.onHighlight = onHighlight || null;
  }

  onStart() {
    const svg = document.querySelector(`${this.rootSelector} svg`);
    if (!svg) return;

    this.cursor = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    this.cursor.setAttribute("class", "abcjs-cursor");
    this.cursor.setAttributeNS(null, "x1", "0");
    this.cursor.setAttributeNS(null, "y1", "0");
    this.cursor.setAttributeNS(null, "x2", "0");
    this.cursor.setAttributeNS(null, "y2", "0");
    this.cursor.style.stroke = "red";
    this.cursor.style.strokeWidth = "2px";
    svg.appendChild(this.cursor);
  }

  onEvent(ev: any) {
    if (ev.measureStart && ev.left === null) return;

    // A. SVG Highlights
    const lastSelection = document.querySelectorAll(
      `${this.rootSelector} .abcjs-highlight`
    );
    lastSelection.forEach((el) => el.classList.remove("abcjs-highlight"));

    if (ev.elements) {
      ev.elements.forEach((note: any) => {
        note.forEach((path: Element) => path.classList.add("abcjs-highlight"));
      });
    }

    // B. Move Red Cursor
    if (this.cursor) {
      this.cursor.setAttribute("x1", String(ev.left - 2));
      this.cursor.setAttribute("x2", String(ev.left - 2));
      this.cursor.setAttribute("y1", String(ev.top));
      this.cursor.setAttribute("y2", String(ev.top + ev.height));
    }

    // C. Trigger Text Editor Highlight & Info
    if (this.onHighlight) {
      if (
        ev &&
        typeof ev.startChar === "number" &&
        typeof ev.endChar === "number"
      ) {
        this.onHighlight(ev.startChar, ev.endChar, ev);
      } else {
        this.onHighlight(-1, -1);
      }
    }
  }

  onFinished() {
    this.removeSelection();
    if (this.cursor) {
      this.cursor.setAttribute("x1", "0");
      this.cursor.setAttribute("x2", "0");
      this.cursor.setAttribute("y1", "0");
      this.cursor.setAttribute("y2", "0");
    }
    if (this.onHighlight) {
      this.onHighlight(-1, -1);
    }
  }

  removeSelection() {
    const lastSelection = document.querySelectorAll(
      `${this.rootSelector} .abcjs-highlight`
    );
    lastSelection.forEach((el) => el.classList.remove("abcjs-highlight"));
  }
}
