import React, { useRef, useEffect, useState } from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (html: string) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors text-sm font-medium leading-none"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-neutral-700 mx-1 self-center" />;
}

export default function RichTextEditor({ label, value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') { e.preventDefault(); exec('bold'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'i') { e.preventDefault(); exec('italic'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'u') { e.preventDefault(); exec('underline'); }
  };

  const openLinkPopover = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    setLinkUrl('');
    setLinkPopoverOpen(true);
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const applyLink = () => {
    restoreSelection();
    if (linkUrl.trim()) {
      document.execCommand('createLink', false, linkUrl.trim());
    }
    setLinkPopoverOpen(false);
    editorRef.current?.focus();
    handleInput();
  };

  const cancelLink = () => {
    restoreSelection();
    setLinkPopoverOpen(false);
    editorRef.current?.focus();
  };

  return (
    <div className="w-full">
      <label className="block mb-1 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>

      <div className="border border-neutral-700 rounded overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1 bg-neutral-800 border-b border-neutral-700">
          <ToolbarButton onClick={() => exec('bold')} title="Bold (⌘B)">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('italic')} title="Italic (⌘I)">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('underline')} title="Underline (⌘U)">
            <span className="underline">U</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('strikeThrough')} title="Strikethrough">
            <span className="line-through">S</span>
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec('fontSize', '2')} title="Small text">
            <span className="text-xs">A</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('fontSize', '3')} title="Normal text">
            <span className="text-sm">A</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('fontSize', '5')} title="Large text">
            <span className="text-base">A</span>
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet list">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered list">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec('justifyLeft')} title="Align left">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('justifyCenter')} title="Align center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M5 18h14" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('justifyRight')} title="Align right">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" />
            </svg>
          </ToolbarButton>

          <Divider />

          <div className="relative">
            <ToolbarButton onClick={openLinkPopover} title="Insert link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </ToolbarButton>

            {linkPopoverOpen && (
              <div className="absolute top-full left-0 z-50 mt-1 w-64 bg-neutral-800 border border-neutral-600 rounded shadow-lg p-3">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') applyLink(); if (e.key === 'Escape') cancelLink(); }}
                  placeholder="https://"
                  autoFocus
                  className="w-full bg-neutral-900 text-stone-200 border border-neutral-700 rounded px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-red-600 mb-2"
                />
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={cancelLink} className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-700 transition-colors">
                    Cancel
                  </button>
                  <button type="button" onClick={applyLink} className="text-xs text-white bg-red-600 hover:bg-red-500 px-2 py-1 rounded transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <ToolbarButton onClick={() => exec('removeFormat')} title="Clear formatting">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </ToolbarButton>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="bg-neutral-900 min-h-[120px] p-3 text-stone-200 outline-none focus:ring-1 focus:ring-red-600 prose-sm [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-red-400 [&_a]:underline"
        />
      </div>
    </div>
  );
}
