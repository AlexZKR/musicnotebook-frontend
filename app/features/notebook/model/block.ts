export type BlockType = "text" | "music";

export interface BlockData {
  id: string;
  type: BlockType;
  content: string;
  isLocked?: boolean;
}

/**
 * Extracts a human-readable title from a notebook block's content.
 */
export const getBlockTitle = (block: BlockData) => {
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

export const DEFAULT_BLOCKS: BlockData[] = [
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
