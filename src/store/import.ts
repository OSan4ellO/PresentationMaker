// utils/importFromJSON.ts
import { editorSchema } from './schema';
import Ajv from 'ajv';

const ajv = new Ajv();

function validateDocument(data: any): boolean {
    const validate = ajv.compile(editorSchema);
    const isValid = validate(data);
    if (!isValid) {
        console.error('Validation errors:', validate.errors);
    }
    return !!isValid;
}

async function importFromJSON(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const newEditorState = JSON.parse(text);

                // Валидируем документ перед загрузкой
                if (!validateDocument(newEditorState)) {
                    console.error('Invalid document format');
                    reject('Invalid document format. Please check the file.');
                    return;
                }

                // Убедимся, что selection существует
                if (!newEditorState.selection) {
                    newEditorState.selection = {
                        selectedSlideId: null,
                        selectedObjectId: null,
                    };
                }

                resolve(newEditorState); // Возвращаем данные для Redux
            } catch (error) {
                console.error('Error parsing JSON file:', error);
                reject('Error parsing JSON file. Please check the file.');
            }
        };
        reader.readAsText(file);
    });
}

export { importFromJSON };