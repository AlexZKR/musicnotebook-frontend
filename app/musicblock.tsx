import React, { useEffect, useState, useId, useRef, useCallback } from "react";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

// --- Props Interface ---
interface MusicBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean; // New prop
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

// --- Icons ---
const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DragIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 9l-3 3 3 3" />
    <path d="M9 5l3-3 3 3" />
    <path d="M19 9l3 3-3 3" />
    <path d="M9 19l3 3 3-3" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
  </svg>
);

const DragOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// --- 1. Helper Logic for Note Dragging & Info ---
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

function getNoteName(midiPitch: number) {
  if (typeof midiPitch !== "number" || isNaN(midiPitch)) return "?";
  const noteIndex = midiPitch % 12;
  const octave = Math.floor(midiPitch / 12) - 1;
  return { name: NOTE_NAMES[noteIndex], octave: octave };
}

function getMeasureNumber(abcString: string, charIndex: number) {
  if (charIndex < 0) return 1;
  const substring = abcString.slice(0, charIndex);
  const cleanString = substring.replace(/"[^"]*"/g, "");
  const matches = cleanString.match(/\|+|\[\||\|\]|:\||\|:/g);
  return matches ? matches.length + 1 : 1;
}

function moveNote(note: string, step: number) {
  const x = allPitches.indexOf(note);
  if (x >= 0) return allPitches[x - step];
  return note;
}

