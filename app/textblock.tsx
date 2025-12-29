import React, { useState, useRef, useEffect } from "react";
// We use 'import type' so the server doesn't try to load the actual JS/CSS files
import type { MDEditorProps } from "@uiw/react-md-editor";

interface TextBlockProps {
  id: string;
  initialContent: string;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

const TextBlock = ({
  id,
  initialContent,
  onUpdate,
  onDelete,
}: TextBlockProps) => {
  const [value, setValue] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // We store the loaded library in state.
  const [EditorModule, setEditorModule] = useState<any>(null);

  useEffect(() => {
    // Dynamically load the editor ONLY on the client side
    import("@uiw/react-md-editor").then((mod) => {
      setEditorModule(mod.default);
    });
  }, []);

  // Handle clicking outside to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleChange = (val: string | undefined) => {
    const newVal = val || "";
    setValue(newVal);
    onUpdate(newVal);
  };

  // While the library is loading, show a simple fallback
  if (!EditorModule) {
    return (
      <div className="p-4 text-gray-400 animate-pulse">Loading editor...</div>
    );
  }

  const MDEditor = EditorModule;

  return (
    <div
      ref={containerRef}
      className={`group relative transition-all duration-200 rounded-md ${
        isEditing
          ? "ring-2 ring-blue-400 shadow-lg z-10"
          : "hover:bg-gray-50 cursor-text"
      }`}
    >
      {/* Delete Button (Visible on hover when not editing) */}
      {!isEditing && (
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete Block"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      )}

      {isEditing ? (
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={handleChange}
            preview="edit"
            height={200}
            autoFocus={true}
            visibleDragbar={false}
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          // Force light mode colors for the viewer to ensure high contrast on white bg
          data-color-mode="light"
          className="p-4 prose prose-slate max-w-none min-h-[3rem] text-gray-900"
        >
          <MDEditor.Markdown
            source={value}
            style={{ backgroundColor: "transparent", color: "inherit" }}
          />
        </div>
      )}
    </div>
  );
};

export default TextBlock;
