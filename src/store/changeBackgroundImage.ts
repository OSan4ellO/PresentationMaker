// store/changeBackgroundImage.ts
import { EditorType } from "./EditorType";

function changeBackgroundImage(editor: EditorType, base64Image: string): EditorType {
    if (!base64Image || !editor.selection || !editor.selection.selectedSlideId) {
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
        background: { type: 'image', src: base64Image },
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export { changeBackgroundImage };