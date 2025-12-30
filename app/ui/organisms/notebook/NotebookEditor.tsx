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
import { Box, Button, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { BlockData, BlockType } from "~/features/notebook/model/block";
import { MusicBlock, TextBlock } from "~/ui/organisms";
import { NotebookTableOfContents } from "~/ui/molecules/notebook/NotebookTableOfContents";
import { NotebookToolbar } from "~/ui/molecules/notebook/NotebookToolbar";

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
    <Box sx={{ width: "100%", pb: 32, position: "relative" }}>
      {/* Three-column layout using MUI Grid */}
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {/* Left Column: TOC (Desktop Only) */}
        <Grid
          size={{ xl: 3 }}
          sx={{
            display: { xs: "none", xl: "flex" },
            justifyContent: "flex-end",
            pr: 2,
          }}
        >
          <NotebookTableOfContents blocks={blocks} />
        </Grid>

        {/* Center Column: Blocks Area */}
        <Grid size={{ xs: 12, xl: 6 }}>
          <Box sx={{ px: { xs: 0, sm: 2 }, py: 2 }}>
            {/* Mobile TOC */}
            <Box sx={{ display: { xs: "block", xl: "none" }, mb: 4 }}>
              <NotebookTableOfContents blocks={blocks} />
            </Box>

            {/* Mark as Done Action */}
            {onComplete && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={onComplete}
                  sx={{
                    borderRadius: "99px",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    boxShadow: (theme) =>
                      `0 8px 16px ${theme.palette.success.light}40`,
                  }}
                >
                  Mark as Done
                </Button>
              </Box>
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
                {blocks.map((block) =>
                  block.type === "music" ? (
                    <MusicBlock
                      key={block.id}
                      id={block.id}
                      initialContent={block.content}
                      isLocked={!!block.isLocked}
                      onToggleLock={() => toggleBlockLock(block.id)}
                      onUpdate={(content) => updateBlock(block.id, content)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  ) : (
                    <TextBlock
                      key={block.id}
                      id={block.id}
                      initialContent={block.content}
                      isLocked={!!block.isLocked}
                      onToggleLock={() => toggleBlockLock(block.id)}
                      onUpdate={(content) => updateBlock(block.id, content)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  )
                )}
              </SortableContext>
            </DndContext>
          </Box>
        </Grid>

        {/* Right Column: Empty for visual balance */}
        <Grid size={{ xl: 3 }} sx={{ display: { xs: "none", xl: "block" } }} />
      </Grid>

      <NotebookToolbar
        onAddBlock={addBlock}
        onToggleAllLocks={toggleAllLocks}
        areAllLocked={areAllLocked}
      />
    </Box>
  );
}
