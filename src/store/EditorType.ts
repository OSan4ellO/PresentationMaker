import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    selectedSlideId: string | null,
	 selectedObjectId: string | null,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}

export type {
    EditorType,
    SelectionType,
}
