import {editor} from './data.ts'

let _editor = editor
let _handler = null

const LOCAL_STORAGE_KEY = 'presentation_editor_state';

function getEditor() {
    return _editor
}

function setEditor(newEditor) {
    _editor = newEditor
    // Сохраняем состояние в localStorage при каждом изменении
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEditor));
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

// Функция для загрузки состояния из localStorage
function loadFromLocalStorage() {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
        _editor = JSON.parse(savedState);
    }
}

// Загружаем состояние из localStorage при старте
loadFromLocalStorage();

export {
	setEditor,
    getEditor,
    dispatch,
    addEditorChangeHandler,
}