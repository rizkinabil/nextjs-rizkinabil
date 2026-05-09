'use client';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';
import {
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Undo,
  Redo,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

const lowlight = createLowlight(all);

const LANGUAGES = [
  { label: 'Auto', value: '' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JSX', value: 'jsx' },
  { label: 'TSX', value: 'tsx' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'SCSS', value: 'scss' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Bash', value: 'bash' },
  { label: 'JSON', value: 'json' },
  { label: 'SQL', value: 'sql' },
  { label: 'PHP', value: 'php' },
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'XML', value: 'xml' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Markdown', value: 'markdown' },
];

interface TiptapEditorProps {
  content?: object | null;
  onChange: (json: object) => void;
  placeholder?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton = ({ onClick, active, disabled, title, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={title}
    className={cn(
      'p-1.5 rounded text-sm transition-colors',
      active
        ? 'bg-emerald-500/20 text-emerald-400'
        : 'text-white/60 hover:text-white hover:bg-white/10',
      disabled && 'opacity-30 cursor-not-allowed'
    )}
  >
    {children}
  </button>
);

export const TiptapEditor = ({ content, onChange, placeholder }: TiptapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-emerald-400 underline' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full' } }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'javascript' }),
    ],
    content: content ?? undefined,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-emerald max-w-none min-h-[400px] px-4 py-3 focus:outline-none prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-700',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Tab') {
          const { state } = view;
          if (state.selection.$from.parent.type.name === 'codeBlock') {
            view.dispatch(state.tr.insertText('  '));
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = '';

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/blog/upload-image', { method: 'POST', body: formData });
    if (res.ok) {
      const { url } = await res.json();
      editor.chain().focus().setImage({ src: url }).run();
    }
    setUploading(false);
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('URL');
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const inCodeBlock = editor.isActive('codeBlock');
  const currentLanguage = editor.getAttributes('codeBlock').language ?? '';

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-900">
      {/* Sticky floating toolbar */}
      <div className="sticky top-4 z-40 px-3 pt-3 pb-1">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-gray-700/80 shadow-xl shadow-black/50">
          <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
            <Heading1 className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
            <Heading2 className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
            <Heading3 className="size-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
            <Bold className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
            <Italic className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Inline code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
            <Code className="size-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
            <List className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
            <ListOrdered className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
            <Quote className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={inCodeBlock}>
            <Code2 className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Minus className="size-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <ToolbarButton title="Add link" onClick={addLink} active={editor.isActive('link')}>
            <LinkIcon className="size-4" />
          </ToolbarButton>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          <ToolbarButton title="Upload image" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
          </ToolbarButton>
          <ToolbarButton title="Image from URL" onClick={addImageByUrl}>
            <span className="text-[10px] font-mono leading-none">URL</span>
          </ToolbarButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <Undo className="size-4" />
          </ToolbarButton>
          <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            <Redo className="size-4" />
          </ToolbarButton>

          {/* Language selector — only shown when cursor is inside a code block */}
          {inCodeBlock && (
            <>
              <div className="w-px h-5 bg-gray-600 mx-1" />
              <select
                value={currentLanguage}
                onChange={(e) =>
                  editor
                    .chain()
                    .focus()
                    .updateAttributes('codeBlock', { language: e.target.value || null })
                    .run()
                }
                className="text-xs bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-emerald-400 focus:outline-none focus:border-emerald-500 cursor-pointer transition-colors hover:border-gray-500"
              >
                {LANGUAGES.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
      {!editor.getText() && placeholder && (
        <p className="absolute top-[52px] left-4 text-white/20 text-sm pointer-events-none select-none">{placeholder}</p>
      )}
    </div>
  );
};
