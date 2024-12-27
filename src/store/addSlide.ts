import { EditorType } from "./EditorType.ts";
import { SlideType } from "./PresentationType.ts";
import { nanoid } from "nanoid";

function addSlide(editor: EditorType): EditorType {
    console.log("editor", editor);

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlideId;

    const selectedSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id === selectedSlideId
    );

    if (selectedSlideIndex === -1) {
        return editor;
    }

    const newSlideId = nanoid(10);

    const newSlide: SlideType = {
        id: newSlideId,
        objects: [],
        background: { type: "solid", color: "#ffffff" },
    };
 
    const newSlides = [
        ...editor.presentation.slides.slice(0, selectedSlideIndex + 1),
        newSlide,
        ...editor.presentation.slides.slice(selectedSlideIndex + 1),
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSlideId, 
            selectedObjectId: editor.selection.selectedObjectId,
        },
    };
}

export { 
	addSlide 
};
