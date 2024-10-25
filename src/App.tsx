import {TopPanel} from "./view/topPanel/TopPanel"
import './App.css'

function App() {
<>
	<TopPanel title={editor.presentation.title}></TopPanel>
	<div className={styles.container}>
		 <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
		 <Workspace slide={editor.presentation.slides[0]}></Workspace>
	</div>
</>
}

export default App
