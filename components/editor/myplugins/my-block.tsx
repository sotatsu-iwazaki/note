import { BlockContextMenu } from "@/components/ui/block-context-menu";
import { BlockMenuPlugin, BlockSelectionPlugin } from "@platejs/selection/react";

export const MyBlockSelectionKit = [
    BlockSelectionPlugin.configure({
        options: {
            enableContextMenu: true,
        },
    }),
    BlockMenuPlugin.configure({
        render: { aboveEditable: BlockContextMenu }
    }),
]