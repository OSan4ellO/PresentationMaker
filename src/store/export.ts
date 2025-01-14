import { EditorType } from "./EditorType";

 export function exportToFile(editor: EditorType): void{
	const dataStr = JSON.stringify(editor, null, 2);
	const blob = new Blob([dataStr], { type: 'application/json' });
	const linkElem = document.createElement('a');
	const url = URL.createObjectURL(blob);
	linkElem.setAttribute('href', url);
	linkElem.setAttribute('download', 'presentation.json');
	linkElem.click();
	URL.revokeObjectURL(url);
}