import React from "react";
import "abcjs/abcjs-audio.css";

import { NoteInfoDisplay } from "~/ui/molecules/NoteInfoDisplay";
import { NotebookBlock } from "~/ui/molecules/NotebookBlock";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DragIcon from "@mui/icons-material/OpenWith";
import DragOffIcon from "@mui/icons-material/PanToolAltOutlined";
import { useAbcJs } from "./useAbcJs";

export interface MusicBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

interface MusicBlockContentProps extends MusicBlockProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  isDraggingEnabled: boolean;
  setIsDraggingEnabled: (val: boolean) => void;
}

function MusicBlockContent({
  id,
  initialContent,
  isLocked,
  onUpdate,
  isEditing,
  setIsEditing,
  isDraggingEnabled,
  setIsDraggingEnabled,
}: Omit<MusicBlockContentProps, "onDelete">) {
  const effectiveIsEditing = isLocked ? false : isEditing;
  const effectiveIsDraggingEnabled = isLocked ? false : isDraggingEnabled;

  const {
    abcString,
    noteInfo,
    handleContentChange,
    renderBackdrop,
    paperId,
    audioId,
    setHighlight,
    setNoteInfo,
  } = useAbcJs({
    id,
    initialContent,
    isLocked,
    isDraggingEnabled: effectiveIsDraggingEnabled,
    onUpdate,
  });

  const backdropResult = renderBackdrop(abcString);

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900 group">
      <style>{`
        #${paperId} .abcjs-highlight { fill: #3b82f6; }
        #${paperId} .abcjs-cursor { stroke: red; }
      `}</style>

      <div className="flex flex-col">
        <div className="w-full p-3 sm:p-4 flex flex-col justify-between bg-white">
          <div className="flex flex-wrap justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-4 pl-8 min-h-12">
            <div className="flex flex-col gap-1 justify-center">
              {!isLocked && (
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {effectiveIsDraggingEnabled
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
                      effectiveIsDraggingEnabled
                        ? "Disable Pitch Dragging"
                        : "Enable Pitch Dragging"
                    }
                  >
                    {effectiveIsDraggingEnabled ? (
                      <DragIcon />
                    ) : (
                      <DragOffIcon />
                    )}
                  </button>
                  <div className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {effectiveIsDraggingEnabled
                      ? "Pitch Dragging Active"
                      : "Pitch Dragging Disabled"}
                  </div>
                </div>

                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-2 rounded-md transition-all touch-manipulation ${
                      effectiveIsEditing
                        ? "bg-gray-800 text-white hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600"
                    }`}
                    aria-label={
                      effectiveIsEditing
                        ? "Close Code Editor"
                        : "Open Code Editor"
                    }
                  >
                    {effectiveIsEditing ? <CloseIcon /> : <EditIcon />}
                  </button>
                  <div className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {effectiveIsEditing ? "Close Editor" : "Edit Source Code"}
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

        {effectiveIsEditing && !isLocked && (
          <div className="w-full p-3 sm:p-4 border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 fade-in duration-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">
              ABC Notation Editor
            </h3>

            <div className="relative w-full h-48 sm:h-56 border border-gray-300 rounded bg-white overflow-hidden">
              <div
                className="absolute inset-0 p-2 font-mono text-xs sm:text-sm whitespace-pre-wrap wrap-break-word pointer-events-none text-gray-900"
                aria-hidden="true"
              >
                {typeof backdropResult === "string" ? (
                  backdropResult
                ) : (
                  <>
                    {backdropResult.before}
                    <span className="bg-yellow-200 text-gray-900 rounded-sm">
                      {backdropResult.match}
                    </span>
                    {backdropResult.after}
                  </>
                )}
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

export default function MusicBlock(props: MusicBlockProps) {
  return (
    <NotebookBlock
      id={props.id}
      isLocked={props.isLocked}
      onToggleLock={props.onToggleLock}
      onDelete={props.onDelete}
    >
      {(isEditing, setIsEditing, isDraggingEnabled, setIsDraggingEnabled) => (
        <MusicBlockContent
          {...props}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isDraggingEnabled={isDraggingEnabled}
          setIsDraggingEnabled={setIsDraggingEnabled}
        />
      )}
    </NotebookBlock>
  );
}
