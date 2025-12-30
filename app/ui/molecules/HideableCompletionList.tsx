import React, { useMemo, useState, type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import HideCompletedToggle from "~/ui/atoms/HideCompletedToggle";

export type CompletionMeta = {
  originalIndex: number;
  isCompleted: boolean;
  isHidden: boolean;
};

export type EmptyStateMeta = {
  completedCount: number;
  hiddenCount: number;
  hideCompleted: boolean;
  itemCount: number;
};

type HideableCompletionListProps<T> = {
  items: readonly T[];
  isItemCompleted: (item: T) => boolean;
  renderItem: (item: T, meta: CompletionMeta) => ReactNode;
  showToggle?: boolean;
  spacing?: number;
  emptyState?: ReactNode | ((state: EmptyStateMeta) => ReactNode);
};

export default function HideableCompletionList<T>({
  items,
  isItemCompleted,
  renderItem,
  showToggle = true,
  spacing = 2,
  emptyState,
}: HideableCompletionListProps<T>) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const prepared = useMemo(
    () =>
      items.map((item, index) => ({
        item,
        isCompleted: isItemCompleted(item),
        originalIndex: index,
      })),
    [items, isItemCompleted]
  );

  const completedCount = useMemo(
    () => prepared.filter((entry) => entry.isCompleted).length,
    [prepared]
  );
  const hiddenCount = hideCompleted ? completedCount : 0;

  const toggleVisible = showToggle && completedCount > 0 && items.length > 0;
  const hasVisibleItems = prepared.some(
    (entry) => !(hideCompleted && entry.isCompleted)
  );

  const emptyMetadata: EmptyStateMeta = {
    completedCount,
    hiddenCount,
    hideCompleted,
    itemCount: items.length,
  };

  const renderEmpty = () => {
    if (typeof emptyState === "function") {
      return emptyState(emptyMetadata);
    }
    if (emptyState) return emptyState;

    if (items.length === 0) {
      return (
        <Typography color="text.secondary" fontStyle="italic">
          No items have been added yet.
        </Typography>
      );
    }

    if (hideCompleted && completedCount === hiddenCount) {
      return (
        <Typography color="text.secondary" fontStyle="italic">
          All items are completed and hidden.
        </Typography>
      );
    }

    return (
      <Typography color="text.secondary" fontStyle="italic">
        No items to show.
      </Typography>
    );
  };

  return (
    <Box>
      {toggleVisible && (
        <Box mb={2}>
          <HideCompletedToggle
            checked={hideCompleted}
            onChange={setHideCompleted}
            hiddenCount={hiddenCount}
            showHiddenCount={hideCompleted}
          />
        </Box>
      )}

      {hasVisibleItems ? (
        <Stack spacing={spacing}>
          {prepared.map((entry) =>
            renderItem(entry.item, {
              originalIndex: entry.originalIndex,
              isCompleted: entry.isCompleted,
              isHidden: hideCompleted && entry.isCompleted,
            })
          )}
        </Stack>
      ) : (
        <Box mt={1}>{renderEmpty()}</Box>
      )}
    </Box>
  );
}
