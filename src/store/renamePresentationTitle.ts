import { dispatch } from "./editor.ts";
import {EditorType} from "./EditorType.ts";


function onTitleChange(event: React.FocusEvent<HTMLInputElement>) {
	if (!event.target.value.trim()) {
		 event.target.value = "Unnamed presentation (enter title)";
		 dispatch(renamePresentationTitle, "Unnamed presentation (enter title)");
	} else {
		 dispatch(renamePresentationTitle, event.target.value);
	}
	function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
		if (!newTitle.trim()) {
			return {
				...editor,
				presentation: {
					 ...editor.presentation,
					 title: "Unnamed presentation (enter title)",
				}
		  }
		} else {
			return {
				...editor,
				presentation: {
					 ...editor.presentation,
					 title: newTitle,
				}
		  	}
		}
	}
}

export {
	onTitleChange,
}
