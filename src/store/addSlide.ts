// store/addSlide.ts
import { EditorType } from "./EditorType.ts";
import { SlideType } from "./PresentationType.ts";
import { nanoid } from "nanoid";

function addSlide(editor: EditorType): EditorType {
    const newSlideId = nanoid(10);

    const newSlide: SlideType = {
        id: newSlideId,
        objects: [],
        background: { type: "solid", color: "#ffffff" },
    };

    // Если selectedSlideId не указан, добавляем слайд в конец списка
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: [...editor.presentation.slides, newSlide],
            },
            selection: {
                selectedSlideId: newSlideId, // Выбираем новый слайд
                selectedObjectId: null,
            },
        };
    }

    // Если selectedSlideId указан, добавляем слайд после выбранного
    const selectedSlideId = editor.selection.selectedSlideId;
    const selectedSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id === selectedSlideId
    );

    if (selectedSlideIndex === -1) {
        return editor; // Если выбранный слайд не найден, возвращаем исходное состояние
    }

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
            selectedSlideId: newSlideId, // Выбираем новый слайд
            selectedObjectId: null,
        },
    };
}

export { addSlide };