import { useState, useRef, useCallback, useEffect } from "react";
import abcjs, {
  type AbcElem,
  type ClickListenerAnalysis,
  type ClickListenerDrag,
  type NoteTimingEvent,
  type MidiPitches,
  type MidiGracePitches,
} from "abcjs";
import {
  getNoteName,
  getMeasureNumber,
  moveNote,
  tokenize,
  CursorControl,
} from "~/features/notebook/model/music";

interface UseAbcJsProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  isDraggingEnabled: boolean;
  onUpdate: (content: string) => void;
}

export function useAbcJs({
  id,
  initialContent,
  isLocked,
  isDraggingEnabled,
  onUpdate,
}: UseAbcJsProps) {
  const paperId = `paper-${id}`;
  const audioId = `audio-${id}`;

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

  const synthControlRef = useRef<abcjs.SynthObjectController | null>(null);

  const handleContentChange = useCallback(
    (newContent: string) => {
      setAbcString(newContent);
      onUpdate(newContent);
    },
    [onUpdate]
  );

  const handleNoteClick = useCallback(
    (
      abcelem: AbcElem,
      _tuneNumber: number,
      _classes: string,
      _analysis: ClickListenerAnalysis,
      drag: ClickListenerDrag
    ) => {
      let newHighlight = null;
      let currentNoteName = "";
      let currentOctave = 0;

      if (abcelem.startChar !== undefined && abcelem.endChar !== undefined) {
        newHighlight = { start: abcelem.startChar, end: abcelem.endChar };
      }

      if (
        abcjs.synth.supportsAudio() &&
        abcelem.midiPitches &&
        abcelem.midiPitches.length > 0
      ) {
        const step = drag ? drag.step : 0;

        const shiftedPitches: MidiPitches = abcelem.midiPitches.map((p) => {
          return { ...p, pitch: p.pitch + step };
        });

        const primaryPitch = shiftedPitches[0].pitch;
        const parsed = getNoteName(primaryPitch);
        if (typeof parsed === "object") {
          currentNoteName = parsed.name;
          currentOctave = parsed.octave;
        }

        abcjs.synth
          .playEvent(
            shiftedPitches,
            abcelem.midiGraceNotePitches as MidiGracePitches,
            400
          )
          .catch((err) => console.warn("Synth error:", err));
      }

      if (
        !isLocked &&
        drag &&
        drag.step &&
        abcelem.startChar !== undefined &&
        abcelem.endChar !== undefined
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
    [abcString, isLocked, handleContentChange]
  );

  useEffect(() => {
    const visualObj = abcjs.renderAbc(paperId, abcString, {
      responsive: "resize",
      add_classes: true,
      dragging: isDraggingEnabled,
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
        (start, end, event?: NoteTimingEvent) => {
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
  }, [abcString, isDraggingEnabled, handleNoteClick, paperId, audioId]);

  const renderBackdrop = (content: string) => {
    if (!highlight || highlight.start < 0 || highlight.end > content.length) {
      return content;
    }
    const before = content.slice(0, highlight.start);
    const match = content.slice(highlight.start, highlight.end);
    const after = content.slice(highlight.end);
    return { before, match, after };
  };

  return {
    abcString,
    setAbcString,
    highlight,
    setHighlight,
    noteInfo,
    setNoteInfo,
    handleContentChange,
    handleNoteClick,
    renderBackdrop,
    paperId,
    audioId,
  };
}
