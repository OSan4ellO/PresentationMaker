import { editor } from './data';
import { editorSchema } from './schema'; // Импортируем схему для валидации
import Ajv from 'ajv'; // Импортируем Ajv для валидации

const ajv = new Ajv(); // Создаем экземпляр Ajv

/**
 * Валидация документа.
 * @param data - Данные для валидации.
 * @returns {boolean} - true, если данные валидны, иначе false.
 */
function validateDocument(data: any): boolean {
  const validate = ajv.compile(editorSchema);
  const isValid = validate(data);
  if (!isValid) {
    console.error('Validation errors:', validate.errors);
  }
  return !!isValid;
}

let _editor = editor; // Ваше текущее состояние редактора
let _handler = null;

const LOCAL_STORAGE_KEY = 'presentation_editor_state';

function getEditor() {
    return _editor;
}

function setEditor(newEditor) {
    _editor = newEditor;
    // Сохраняем состояние в localStorage при каждом изменении
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEditor));
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler;
}

/**
 * Загрузка состояния из localStorage.
 */
/**
 * Загрузка состояния из localStorage.
 */
function loadFromLocalStorage() {
	const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (savedState) {
		 try {
			  const editorState = JSON.parse(savedState);

			  // Убедимся, что selection существует и содержит обязательные поля
			  if (!editorState.selection) {
					editorState.selection = {
						 selectedSlideId: null,
						 selectedObjectId: null,
					};
			  } else {
					if (editorState.selection.selectedSlideId === undefined) {
						 editorState.selection.selectedSlideId = null;
					}
					if (editorState.selection.selectedObjectId === undefined) {
						 editorState.selection.selectedObjectId = null; // Устанавливаем null вместо undefined
					}
			  }

			  // Валидируем документ перед загрузкой
			  if (!validateDocument(editorState)) {
					console.error('Invalid document format in localStorage');
					return;
			  }

			  _editor = editorState; // Устанавливаем валидное состояние
		 } catch (error) {
			  console.error('Error parsing localStorage data:', error);
		 }
	}
}

// Загружаем состояние из localStorage при старте
loadFromLocalStorage();

export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler,
};