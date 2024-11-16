import { EditorType } from "./EditorType";

function changeBackgroundImage(editor: EditorType): EditorType{
	
	// const newBackground = 'data:image/jpeg;base64,' + prompt("Enter base64 code:");
	const newBackground = prompt("Enter base64 code:");

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
        background:{type: 'image', src: `${newBackground}`},
		  
    };

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: changeableSlideId,
				selectedObjectId: editor.selection.selectedObjectId,
        },
    };
}

export{
	changeBackgroundImage
}