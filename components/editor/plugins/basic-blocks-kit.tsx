'use client';

import {
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  HorizontalRulePlugin,
} from '@platejs/basic-nodes/react';
import { IndentPlugin } from '@platejs/indent/react';
import { ListPlugin } from '@platejs/list/react';
import { BlockPlaceholderPlugin } from '@platejs/utils/react';
import { KEYS } from 'platejs';
import { ParagraphPlugin } from 'platejs/react';

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import {
  H1Element,
  H2Element,
  H3Element,
} from '@/components/ui/heading-node';
import { HrElement } from '@/components/ui/hr-node';
import { ParagraphElement } from '@/components/ui/paragraph-node';

export const BasicBlocksKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className: 'before:absolute before:cursor-text before:text-muted-foreground/80 before:content-[attr(placeholder)]',
      placeholders: {
        [KEYS.p]: '段落',
        [KEYS.h1]: '見出し 1',
        [KEYS.h2]: '見出し 2',
        [KEYS.h3]: '見出し 3',
        [KEYS.blockquote]: '引用',
      },
    },
  }),
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.configure({
    node: {
      component: H1Element,
    },
    rules: {
      break: { empty: 'reset' },
    },
    shortcuts: { toggle: { keys: 'mod+alt+1' } },
  }),
  H2Plugin.configure({
    node: {
      component: H2Element,
    },
    rules: {
      break: { empty: 'reset' },
    },
    shortcuts: { toggle: { keys: 'mod+alt+2' } },
  }),
  H3Plugin.configure({
    node: {
      component: H3Element,
    },
    rules: {
      break: { empty: 'reset' },
    },
    shortcuts: { toggle: { keys: 'mod+alt+3' } },
  }),
  BlockquotePlugin.configure({
    node: { component: BlockquoteElement },
    shortcuts: { toggle: { keys: 'mod+shift+period' } },
  }),
  IndentPlugin.configure({
    inject: {
      targetPlugins: [KEYS.p, KEYS.h1, KEYS.h2, KEYS.h3, KEYS.blockquote],
    },
    options: {
      indentMax: 8,
      offset: 24,
      unit: 'px',
    },
  }),
  ListPlugin,
  HorizontalRulePlugin.withComponent(HrElement),
];
