'use client';

import { normalizeNodeId } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import { BasicNodesKit } from '@/components/editor/plugins/basic-nodes-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { TooltipProvider } from '@/components/ui/tooltip';

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: BasicNodesKit,
    value,
  });

  return (
    <TooltipProvider>
      <Plate
        editor={editor}
        onValueChange={({ value }) => {
          console.log('Plate value changed:', value);
        }}
      >
        <EditorContainer>
          <Editor variant="demo" placeholder="Type..."/>
        </EditorContainer>
      </Plate>
    </TooltipProvider>
  );
}

const value = normalizeNodeId([
  {
    children: [{ text: '見出し1' }],
    type: 'h1',
  },
  {
    children: [{ text: '見出し2' }],
    type: 'h2',
  },
  {
    children: [{ text: '見出し3' }],
    type: 'h3',
  },
  {
    children: [{ text: '引用' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: '基本文法: ' },
      { bold: true, text: '太字' },
      { text: ', ' },
      { italic: true, text: '斜体' },
      { text: ', ' },
      { text: '下線', underline: true },
      { text: ', ' },
      { strikethrough: true, text: '取消線' },
      { text: '.' },
    ],
    type: 'p',
  },
]);
