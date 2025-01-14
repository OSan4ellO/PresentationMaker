// store/changeBackgroundColor.ts
import { EditorType } from "./EditorType";

function changeBackgroundColor(editor: EditorType, newBackground: string): EditorType {
    if (!newBackground || !editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const changeableSlideId = editor.selection.selectedSlideId;
    const changeableSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id === changeableSlideId
    );

    if (changeableSlideIndex === -1) {
        return editor;
    }

    const newSlides = [...editor.presentation.slides];
    newSlides[changeableSlideIndex] = {
        ...newSlides[changeableSlideIndex],
        background: { type: 'solid', color: newBackground },
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export { changeBackgroundColor };