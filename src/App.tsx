// App.tsx
import styles from './App.module.css';
import { SlidesList } from "./view/slideList/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from './view/workSpace/Workspace.tsx';
import { useAppSelector } from './redux/hooks.ts';

function App() {
    const presentation = useAppSelector((state) => state.editor.presentation);
    const selection = useAppSelector((state) => state.editor.selection);

    // Проверка на undefined
    if (!presentation || !presentation.slides || !selection) {
        return <div>Loading...</div>; 
    }

    const selectedSlideId = selection.selectedSlideId;
    const displayedSlide = presentation.slides.find((slide) => slide.id === selectedSlideId);

    return (
        <>
            <TopPanel title={presentation.title} />
            <div className={styles.container}>
                <SlidesList slides={presentation.slides} selectedSlideId={selectedSlideId} />
                {displayedSlide && <Workspace slide={displayedSlide} />}
            </div>
        </>
    );
}

export default App;