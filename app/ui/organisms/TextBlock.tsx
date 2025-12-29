import React, { useState, useRef, useEffect } from "react";
import type MDEditorType from "@uiw/react-md-editor";
import { NotebookBlock } from "~/ui/molecules/NotebookBlock";

export interface TextBlockProps {
  id: string;
  initialContent: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

interface TextBlockContentProps extends TextBlockProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

function TextBlockContent({
  initialContent,
  isLocked,
  onUpdate,
  isEditing,
  setIsEditing,
}: Omit<TextBlockContentProps, "onDelete">) {
  const [value, setValue] = useState(initialContent);
  const containerRef = useRef<HTMLDivElement>(null);

  const [EditorModule, setEditorModule] = useState<typeof MDEditorType | null>(
    null
  );

  useEffect(() => {
    import("@uiw/react-md-editor").then((mod) => {
      setEditorModule(mod.default);
    });
  }, []);

  // Sync content if it changes externally
  useEffect(() => {
    setValue(initialContent);
  }, [initialContent]);

  const handleChange = (val: string | undefined) => {
    const newVal = val || "";
    setValue(newVal);
    onUpdate(newVal);
  };

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
  }, [isEditing, setIsEditing]);

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
          : isLocked
            ? "cursor-default border border-transparent"
            : "hover:bg-gray-50 cursor-text border border-transparent hover:border-gray-200"
      }`}
    >
      {isEditing ? (
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={handleChange}
            preview="edit"
            height={200}
            visibleDragbar={false}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            if (isLocked) return;
            setIsEditing(true);
          }}
          onKeyDown={(e) => {
            if (isLocked) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsEditing(true);
            }
          }}
          role="button"
          tabIndex={isLocked ? -1 : 0}
          data-color-mode="light"
          className={`p-3 sm:p-4 prose prose-sm sm:prose-slate max-w-none min-h-12 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-blue-400 rounded-md ${
            !isLocked ? "min-h-24" : ""
          }`}
        >
          <MDEditor.Markdown
            source={value}
            style={{ backgroundColor: "transparent", color: "inherit" }}
          />
        </div>
      )}
    </div>
  );
}

export default function TextBlock(props: TextBlockProps) {
  return (
    <NotebookBlock
      id={props.id}
      isLocked={props.isLocked}
      onToggleLock={props.onToggleLock}
      onDelete={props.onDelete}
    >
      {(isEditing, setIsEditing) => (
        <TextBlockContent
          {...props}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </NotebookBlock>
  );
}
