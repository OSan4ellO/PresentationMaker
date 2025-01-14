// components/Workspace.tsx
import { Slide } from "../slide/Slide.tsx";
import styles from './Workspace.module.css';
import { useAppSelector } from '../../redux/hooks';

function Workspace() {
    const selectedSlideId = useAppSelector((state) => state.editor.selection.selectedSlideId);
    const selectedObjectId = useAppSelector((state) => state.editor.selection.selectedObjectId); // Получаем selectedObjectId
    const slides = useAppSelector((state) => state.editor.presentation.slides);
    const displayedSlide = slides.find((slide) => slide.id === selectedSlideId);

    if (!displayedSlide) {
        return null;
    }

    return (
        <div className={styles.workspace}>
            <Slide
                slide={displayedSlide}
                isSelected={true} // Слайд выделен
                className={""}
                selectedObjectId={selectedObjectId} // Передаем selectedObjectId
            />
        </div>
    );
}

export { Workspace };