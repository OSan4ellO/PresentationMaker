import { getEditor, setEditor, dispatch } from './editor';

/**
 * Экспорт текущего состояния редактора в JSON-файл.
 */
function exportToJSON() {
    const editorState = getEditor();
    const dataStr = JSON.stringify(editorState, null, 2); // Форматируем JSON для читаемости
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.json'; // Имя файла
    link.click();

    // Освобождаем память
    URL.revokeObjectURL(url);
}

/**
 * Импорт состояния редактора из JSON-файла.
 * @param event - Событие изменения input[type="file"].
 */
function importFromJSON(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result as string;
            const newEditorState = JSON.parse(text);

            // Устанавливаем новое состояние редактора
            setEditor(newEditorState);

            // Обновляем состояние редактора (если нужно)
            dispatch(() => newEditorState);
        } catch (error) {
            console.error('Error parsing JSON file:', error);
        }
    };
    reader.readAsText(file);
}

export { exportToJSON, importFromJSON };