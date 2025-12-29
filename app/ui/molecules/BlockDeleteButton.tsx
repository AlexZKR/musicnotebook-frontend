import React from "react";
import TrashIcon from "@mui/icons-material/Delete";

interface BlockDeleteButtonProps {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
}

export function BlockDeleteButton({
  onClick,
  title = "Delete Block",
}: BlockDeleteButtonProps) {
  return (
    <div className="absolute top-2 right-2 z-20 opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onClick}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors touch-manipulation"
        title={title}
      >
        <TrashIcon />
      </button>
    </div>
  );
}
