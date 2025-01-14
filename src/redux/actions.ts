import { EditorType } from "../store/EditorType";

// store/actions.ts
export const ADD_SLIDE = 'ADD_SLIDE';
export const REMOVE_SLIDE = 'REMOVE_SLIDE';
export const SET_SELECTION = 'SET_SELECTION';
export const INTERCHANGE_SLIDES = 'INTERCHANGE_SLIDES';
export const ADD_TEXT_ELEMENT = 'ADD_TEXT_ELEMENT';
export const CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const DELETE_BACKGROUND = 'DELETE_BACKGROUND';
export const HANDLE_BACKGROUND_UPLOAD = 'HANDLE_BACKGROUND_UPLOAD';
export const HANDLE_IMAGE_OBJ_UPLOAD = 'HANDLE_IMAGE_OBJ_UPLOAD';
export const RENAME_PRESENTATION_TITLE = 'RENAME_PRESENTATION_TITLE';
export const EXPORT_TO_JSON = 'EXPORT_TO_JSON';
export const IMPORT_FROM_JSON = 'IMPORT_FROM_JSON';
export const UPDATE_OBJECT_POSITION = 'UPDATE_OBJECT_POSITION';

export const addSlide = () => ({
    type: ADD_SLIDE,
});

export const removeSlide = (slideId: string) => ({
    type: REMOVE_SLIDE,
});

export const setSelection = (payload: { selectedSlideId: string; selectedObjectId: string | null }) => ({
    type: SET_SELECTION,
    payload,
});

export const interchangeSlides = (payload: { draggedSlideId: string; targetSlideId: string }) => ({
    type: INTERCHANGE_SLIDES,
    payload,
});

export const addTextElement = () => ({
    type: ADD_TEXT_ELEMENT,
});

export const changeBackgroundColor = (payload: { color: string }) => ({
    type: CHANGE_BACKGROUND_COLOR,
    payload,
});

export const deleteElement = () => ({
    type: DELETE_ELEMENT,
});

export const deleteBackground = () => ({
    type: DELETE_BACKGROUND,
});

export const handleBackgroundUpload = (payload: { file: File }) => ({
    type: HANDLE_BACKGROUND_UPLOAD,
    payload,
});

export const handleImageObjUpload = (payload: { file: File }) => ({
    type: HANDLE_IMAGE_OBJ_UPLOAD,
    payload,
});

export const renamePresentationTitle = (payload: { title: string }) => ({
    type: RENAME_PRESENTATION_TITLE,
    payload,
});

export const exportToJSON = () => ({
    type: EXPORT_TO_JSON,
});

export const importFromJSON = (payload: any) => ({
	type: IMPORT_FROM_JSON,
	payload,
});

export const updateObjectPosition = (payload: {
    slideId: string;
    objectId: string;
    newPosition: { x: number; y: number };
}) => ({
    type: UPDATE_OBJECT_POSITION,
    payload,
});