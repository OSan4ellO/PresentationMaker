import styles from './App.module.css'
import {SlidesList} from "./view/slideList/SlidesList.tsx";
import {TopPanel} from "./view/topPanel/TopPanel.tsx";
import {EditorType} from "./store/EditorType.ts";
import { Workspace } from './view/workSpace/Workspace.tsx';


type AppProps = {
    editor: EditorType,
}
function App({editor}: AppProps) { // получение актуальной модели редактора //
	if (!editor.selection) {
		return editor
  }
  const displayedSlideId = editor.selection.selectedSlideId
	const displayedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == displayedSlideId)
    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={editor.presentation.slides[displayedSlideIndex]} selectedObjectId={editor.selection.selectedObjectId}></Workspace>
            </div>
        </>
    )
}

export default App
