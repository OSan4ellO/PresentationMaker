import { EditorType } from "./EditorType";

function deleteBackground(editor: EditorType): EditorType {
    console.log('editor', editor);

    if (!editor.selection) {
        return editor; 
    }

    const removeSlideBackgroundId = editor.selection.selectedSlideId;
    const removeSlideBackgroundIndex = editor.presentation.slides.findIndex(slide => slide.id === removeSlideBackgroundId);

    if (removeSlideBackgroundIndex === -1) {
        return editor;  
    }

    const newSlides = [...editor.presentation.slides];

    newSlides[removeSlideBackgroundIndex] = {
        ...newSlides[removeSlideBackgroundIndex],
        background: {type: 'solid', color:'#ffffff'}, 
    };

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: removeSlideBackgroundId,
            selectedObjectId: editor.selection.selectedObjectId,
        },
    };
}

export {
    deleteBackground,
};
