
import { EditorType } from "./EditorType";

function changeBackgroundColor(editor: EditorType, newBackground: string): EditorType{
	
	// const newBackground = prompt("Enter hex/rgba color code:");

    if (!newBackground) {
        return editor;
    }

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

	 console.log('editor', editor);

    const changeableSlideId = editor.selection.selectedSlideId;
    const changeableSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === changeableSlideId);

	const newSlides = [...editor.presentation.slides];
    newSlides[changeableSlideIndex] = {
        ...newSlides[changeableSlideIndex],
        background:{type: 'solid', color: `${newBackground}`} , 
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

export{
	changeBackgroundColor
}