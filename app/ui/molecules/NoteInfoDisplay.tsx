import React from "react";

interface NoteInfoDisplayProps {
  name: string;
  octave: number;
  measure: number;
}

export function NoteInfoDisplay({
  name,
  octave,
  measure,
}: NoteInfoDisplayProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono animate-in fade-in duration-200">
      <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 shadow-sm flex items-baseline gap-1">
        <span className="text-gray-500 uppercase text-[10px] font-bold">
          Pitch
        </span>
        <span className="text-lg font-bold leading-none">{name}</span>
        <span className="text-sm text-blue-500 font-medium">{octave}</span>
      </div>
      <div className="bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200 shadow-sm flex items-baseline gap-1">
        <span className="text-gray-400 uppercase text-[10px] font-bold">
          Bar
        </span>
        <span className="font-bold">{measure}</span>
      </div>
    </div>
  );
}
