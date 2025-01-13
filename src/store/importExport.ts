import { getEditor, setEditor, dispatch } from './editor';
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

            // Валидируем документ перед загрузкой
            if (!validateDocument(newEditorState)) {
                console.error('Invalid document format');
                return;
            }

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