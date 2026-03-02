'use client';

import { AutoformatKit } from '@/components/editor/plugins/autoformat-kit';
import { BasicBlocksKit } from './basic-blocks-kit';
import { BasicMarksKit } from './basic-marks-kit';
import { DndKit } from './dnd-kit';
import { CodeBlockKit } from './code-block-kit';
import { MathKit } from './math-kit';
import { BlockMenuKit } from './block-menu-kit';
import { AlignKit } from './align-kit';
import { SlashKit } from './slash-kit';
import { FloatingToolbarKit } from './floating-toolbar-kit';
import { ListKit } from './list-kit';

export const BasicNodesKit = [
  ...BasicBlocksKit,
  ...BasicMarksKit,
  ...AutoformatKit,
  ...DndKit,
  ...CodeBlockKit,
  ...MathKit,
  ...BlockMenuKit,
  ...AlignKit,
  ...SlashKit,
  ...FloatingToolbarKit,
  ...ListKit,
];
