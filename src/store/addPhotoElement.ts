import { EditorType } from "./EditorType.ts";
import { nanoid } from 'nanoid';
import { ImageObjectType } from "./PresentationType.ts";


function addPhotoElement(editor: EditorType, base64Image: string): EditorType {

    const newElemId = nanoid(8);
	 if (!base64Image || !editor.selection || !editor.selection.selectedSlideId) {
		return editor;
  }

	 console.log('editor', editor);
    const changeableSlideId = editor.selection.selectedSlideId;
    const changeableSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === changeableSlideId);

    const newObject: ImageObjectType = {
        id: newElemId,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        type: "image",
        src: base64Image,
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
				selectedObjectId: editor.selection.selectedObjectId
        },
    };
}

export { addPhotoElement };

