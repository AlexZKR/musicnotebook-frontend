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
} from "@dnd-kit/sortable";

import type { BlockData, BlockType } from "~/features/notebook/model/block";
import { MusicBlock, TextBlock } from "~/ui/organisms";
import { NotebookBlock } from "~/ui/molecules/NotebookBlock";
import { NotebookTableOfContents } from "~/ui/molecules/NotebookTableOfContents";
import { NotebookToolbar } from "~/ui/molecules/NotebookToolbar";

interface NotebookEditorProps {
  initialBlocks: BlockData[];
  onComplete?: () => void;
}

export function NotebookEditor({
  initialBlocks,
  onComplete,
}: NotebookEditorProps) {
  const [blocks, setBlocks] = useState<BlockData[]>(() =>
    initialBlocks.map((b) => ({ ...b, isLocked: b.isLocked ?? true }))
  );

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
      isLocked: false,
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
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_768px_minmax(0,1fr)] gap-4 xl:gap-8">
        <div className="hidden xl:flex justify-end pr-4">
          <NotebookTableOfContents blocks={blocks} />
        </div>

        <div className="px-2 py-4 sm:p-4 md:p-8 max-w-full">
          <div className="xl:hidden mb-4">
            <NotebookTableOfContents blocks={blocks} />
          </div>

          {onComplete && (
            <div className="flex justify-end mb-6 sm:mb-8">
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-sm sm:text-base shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 touch-manipulation"
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
                <NotebookBlock
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
                </NotebookBlock>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className="hidden xl:block"></div>
      </div>

      <NotebookToolbar
        onAddBlock={addBlock}
        onToggleAllLocks={toggleAllLocks}
        areAllLocked={areAllLocked}
      />
    </div>
  );
}
