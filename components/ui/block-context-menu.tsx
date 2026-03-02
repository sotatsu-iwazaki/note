'use client';

import * as React from 'react';

import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react';
import { KEYS } from 'platejs';
import { useEditorPlugin, usePlateState, usePluginOption } from 'platejs/react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  SELECTABLE_ACTION_SYNTAXES,
  SELECTABLE_BLOCK_SYNTAXES,
  SELECTABLE_DELETE_SYNTAXES,
  type SelectableSyntaxItem,
} from '@/components/editor/plugins/selectable-syntaxes';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';

export function BlockContextMenu({ children }: { children: React.ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const isTouch = useIsTouchDevice();
  const [readOnly] = usePlateState('readOnly');
  const openId = usePluginOption(BlockMenuPlugin, 'openId');
  const isOpen = openId === BLOCK_CONTEXT_MENU_ID;

  const handleTurnInto = React.useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[KEYS.listType]) {
            editor.tf.unsetNodes([KEYS.listType, 'indent'], {
              at: path,
            });
          }

          editor.tf.toggleBlock(type, { at: path });
        });
    },
    [editor]
  );

  const handleSelectableAction = React.useCallback(
    (item: SelectableSyntaxItem) => {
      if (item.type === 'block') {
        handleTurnInto(item.value);
        return;
      }
      item.onSelect?.(editor);
    },
    [editor, handleTurnInto]
  );

  const handleMenuKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isCtrlN =
        event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'n';
      const isCtrlP =
        event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'p';

      if (!isCtrlN && !isCtrlP) return;

      const container = event.currentTarget;
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([data-disabled])'
        )
      ).filter((item) => item.getAttribute('aria-disabled') !== 'true');

      if (!items.length) return;

      event.preventDefault();

      const activeElement = document.activeElement as HTMLElement | null;
      const currentIndex = items.findIndex((item) => item === activeElement);
      const direction = isCtrlN ? 1 : -1;
      const nextIndex =
        currentIndex === -1
          ? isCtrlN
            ? 0
            : items.length - 1
          : (currentIndex + direction + items.length) % items.length;

      items[nextIndex]?.focus();
    },
    []
  );

  const groups: {
    name: string;
    items: SelectableSyntaxItem[];
  }[] = [
    { items: SELECTABLE_BLOCK_SYNTAXES, name: '記法' },
    { items: SELECTABLE_ACTION_SYNTAXES, name: '操作' },
    { items: SELECTABLE_DELETE_SYNTAXES, name: '削除' },
  ];

  if (isTouch) {
    return children;
  }

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) {
          api.blockMenu.hide();
        }
      }}
      modal={false}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          const dataset = (event.target as HTMLElement).dataset;
          const disabled =
            dataset?.slateEditor === 'true' ||
            readOnly ||
            dataset?.plateOpenContextMenu === 'false';

          if (disabled) return event.preventDefault();

          setTimeout(() => {
            api.blockMenu.show(BLOCK_CONTEXT_MENU_ID, {
              x: event.clientX,
              y: event.clientY,
            });
          }, 0);
        }}
      >
        <div className="w-full">{children}</div>
      </ContextMenuTrigger>
      {isOpen && (
        <ContextMenuContent
          className="w-64"
          onKeyDownCapture={handleMenuKeyDown}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            editor.getApi(BlockSelectionPlugin).blockSelection.focus();
          }}
        >
          {groups.map(({ items, name }, index) => (
            <React.Fragment key={name}>
              {index > 0 && <ContextMenuSeparator />}
              <ContextMenuGroup>
                <ContextMenuLabel className="text-muted-foreground text-xs">
                  {name}
                </ContextMenuLabel>
                {items.map((item) => (
                  <ContextMenuItem
                    key={item.value}
                    onClick={() => handleSelectableAction(item)}
                  >
                    <item.icon />
                    {item.label}
                  </ContextMenuItem>
                ))}
              </ContextMenuGroup>
            </React.Fragment>
          ))}
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
}
