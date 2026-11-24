import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  Underline,
  Undo2,
} from 'lucide-react';

interface AdminRichTextToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active = false,
  disabled = false,
  title,
  onClick,
  children,
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    disabled={disabled}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
      active
        ? 'bg-doff-navy text-white shadow-2xs'
        : 'text-slate-600 hover:text-doff-navy hover:bg-slate-200/70'
    }`}
  >
    {children}
  </button>
);

export const AdminRichTextToolbar: React.FC<AdminRichTextToolbarProps> = ({ editor }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');

  if (!editor) return null;

  const handleToggleLinkBox = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      return;
    }
    setLinkUrl(editor.getAttributes('link').href || 'https://');
    setShowLinkInput((prev) => !prev);
  };

  const handleApplyLink = () => {
    const trimmed = linkUrl.trim();
    if (!trimmed || trimmed === 'https://') {
      setShowLinkInput(false);
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: trimmed }).run();
    setShowLinkInput(false);
  };

  return (
    <div className="border-b border-doff-border bg-doff-subtle/60 px-2 py-1.5 space-y-1.5">
      <div className="flex flex-wrap items-center gap-0.5">
        <ToolbarButton
          title="Tebal (Bold)"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Miring (Italic)"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Garis Bawah (Underline)"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="w-3.5 h-3.5" />
        </ToolbarButton>

        <span className="w-px h-4 bg-doff-border mx-1" />

        <ToolbarButton
          title="Daftar Poin (Bullet List)"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Daftar Bernomor (Numbered List)"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title={editor.isActive('link') ? 'Hapus Tautan' : 'Sisipkan Tautan'}
          active={editor.isActive('link') || showLinkInput}
          onClick={handleToggleLinkBox}
        >
          <Link2 className="w-3.5 h-3.5" />
        </ToolbarButton>

        <span className="w-px h-4 bg-doff-border mx-1" />

        <ToolbarButton
          title="Hapus Format"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {showLinkInput && (
        <div className="flex items-center gap-1.5 pt-1 border-t border-doff-border/70">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleApplyLink();
              }
            }}
            placeholder="https://..."
            className="flex-1 px-2 py-1 text-[11px] bg-white border border-doff-border rounded focus:outline-none focus:border-doff-navy font-mono"
          />
          <button
            type="button"
            onClick={handleApplyLink}
            className="px-2.5 py-1 bg-doff-navy text-white text-[11px] font-semibold rounded cursor-pointer"
          >
            Pasang
          </button>
          <button
            type="button"
            onClick={() => setShowLinkInput(false)}
            className="px-2 py-1 bg-white border border-doff-border text-slate-600 text-[11px] rounded cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
};