function tokenize(str: string) {
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

// --- 2. Cursor Control Class ---
class CursorControl {
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

const MusicBlock = ({
  id,
  initialContent,
  isLocked,
  onUpdate,
  onDelete,
}: MusicBlockProps) => {
  const paperId = `paper-${id}`;
  const audioId = `audio-${id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  // If locked, ensure editing mode is closed
  useEffect(() => {
    if (isLocked) {
      setIsEditing(false);
      // We can also disable dragging if locked, or keep it as "play only"?
      // User request: "For musical block this means you don't see those icons (change pitch and abc editor) and help text on the right side"
      // This implies dragging to change pitch should probably be disabled if the icons are gone, or at least the toggle is gone.
      // Let's assume locked = "read only" / "play only".
      setIsDraggingEnabled(false);
    } else {
      // Restore default behavior if unlocked? Or keep last state?
      // Default to drag on for good UX when unlocking
      setIsDraggingEnabled(true);
    }
  }, [isLocked]);

  // Use initialContent
  const [abcString, setAbcString] = useState(initialContent);

  const [highlight, setHighlight] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [noteInfo, setNoteInfo] = useState<{
    name: string;
    octave: number;
    measure: number;
  } | null>(null);

  const synthControlRef = useRef<any>(null);

  // Sync to parent when abcString changes
  const handleContentChange = (newContent: string) => {
    setAbcString(newContent);
    onUpdate(newContent);
  };

  // --- 3. Interaction Handler (Click & Drag) ---
  const handleNoteClick = useCallback(
    (
      abcelem: any,
      tuneNumber: number,
      classes: string,
      analysis: any,
      drag: any
    ) => {
      // A. HIGHLIGHT LOGIC
      let newHighlight = null;
      let currentNoteName = "";
      let currentOctave = 0;

      if (abcelem.startChar >= 0 && abcelem.endChar >= 0) {
        newHighlight = { start: abcelem.startChar, end: abcelem.endChar };
      }

      // B. SOUND & PITCH LOGIC
      if (
        abcjs.synth.supportsAudio() &&
        abcelem.midiPitches &&
        abcelem.midiPitches.length > 0
      ) {
        // If locked, drag.step will always be 0 (dragging disabled in render options)
        const step = drag ? drag.step : 0;

        const shiftedPitches = abcelem.midiPitches.map((p: any) => {
          return { ...p, pitch: p.pitch + step };
        });

        const primaryPitch = shiftedPitches[0].pitch;
        const parsed = getNoteName(primaryPitch);
        if (typeof parsed === "object") {
          currentNoteName = parsed.name;
          currentOctave = parsed.octave;
        }

        abcjs.synth
          .playEvent(shiftedPitches, abcelem.midiGraceNotePitches, 400)
          .catch((err) => console.warn("Synth error:", err));
      }

      // C. EDIT LOGIC (Dragging)
      // Only allow editing if not locked (though dragging prop handles most of this)
      if (
        !isLocked &&
        drag &&
        drag.step &&
        abcelem.startChar >= 0 &&
        abcelem.endChar >= 0
      ) {
        const originalText = abcString.substring(
          abcelem.startChar,
          abcelem.endChar
        );
        const arr = tokenize(originalText);

        for (let i = 0; i < arr.length; i++) {
          arr[i] = moveNote(arr[i], drag.step);
        }
        const newText = arr.join("");
        const newAbc =
          abcString.substring(0, abcelem.startChar) +
          newText +
          abcString.substring(abcelem.endChar);

        handleContentChange(newAbc);

        if (newHighlight) {
          newHighlight.end = abcelem.startChar + newText.length;
        }
      }

      // D. UPDATE INFO STATE
      setHighlight(newHighlight);
      if (currentNoteName && newHighlight) {
        setNoteInfo({
          name: currentNoteName,
          octave: currentOctave,
          measure: getMeasureNumber(abcString, newHighlight.start),
        });
      } else {
        setNoteInfo(null);
      }
    },
    [abcString, isLocked] // Added isLocked dependency
  );

  useEffect(() => {
    const visualObj = abcjs.renderAbc(paperId, abcString, {
      responsive: "resize",
      add_classes: true,
      dragging: isDraggingEnabled && !isLocked, // Disable dragging at source if locked
      clickListener: handleNoteClick,
      selectTypes: ["note"],
    })[0];

    if (abcjs.synth.supportsAudio()) {
      if (!synthControlRef.current) {
        synthControlRef.current = new abcjs.synth.SynthController();
      }

      const synthControl = synthControlRef.current;

      // PASS CALLBACK TO CURSOR CONTROL
      const cursorControl = new CursorControl(
        `#${paperId}`,
        (start, end, event) => {
          if (start === -1 || end === -1) {
            setHighlight(null);
            setNoteInfo(null);
          } else {
            setHighlight({ start, end });

            if (event && event.midiPitches && event.midiPitches.length > 0) {
              const parsed = getNoteName(event.midiPitches[0].pitch);
              if (typeof parsed === "object") {
                setNoteInfo({
                  name: parsed.name,
                  octave: parsed.octave,
                  measure: getMeasureNumber(abcString, start),
                });
              }
            }
          }
        }
      );

      synthControl.load(`#${audioId}`, cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      });

      const createSynth = new abcjs.synth.CreateSynth();
      createSynth
        .init({ visualObj: visualObj })
        .then(() => {
          synthControl.setTune(visualObj, false).then(() => {
            // Loaded
          });
        })
        .catch(console.warn);
    }
  }, [
    abcString,
    paperId,
    audioId,
    handleNoteClick,
    isDraggingEnabled,
    isLocked,
  ]);

  const renderBackdrop = () => {
    if (!highlight || highlight.start < 0 || highlight.end > abcString.length) {
      return abcString;
    }
    const before = abcString.slice(0, highlight.start);
    const match = abcString.slice(highlight.start, highlight.end);
    const after = abcString.slice(highlight.end);
    return (
      <>
        {before}
        <span className="bg-yellow-200 text-gray-900 rounded-sm">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900 group">
      <style>{`
        #${paperId} .abcjs-highlight { fill: #3b82f6; }
        #${paperId} .abcjs-cursor { stroke: red; }
      `}</style>

      {/* Delete Button (Only visible on hover AND unlocked) */}
      {!isLocked && (
        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete Block"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col">
        {/* Preview Side */}
        <div className="w-full p-4 flex flex-col justify-between bg-white">
          {/* HEADER ROW: Info & Buttons */}
          <div className="flex flex-wrap justify-between items-start mb-4 gap-4 pl-8 min-h-[3rem]">
            {/* LEFT: Info Display */}
            <div className="flex flex-col gap-1 justify-center">
              {!isLocked && (
                <p className="text-xs text-gray-400">
                  {isDraggingEnabled
                    ? "Click any note to play it. Drag notes up or down to change their pitch."
                    : "Click notes to highlight them in the code editor."}
                </p>
              )}

              {noteInfo ? (
                <div className="flex items-center gap-2 text-xs font-mono animate-in fade-in duration-200">
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 shadow-sm flex items-baseline gap-1">
                    <span className="text-gray-500 uppercase text-[10px] font-bold">
                      Pitch
                    </span>
                    <span className="text-lg font-bold leading-none">
                      {noteInfo.name}
                    </span>
                    <span className="text-sm text-blue-500 font-medium">
                      {noteInfo.octave}
                    </span>
                  </div>
                  <div className="bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200 shadow-sm flex items-baseline gap-1">
                    <span className="text-gray-400 uppercase text-[10px] font-bold">
                      Bar
                    </span>
                    <span className="font-bold">{noteInfo.measure}</span>
                  </div>
                </div>
              ) : (
                // Keep spacer if unlocked, or if Locked but no info showing?
                // Actually if locked and no info, we might want cleaner UI.
                // But keeping height prevents layout shift when clicking notes.
                <div className="h-[2rem] w-full" aria-hidden="true"></div>
              )}
            </div>

            {/* RIGHT: Control Icons (HIDDEN IF LOCKED) */}
            {!isLocked && (
              <div className="flex items-center gap-2">
                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsDraggingEnabled(!isDraggingEnabled)}
                    className={`p-2 rounded-md transition-all ${
                      isDraggingEnabled
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                    aria-label={
                      isDraggingEnabled
                        ? "Disable Pitch Dragging"
                        : "Enable Pitch Dragging"
                    }
                  >
                    {isDraggingEnabled ? <DragIcon /> : <DragOffIcon />}
                  </button>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {isDraggingEnabled
                      ? "Pitch Dragging Active"
                      : "Pitch Dragging Disabled"}
                  </div>
                </div>

                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-2 rounded-md transition-all ${
                      isEditing
                        ? "bg-gray-800 text-white hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600"
                    }`}
                    aria-label={
                      isEditing ? "Close Code Editor" : "Open Code Editor"
                    }
                  >
                    {isEditing ? <CloseIcon /> : <EditIcon />}
                  </button>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {isEditing ? "Close Editor" : "Edit Source Code"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div
              id={paperId}
              className="w-full text-center text-black [&_svg]:w-full [&_path]:fill-current [&_text]:fill-current"
            ></div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-gray-900">
            <div id={audioId}></div>
          </div>
        </div>

        {/* Editor Side (Only if unlocked and editing active) */}
        {isEditing && !isLocked && (
          <div className="w-full p-4 border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 fade-in duration-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">
              ABC Notation Editor
            </h3>

            <div className="relative w-full h-48 border border-gray-300 rounded bg-white overflow-hidden">
              <div
                className="absolute inset-0 p-2 font-mono text-sm whitespace-pre-wrap break-words pointer-events-none text-gray-900"
                aria-hidden="true"
              >
                {renderBackdrop()}
              </div>

              <textarea
                value={abcString}
                onChange={(e) => {
                  handleContentChange(e.target.value);
                  setHighlight(null);
                  setNoteInfo(null);
                }}
                className="absolute inset-0 w-full h-full p-2 font-mono text-sm bg-transparent text-transparent caret-black focus:outline-none resize-none z-10"
                spellCheck="false"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Tip: Drag notes on the staff to see the code update in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicBlock;
