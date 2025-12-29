import React, { useState } from "react";
import type { BlockData } from "~/features/notebook/model/block";
import { getBlockTitle } from "~/features/notebook/model/block";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface NotebookTableOfContentsProps {
  blocks: BlockData[];
}

export function NotebookTableOfContents({
  blocks,
}: NotebookTableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(`block-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full xl:w-96 shrink-0">
      <div className="xl:sticky top-24 bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-xs font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-100 transition-colors touch-manipulation"
        >
          <span>Contents</span>
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 p-2 border-t border-gray-100 overflow-y-auto max-h-[calc(80vh-40px)]">
            {blocks.map((block, index) => (
              <li key={block.id}>
                <button
                  onClick={() => {
                    scrollToBlock(block.id);
                    setIsExpanded(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2 group touch-manipulation"
                >
                  <span className="opacity-70 group-hover:opacity-100 shrink-0 w-6 font-mono text-xs text-gray-400 group-hover:text-gray-600">
                    {index + 1}.
                  </span>
                  <span className="opacity-70 group-hover:opacity-100 shrink-0 w-5">
                    {block.type === "music" ? "🎵" : "📝"}
                  </span>
                  <span className="truncate">{getBlockTitle(block)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
