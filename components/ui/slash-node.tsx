'use client';

import * as React from 'react';

import type { PlateEditor, PlateElementProps } from 'platejs/react';

import { type TComboboxInputElement } from 'platejs';
import { PlateElement } from 'platejs/react';

import { insertBlock } from '@/components/editor/transforms';
import {
  SELECTABLE_ACTION_SYNTAXES,
  SELECTABLE_BLOCK_SYNTAXES,
  SELECTABLE_DELETE_SYNTAXES,
} from '@/components/editor/plugins/selectable-syntaxes';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';

type Group = {
  group: string;
  items: {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    className?: string;
    focusEditor?: boolean;
    keywords?: string[];
    label?: string;
  }[];
};

const groups: Group[] = [
  {
    group: '記法',
    items: SELECTABLE_BLOCK_SYNTAXES.map((item) => ({
      focusEditor: true,
      icon: <item.icon />,
      keywords: item.keywords,
      label: item.label,
      onSelect: (editor, value) => {
        insertBlock(editor, value, { upsert: true });
      },
      value: item.value,
    })),
  },
];

export function SlashInputElement(
  props: PlateElementProps<TComboboxInputElement>
) {
  const { editor, element } = props;

  return (
    <PlateElement {...props} as="span">
      <InlineCombobox element={element} trigger="/">
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(
                ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                  <InlineComboboxItem
                    key={value}
                    value={value}
                    onClick={() => onSelect(editor, value)}
                    label={label}
                    focusEditor={focusEditor}
                    group={group}
                    keywords={keywords}
                  >
                    <div className="mr-2 text-muted-foreground">{icon}</div>
                    {label ?? value}
                  </InlineComboboxItem>
                )
              )}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}
