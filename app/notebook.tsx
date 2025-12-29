import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MusicBlock from "~/musicblock";
import TextBlock from "~/textblock";

export type BlockType = "text" | "music";

export interface BlockData {
  id: string;
  type: BlockType;
  content: string;
  isLocked?: boolean;
}

const DEFAULT_BLOCKS: BlockData[] = [
  {
    id: "default-1",
    type: "text",
    content: "# New Notebook\n\nStart writing your music theory notes here.",
    isLocked: true,
  },
  {
    id: "default-2",
    type: "music",
    content: `T: Simple Scale
M: 4/4
L: 1/4
K: C
C D E F | G A B c |]`,
    isLocked: true,
  },
];

// --- Icons ---
const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UnlockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
  </svg>
);

const ChevronDownIcon = () => (
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
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// --- Helper: Extract Title ---
const getBlockTitle = (block: BlockData) => {
  let title = "Untitled Block";
  if (block.type === "text") {
    // Try to match markdown headers (# Heading)
    const match = block.content.match(/^#{1,6}\s+(.*)/m);
    if (match) {
      title = match[1];
    } else {
      // Fallback to first line or slice
      title = block.content.split("\n")[0] || "Text Block";
    }
  } else if (block.type === "music") {
    // Match T: Title
    const match = block.content.match(/^T:\s*(.*)/m);
    if (match) {
      title = match[1];
    } else {
      title = "Untitled Music";
    }
  }

  // Max length truncate
  if (title.length > 50) {
    return title.substring(0, 50) + "...";
  }
  return title;
};

// --- Sortable Wrapper Component ---
function SortableBlockWrapper({
  id,
  isLocked,
  onToggleLock,
  children,
}: {
  id: string;
  isLocked?: boolean;
  onToggleLock: () => void;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={`block-${id}`} // Add ID for scroll target
      className="relative flex items-start gap-2 group/sortable mb-8 scroll-mt-24"
    >
      {/* Controls Container (Drag + Lock) */}
      <div className="mt-4 flex flex-col items-center gap-1 opacity-0 group-hover/sortable:opacity-100 transition-opacity">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab text-gray-300 hover:text-gray-600 active:cursor-grabbing touch-none select-none"
          title="Drag to reorder"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </div>

        {/* Lock Toggle */}
        <button
          onClick={onToggleLock}
          className={`p-2 rounded-full transition-colors ${
            isLocked
              ? "text-gray-400 hover:text-gray-600"
              : "text-blue-400 hover:text-blue-600 bg-blue-50"
          }`}
          title={isLocked ? "Unlock Block" : "Lock Block"}
        >
          {isLocked ? <LockIcon /> : <UnlockIcon />}
        </button>
      </div>

      <div className="flex-grow min-w-0">{children}</div>
    </div>
  );
}

// --- Table of Contents Component ---
function TableOfContents({ blocks }: { blocks: BlockData[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(`block-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-96 shrink-0">
      <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toggle Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-xs font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-100 transition-colors"
        >
          <span>Contents</span>
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>

        {/* Collapsible List */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 p-2 border-t border-gray-100 overflow-y-auto max-h-[calc(80vh-40px)]">
            {blocks.map((block, index) => (
              <li key={block.id}>
                <button
                  onClick={() => scrollToBlock(block.id)}
                  className="w-full text-left px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-70 group-hover:opacity-100 flex-shrink-0 w-6 font-mono text-xs text-gray-400 group-hover:text-gray-600">
                    {index + 1}.
                  </span>
                  <span className="opacity-70 group-hover:opacity-100 flex-shrink-0 w-5">
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

interface NotebookProps {
  initialBlocks?: BlockData[];
  onComplete?: () => void;
}

export default function Notebook({ initialBlocks, onComplete }: NotebookProps) {
  // Initialize state with default locking if undefined
  const [blocks, setBlocks] = useState<BlockData[]>(() => {
    const rawBlocks = initialBlocks || DEFAULT_BLOCKS;
    return rawBlocks.map((b) => ({ ...b, isLocked: b.isLocked ?? true }));
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (type: BlockType) => {
    const newBlock: BlockData = {
      id: crypto.randomUUID(),
      type,
      content:
        type === "music"
          ? "T: New Tune\nM: 4/4\nL: 1/4\nK: C\nC D E F | G A B c |]"
          : "**New Section**\n\nClick to edit...",
      isLocked: false, // New blocks are editable immediately
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, newContent: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  };

  const toggleBlockLock = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isLocked: !b.isLocked } : b))
    );
  };

  const toggleAllLocks = () => {
    const allLocked = blocks.every((b) => b.isLocked);
    setBlocks((prev) => prev.map((b) => ({ ...b, isLocked: !allLocked })));
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const areAllLocked = blocks.every((b) => b.isLocked);

  return (
    <div className="w-full pb-32 relative">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_768px_minmax(0,1fr)] gap-8">
        {/* Left Column - Table of Contents */}
        <div className="hidden xl:flex justify-end pr-4">
          <TableOfContents blocks={blocks} />
        </div>

        {/* Center Column - Main Notebook Content */}
        <div className="p-4 md:p-8">
          {/* Complete Button */}
          {onComplete && (
            <div className="flex justify-end mb-8">
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
              >
                <span>✅</span> Mark as Done
              </button>
            </div>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlockWrapper
                  key={block.id}
                  id={block.id}
                  isLocked={block.isLocked}
                  onToggleLock={() => toggleBlockLock(block.id)}
                >
                  {block.type === "music" ? (
                    <MusicBlock
                      id={block.id}
                      initialContent={block.content}
                      isLocked={!!block.isLocked}
                      onUpdate={(content) => updateBlock(block.id, content)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  ) : (
                    <TextBlock
                      id={block.id}
                      initialContent={block.content}
                      isLocked={!!block.isLocked}
                      onUpdate={(content) => updateBlock(block.id, content)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  )}
                </SortableBlockWrapper>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Right Column - Empty for balance */}
        <div className="hidden xl:block"></div>
      </div>

      {/* Floating Toolbar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-gray-200 z-50">
        <button
          onClick={() => addBlock("text")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors"
        >
          <span>📝</span> Add Text
        </button>
        <button
          onClick={() => addBlock("music")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full font-medium transition-colors"
        >
          <span>🎵</span> Add Music
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          onClick={toggleAllLocks}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title={areAllLocked ? "Unlock All Blocks" : "Lock All Blocks"}
        >
          {areAllLocked ? <LockIcon /> : <UnlockIcon />}
        </button>
      </div>
    </div>
  );
}
