'use client';

import type { PlateEditor } from 'platejs/react';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Code,
  CopyPlus,
  Heading1,
  Heading2,
  Heading3,
  Indent,
  List,
  ListOrdered,
  type LucideIcon,
  MessageSquareQuote,
  Outdent,
  Pilcrow,
  Trash,
} from 'lucide-react';
import { BlockSelectionPlugin } from '@platejs/selection/react';
import { KEYS } from 'platejs';

export type SelectableSyntaxItem = {
  icon: LucideIcon;
  keywords: string[];
  label: string;
  onSelect?: (editor: PlateEditor) => void;
  type?: 'action' | 'block';
  value: string;
};

export const SELECTABLE_BLOCK_SYNTAXES: SelectableSyntaxItem[] = [
  {
    icon: Pilcrow,
    keywords: ['paragraph', 'p', '段落'],
    label: '段落',
    type: 'block',
    value: KEYS.p,
  },
  {
    icon: Heading1,
    keywords: ['heading1', 'h1', '見出し1'],
    label: '見出し1',
    type: 'block',
    value: KEYS.h1,
  },
  {
    icon: Heading2,
    keywords: ['heading2', 'h2', '見出し2'],
    label: '見出し2',
    type: 'block',
    value: KEYS.h2,
  },
  {
    icon: Heading3,
    keywords: ['heading3', 'h3', '見出し3'],
    label: '見出し3',
    type: 'block',
    value: KEYS.h3,
  },
  {
    icon: MessageSquareQuote,
    keywords: ['quote', 'blockquote', '引用', '>'],
    label: '引用',
    type: 'block',
    value: KEYS.blockquote,
  },
  {
    icon: Code,
    keywords: ['codeblock', 'code', 'コードブロック', '```'],
    label: 'コードブロック',
    type: 'block',
    value: KEYS.codeBlock,
  },
  {
    icon: List,
    keywords: ['list'],
    label: '箇条書き',
    type: 'block',
    value: KEYS.ul,
  },
  {
    icon: ListOrdered,
    keywords: ['list', 'order'],
    label: '番号付きリスト',
    type: 'block',
    value: KEYS.ol
  }
];

export const SELECTABLE_ACTION_SYNTAXES: SelectableSyntaxItem[] = [
  {
    icon: CopyPlus,
    keywords: ['duplicate', 'copy', '複製'],
    label: '複製',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.duplicate();
    },
    type: 'action',
    value: 'action_duplicate',
  },
  {
    icon: Indent,
    keywords: ['indent', 'インデント', 'tab'],
    label: 'インデント',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setIndent(1);
    },
    type: 'action',
    value: 'action_indent',
  },
  {
    icon: Outdent,
    keywords: ['outdent', 'アウトデント', 'shift+tab'],
    label: 'アウトデント',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setIndent(-1);
    },
    type: 'action',
    value: 'action_outdent',
  },
  {
    icon: AlignLeft,
    keywords: ['align left', 'left', '左揃え', 'align'],
    label: '左揃え',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setNodes({
        align: 'left',
      });
    },
    type: 'action',
    value: 'action_align_left',
  },
  {
    icon: AlignCenter,
    keywords: ['align center', 'center', '中央揃え', 'align'],
    label: '中央揃え',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setNodes({
        align: 'center',
      });
    },
    type: 'action',
    value: 'action_align_center',
  },
  {
    icon: AlignRight,
    keywords: ['align right', 'right', '右揃え', 'align'],
    label: '右揃え',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setNodes({
        align: 'right',
      });
    },
    type: 'action',
    value: 'action_align_right',
  },
];

export const SELECTABLE_DELETE_SYNTAXES: SelectableSyntaxItem[] = [
  {
    icon: Trash,
    keywords: ['delete', 'remove', '削除'],
    label: '削除',
    onSelect: (editor) => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.removeNodes();
      editor.tf.focus();
    },
    type: 'action',
    value: 'action_delete',
  },
];

export const SELECTABLE_SYNTAXES: SelectableSyntaxItem[] = [
  ...SELECTABLE_BLOCK_SYNTAXES,
  ...SELECTABLE_ACTION_SYNTAXES,
  ...SELECTABLE_DELETE_SYNTAXES,
];
