import { EditorType } from "./EditorType.ts";
import { SlideType } from "./PresentationType.ts";
// import {v4 as uuidv4} from 'uuid';
import { nanoid } from 'nanoid';

function addSlide(editor: EditorType): EditorType {
	console.log('editor', editor)
	
	if (!editor.selection) {
		return editor; 
  }
// 	const lastSlideId = editor.presentation.slides.reduce((maxId, slide) => {
// 		const slideNumber = parseInt(slide.id.split('-')[1]);
// 		return Math.max(maxId, slideNumber);
//   }, 0);

   //  const newSlideId = `slide-${lastSlideId + 1}`;
	// const newId = {uuidv4()}
	const newSlideId = nanoid(10)

    const newSlide: SlideType = {
        id: newSlideId,
        objects: [],
        background: {type: 'solid', color:'#ffffff'}, 
    };

    const newSlides = [...editor.presentation.slides, newSlide];

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSlideId,
				selectedObjectId: editor.selection.selectedObjectId
        },
    };
}

export {
    addSlide,
};
