// store/renamePresentationTitle.ts
import { EditorType } from "./EditorType.ts";

function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
    if (!newTitle.trim()) {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                title: "Unnamed presentation (enter title)",
            },
        };
    } else {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                title: newTitle,
            },
        };
    }
}

export { renamePresentationTitle };