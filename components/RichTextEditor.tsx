"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { LinkSimple, FileImage } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  error?: boolean;
}

export function RichTextEditor({ content, onChange, className, error }: RichTextEditorProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [showLinkInput, setShowLinkInput] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");
  const [linkMenuPosition, setLinkMenuPosition] = React.useState({ top: 0, left: 0 });
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }).extend({
        addKeyboardShortcuts() {
          return {
            // Exit link on space - stops the link from spreading
            Space: ({ editor }) => {
              const { state } = editor;
              const { selection } = state;
              const { $from } = selection;
              
              // Check if cursor is inside a link
              const hasLinkMark = $from.marks().some(mark => mark.type.name === 'link');
              
              if (hasLinkMark) {
                // Insert space and remove link mark from cursor position
                // This keeps the link but exits it
                return editor
                  .chain()
                  .insertContent(' ')
                  .command(({ tr, state }) => {
                    // Remove link mark from the current position
                    const linkMark = state.schema.marks.link;
                    tr.removeStoredMark(linkMark);
                    return true;
                  })
                  .run();
              }
              
              return false;
            },
          };
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-sm',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      forceUpdate(); // Force re-render to update button states
    },
    onSelectionUpdate: ({ editor }) => {
      forceUpdate(); // Force re-render when cursor moves
    },
    immediatelyRender: false,
  });

  const handleLinkClick = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');
    
    if (previousUrl) {
      // If there's already a link, show the menu to edit it
      setSelectedText(text);
      setLinkUrl(previousUrl);
      setShowLinkInput(true);
      
      // Calculate position for the bubble menu
      const { view } = editor;
      const { from } = view.state.selection;
      const start = view.coordsAtPos(from);
      const editorRect = view.dom.getBoundingClientRect();
      
      setLinkMenuPosition({
        top: start.top - editorRect.top + 30,
        left: start.left - editorRect.left,
      });
    } else if (text) {
      // Show the link input with selected text
      setSelectedText(text);
      setLinkUrl("https://"); // Start with https:// for user to complete
      setShowLinkInput(true);
      
      // Calculate position for the bubble menu
      const { view } = editor;
      const { from } = view.state.selection;
      const start = view.coordsAtPos(from);
      const editorRect = view.dom.getBoundingClientRect();
      
      setLinkMenuPosition({
        top: start.top - editorRect.top + 30,
        left: start.left - editorRect.left,
      });
    }
  };

  const handleSaveLink = () => {
    if (!editor || !linkUrl) return;

    editor
      .chain()
      .focus()
      .setLink({ href: linkUrl })
      .run();

    setShowLinkInput(false);
    setLinkUrl("");
    setSelectedText("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Create a local URL for the image
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    event.target.value = '';
  };

  if (!editor) return null;

  return (
    <div className={cn("border rounded-sm overflow-hidden relative", error ? "border-red-400" : "border-gray-200")}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Link Input Popover */}
      {editor && showLinkInput && (
        <div 
          className="absolute z-50 bg-white border border-gray-200 rounded-sm shadow-xl p-3"
          style={{
            top: `${linkMenuPosition.top}px`,
            left: `${linkMenuPosition.left}px`,
            minWidth: '400px',
          }}
        >
          <div className="space-y-2">
            {/* Selected Text Display */}
            {selectedText && (
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-500">Text:</span>
                <span className="text-sm text-gray-900 font-medium">{selectedText}</span>
              </div>
            )}
            
            {/* Link Input */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Link:</span>
              <Input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveLink();
                  }
                  if (e.key === 'Escape') {
                    setShowLinkInput(false);
                    setSelectedText("");
                  }
                }}
                className="h-9 flex-1 text-sm"
                autoFocus
              />
              <Button
                type="button"
                size="sm"
                onClick={handleSaveLink}
                className="h-9 px-6"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center font-black text-base",
            editor.isActive("bold") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-600"
          )}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center italic font-semibold text-base font-serif",
            editor.isActive("italic") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-600"
          )}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={handleLinkClick}
          className={cn(
            "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center",
            editor.isActive("link") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-600"
          )}
          title={editor.isActive("link") ? "Edit link" : "Add link"}
        >
          <LinkSimple className="w-5 h-5" weight="bold" />
        </button>
        <button
          type="button"
          onClick={handleImageClick}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600 w-8 h-8 flex items-center justify-center"
          title="Insert image"
        >
          <FileImage className="w-5 h-5" weight="bold" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className={cn(
          "min-h-[180px] max-h-[400px] overflow-y-auto px-3 py-3 prose prose-sm max-w-none",
          "focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[140px]",
          "[&_.ProseMirror]:focus:outline-none",
          className
        )}
      />
    </div>
  );
}
