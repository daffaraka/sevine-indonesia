import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AdminRichTextToolbar } from './AdminRichTextToolbar';
import { isRichHtmlEmpty } from './richTextSanitizer';

interface AdminRichTextEditorProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const AdminRichTextEditor: React.FC<AdminRichTextEditorProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Tulis atau tempel daftar poin di sini...',
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            class: 'text-blue-600 underline',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[110px] max-h-[220px] overflow-y-auto px-3 py-2 text-xs text-doff-navy focus:outline-none leading-relaxed',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  const showPlaceholder = isRichHtmlEmpty(value);

  return (
    <div className="space-y-1">
      <label className="block font-semibold text-doff-navy text-xs">{label}</label>
      <div className="border border-doff-border rounded-md overflow-hidden bg-white focus-within:border-doff-navy focus-within:ring-1 focus-within:ring-doff-navy/20 transition-colors">
        <AdminRichTextToolbar editor={editor} />
        <div className="relative [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:my-1 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:my-1 [&_.ProseMirror_p]:my-1 [&_.ProseMirror_li_p]:my-0">
          {showPlaceholder && (
            <span className="pointer-events-none absolute top-2 left-3 text-xs text-slate-400">
              {placeholder}
            </span>
          )}
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};
