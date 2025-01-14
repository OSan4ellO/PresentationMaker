// store/reducers.ts
import {
	ADD_SLIDE,
	REMOVE_SLIDE,
	SET_SELECTION,
	UPDATE_OBJECT_POSITION,
	ADD_TEXT_ELEMENT,
	CHANGE_BACKGROUND_COLOR,
	DELETE_ELEMENT,
	DELETE_BACKGROUND,
	HANDLE_BACKGROUND_UPLOAD,
	HANDLE_IMAGE_OBJ_UPLOAD,
	RENAME_PRESENTATION_TITLE,
	INTERCHANGE_SLIDES,
	UPDATE_OBJECT_SIZE,
	
} from './actions';
import { EditorType } from '../store/EditorType';
import { addSlide } from '../store/addSlide';
import { removeSlide } from '../store/removeSlide';
import { setSelection } from '../store/setSelection';
import { renamePresentationTitle } from '../store/renamePresentationTitle';
import { addTextElement } from '../store/addTextElement';
import { changeBackgroundColor } from '../store/changeBackgroundColor';
import { deleteElement } from '../store/deleteElement';
import { deleteBackground } from '../store/deleteBackground';
import { changeBackgroundImage } from '../store/changeBackgroundImage';
import { addPhotoElement } from '../store/addPhotoElement';
import { interchange } from '../store/interchange';
import { IMPORT_FROM_JSON } from './actions';
import { nanoid } from 'nanoid'; 

// Начальное состояние
const initialState: EditorType = {
	presentation: {
		 title: 'New Presentation',
		 slides: [
			  {
					id: nanoid(), // Уникальный ID для слайда
					objects: [],  // Пустой массив объектов
					background: { type: 'solid', color: '#ffffff' }, // Белый фон
			  },
		 ],
	},
	selection: {
		 selectedSlideId: null, // Выбранный слайд (по умолчанию null)
		 selectedObjectId: null, // Выбранный объект (по умолчанию null)
	},
};

// Редуктор для редактора
function editorReducer(state: EditorType = initialState, action: any): EditorType {
	switch (action.type) {
		 case ADD_SLIDE:
			  return addSlide(state);

		 case REMOVE_SLIDE:
			  return removeSlide(state);

			  case SET_SELECTION:
            return {
                ...state,
                selection: {
                    selectedSlideId: action.payload.selectedSlideId,
                    selectedObjectId: action.payload.selectedObjectId,
                },
            };

		 case RENAME_PRESENTATION_TITLE:
			  return renamePresentationTitle(state, action.payload);

		 case ADD_TEXT_ELEMENT:
			  return addTextElement(state);

			  case CHANGE_BACKGROUND_COLOR:
            return changeBackgroundColor(state, action.payload.color);

		 case DELETE_ELEMENT:
			  return deleteElement(state);

		 case DELETE_BACKGROUND:
			  return deleteBackground(state);

		 case HANDLE_BACKGROUND_UPLOAD:
			  return changeBackgroundImage(state, action.payload);

		 case HANDLE_IMAGE_OBJ_UPLOAD:
			  return addPhotoElement(state, action.payload);

		 case INTERCHANGE_SLIDES:
			  return interchange(state, action.payload);

			  case UPDATE_OBJECT_POSITION:
            console.log('Updating object position:', action.payload); // Логируем новые координаты
            const { slideId, objectId, newPosition } = action.payload;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide) => {
                        if (slide.id === slideId) {
                            return {
                                ...slide,
                                objects: slide.objects.map((obj) => {
                                    if (obj.id === objectId) {
                                        return {
                                            ...obj,
                                            x: newPosition.x,
                                            y: newPosition.y,
                                        };
                                    }
                                    return obj;
                                }),
                            };
                        }
                        return slide;
                    }),
                },
            };
			  case IMPORT_FROM_JSON:
            return {
                ...state,
                presentation: action.payload.presentation,
                selection: action.payload.selection || {
                    selectedSlideId: null,
                    selectedObjectId: null,
                },
            };
				case UPDATE_OBJECT_SIZE: {
					const { slideId, objectId, newSize, newPosition } = action.payload;
					return {
						 ...state,
						 presentation: {
							  ...state.presentation,
							  slides: state.presentation.slides.map((slide) => {
									if (slide.id === slideId) {
										 return {
											  ...slide,
											  objects: slide.objects.map((obj) => {
													if (obj.id === objectId) {
														 return {
															  ...obj,
															  width: newSize.width,
															  height: newSize.height,
															  x: newPosition.x,
															  y: newPosition.y,
														 };
													}
													return obj;
											  }),
										 };
									}
									return slide;
							  }),
						 },
					};
			  }

		 default:
			  return state;
	}
}

export default editorReducer;