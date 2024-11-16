import { EditorType } from "./EditorType";

function deleteElement(editor: EditorType): EditorType {
	console.log('editor', editor);
	
	if (!editor.selection) {
	  return editor;
	}
 
	const removeObjectId = editor.selection.selectedObjectId;
	const newSlides = editor.presentation.slides.map(slide => {
		const newObjects = slide.objects.filter(object => object.id !== removeObjectId);

	  if (newObjects.length !== slide.objects.length) {
		 return { ...slide, objects: newObjects };
	  }
	  
	  return slide;
	});
 
	return {
	  ...editor,
	  presentation: {
		 ...editor.presentation,
		 slides: newSlides,
	  },
	  selection: {
		  selectedObjectId: null,
		  selectedSlideId: editor.selection.selectedSlideId
	  }
	};
 }

 export {
	deleteElement
 }
