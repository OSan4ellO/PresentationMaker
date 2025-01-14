import { EditorType } from "./EditorType.ts";
import { nanoid } from 'nanoid';
import { TextObjectType } from "./PresentationType.ts";

function addTextElement(editor: EditorType): EditorType {
    const newElemId = nanoid(8);
    const userText = prompt("Enter text to add to slide:");
    if (!userText) {
        return editor; // Если пользователь отменил ввод, возвращаем исходное состояние
    }

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor; // Если слайд не выбран, ничего не делаем
    }

    const changeableSlideId = editor.selection.selectedSlideId;
    const changeableSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === changeableSlideId);

    const newObject: TextObjectType = {
        id: newElemId,
        x: 0,
        y: 0,
        type: "text",
        text: userText,
        fontFamily: 'Roboto',
        fontSize: 50,
        fontColor: '#FF0101',
    };

    const newSlides = [...editor.presentation.slides];
    newSlides[changeableSlideIndex] = {
        ...newSlides[changeableSlideIndex],
        objects: [...newSlides[changeableSlideIndex].objects, newObject],
    };

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: changeableSlideId,
            selectedObjectId: newElemId, // Устанавливаем выбранным новый объект
        },
    };
}

export { addTextElement };