import { UnknownAction } from "redux";
import { EditorType } from "../../functions/EditorType";
import { EditorActions } from "../actions/editorActions";
import { updateEditor } from "../../functions/updateEditor";
import { HistoryManeger } from "../../storage/store";

const editorReducer = (state: HistoryManeger, action: UnknownAction): HistoryManeger => {
    switch(action.type){

        case EditorActions.SET_IS_CHANGING: {
            return {past: state.past, current: state.current, future: state.future, isChanging: action.payload as boolean};
        }
        case EditorActions.IMPORT: {
            return updateEditor(state,action.payload as EditorType);
        }
        default:
            return state;
    }
}

export {
    editorReducer,
}