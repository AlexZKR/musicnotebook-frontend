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
}

const DEFAULT_BLOCKS: BlockData[] = [
  {
    id: "welcome-text",
    type: "text",
    content:
      "# My Musical Notebook\n\nWelcome! This is an interactive document. You can add **text** explanations or **interactive music** blocks below.\n\n*Hover over the left side of any block to rearrange it.*",
  },
  {
    id: "demo-music",
    type: "music",
    content: `T: C Major Scale
M: 4/4
L: 1/4
K: C
C D E F | G2 z2 |]`,
  },
];

// --- Sortable Wrapper Component ---
// This handles the drag mechanics and the visual "Grip" handle
function SortableBlockWrapper({
  id,
  children,
}: {
  id: string;
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
      className="relative flex items-start gap-2 group/sortable mb-8"
    >
      {/* Drag Handle - Only visible on hover */}
      <div
        {...attributes}
        {...listeners}
        className="mt-4 p-2 cursor-grab text-gray-300 hover:text-gray-600 active:cursor-grabbing opacity-0 group-hover/sortable:opacity-100 transition-opacity touch-none select-none"
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

      {/* The Actual Block Content */}
      <div className="flex-grow min-w-0">{children}</div>
    </div>
  );
}

// --- Main Notebook Component ---
export default function Notebook() {
  const [blocks, setBlocks] = useState<BlockData[]>(DEFAULT_BLOCKS);

  // DnD Sensors (Input methods)
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
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, newContent: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  };

  const deleteBlock = (id: string) => {
    // Confirm before delete usually good, but for speed skipping
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-32">
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
            <SortableBlockWrapper key={block.id} id={block.id}>
              {/* Render the specific block type */}
              {block.type === "music" ? (
                <MusicBlock
                  id={block.id}
                  initialContent={block.content}
                  onUpdate={(content) => updateBlock(block.id, content)}
                  onDelete={() => deleteBlock(block.id)}
                />
              ) : (
                <TextBlock
                  id={block.id}
                  initialContent={block.content}
                  onUpdate={(content) => updateBlock(block.id, content)}
                  onDelete={() => deleteBlock(block.id)}
                />
              )}
            </SortableBlockWrapper>
          ))}
        </SortableContext>
      </DndContext>

      {/* "Add Block" Controls Floating at Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white p-2 rounded-full shadow-lg border border-gray-200 z-50">
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
      </div>
    </div>
  );
}
