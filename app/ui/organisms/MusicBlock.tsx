import React, { useEffect, useState, useRef, useCallback } from "react";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

import {
  getNoteName,
  getMeasureNumber,
  moveNote,
  tokenize,
  CursorControl,
} from "~/features/notebook/model/music";
import { BlockDeleteButton } from "~/ui/molecules/BlockDeleteButton";
import { NoteInfoDisplay } from "~/ui/molecules/NoteInfoDisplay";
import { EditIcon } from "~/ui/atoms/icons/EditIcon";
import { CloseIcon } from "~/ui/atoms/icons/CloseIcon";
import { DragIcon } from "~/ui/atoms/icons/DragIcon";
import { DragOffIcon } from "~/ui/atoms/icons/DragOffIcon";

export interface MusicBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

export default function MusicBlock({
  id,
  initialContent,
  isLocked,
  onUpdate,
  onDelete,
}: MusicBlockProps) {
  const paperId = `paper-${id}`;
  const audioId = `audio-${id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  useEffect(() => {
    if (isLocked) {
      setIsEditing(false);
      setIsDraggingEnabled(false);
    } else {
      setIsDraggingEnabled(true);
    }
  }, [isLocked]);

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

  const handleContentChange = (newContent: string) => {
    setAbcString(newContent);
    onUpdate(newContent);
  };

  const handleNoteClick = useCallback(
    (
      abcelem: any,
      tuneNumber: number,
      classes: string,
      analysis: any,
      drag: any
    ) => {
      let newHighlight = null;
      let currentNoteName = "";
      let currentOctave = 0;

      if (abcelem.startChar >= 0 && abcelem.endChar >= 0) {
        newHighlight = { start: abcelem.startChar, end: abcelem.endChar };
      }

      if (
        abcjs.synth.supportsAudio() &&
        abcelem.midiPitches &&
        abcelem.midiPitches.length > 0
      ) {
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
    [abcString, isLocked]
  );

  useEffect(() => {
    const visualObj = abcjs.renderAbc(paperId, abcString, {
      responsive: "resize",
      add_classes: true,
      dragging: isDraggingEnabled && !isLocked,
      clickListener: handleNoteClick,
      selectTypes: ["note"],
    })[0];

    if (abcjs.synth.supportsAudio()) {
      if (!synthControlRef.current) {
        synthControlRef.current = new abcjs.synth.SynthController();
      }

      const synthControl = synthControlRef.current;

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
          synthControl.setTune(visualObj, false);
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

      {!isLocked && <BlockDeleteButton onClick={onDelete} />}

      <div className="flex flex-col">
        <div className="w-full p-3 sm:p-4 flex flex-col justify-between bg-white">
          <div className="flex flex-wrap justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-4 pl-8 min-h-12">
            <div className="flex flex-col gap-1 justify-center">
              {!isLocked && (
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {isDraggingEnabled
                    ? "Click any note to play it. Drag notes up or down to change their pitch."
                    : "Click notes to highlight them in the code editor."}
                </p>
              )}

              {noteInfo ? (
                <NoteInfoDisplay
                  name={noteInfo.name}
                  octave={noteInfo.octave}
                  measure={noteInfo.measure}
                />
              ) : (
                <div className="h-8 w-full" aria-hidden="true"></div>
              )}
            </div>

            {!isLocked && (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsDraggingEnabled(!isDraggingEnabled)}
                    className={`p-2 rounded-md transition-all touch-manipulation ${
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
                  <div className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {isDraggingEnabled
                      ? "Pitch Dragging Active"
                      : "Pitch Dragging Disabled"}
                  </div>
                </div>

                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-2 rounded-md transition-all touch-manipulation ${
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
                  <div className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
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

        {isEditing && !isLocked && (
          <div className="w-full p-3 sm:p-4 border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 fade-in duration-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">
              ABC Notation Editor
            </h3>

            <div className="relative w-full h-48 sm:h-56 border border-gray-300 rounded bg-white overflow-hidden">
              <div
                className="absolute inset-0 p-2 font-mono text-xs sm:text-sm whitespace-pre-wrap wrap-break-word pointer-events-none text-gray-900"
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
                className="absolute inset-0 w-full h-full p-2 font-mono text-xs sm:text-sm bg-transparent text-transparent caret-black focus:outline-none resize-none z-10"
                spellCheck="false"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
              Tip: Drag notes on the staff to see the code update in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
