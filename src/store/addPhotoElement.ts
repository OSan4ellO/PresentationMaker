import { EditorType } from "./EditorType.ts";
import { nanoid } from 'nanoid';
import { ImageObjectType } from "./PresentationType.ts";
// import { convertFileToBase64 } from "./imageConverter.ts";


function addPhotoElement(editor: EditorType): EditorType {

// 	const input = document.createElement('input');
// 		let base64code
// 		input.type = 'file';
// 		input.accept = 'image/*'; // Только изображения
// 		input.onchange = (event) => {
//   		const file = (event.target as HTMLInputElement)?.files?.[0];
//   		if (file) {
//     		base64code = await RNFS.readFile(imagePath, 'base64'); // Создаем URL для изображения
//   }
// };

   const userBase64 = prompt("Enter base64 code:");

    const newElemId = nanoid(8);
    if (!userBase64) {
        return editor;
    }

    if (!editor.selection || !editor.selection.selectedSlideId) {
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
        src: userBase64,
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

