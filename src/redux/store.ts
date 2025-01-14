// store/store.ts
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import editorReducer from './reducers'; 
import { EditorType } from '../store/EditorType';


const rootReducer = combineReducers({
    editor: editorReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

// загрузка состояния из localStorage
function loadFromLocalStorage(): EditorType | undefined {
    const serializedState = localStorage.getItem('presentation_editor_state');
    if (serializedState === null) {
        return undefined; 
    }
    try {
        const state = JSON.parse(serializedState);

        if (!state.presentation || !state.selection) {
            console.error('Invalid state in localStorage');
            localStorage.removeItem('presentation_editor_state'); 
            return undefined;
        }

        return state; // Возвращаем состояние, если оно валидно
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        localStorage.removeItem('presentation_editor_state'); 
        return undefined;
    }
}

// сохранение состояния в localStorage
function saveToLocalStorage(state: EditorType) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('presentation_editor_state', serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
}

// начальное состояние из localStorage
const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    { editor: persistedState || { presentation: { title: 'New Presentation', slides: [] }, selection: { selectedSlideId: null, selectedObjectId: null } } }, // Начальное состояние
    applyMiddleware() 
);


store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state.editor); 
});

export default store;