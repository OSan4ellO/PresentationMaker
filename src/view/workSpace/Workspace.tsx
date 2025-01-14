import { Slide } from "../slide/Slide.tsx";
import styles from './Workspace.module.css';
import { useAppSelector } from '../../redux/hooks'; // Используем useAppSelector

function Workspace() {
    const selectedSlideId = useAppSelector((state) => state.editor.selection.selectedSlideId);
    const slides = useAppSelector((state) => state.editor.presentation.slides);
    const displayedSlide = slides.find((slide) => slide.id === selectedSlideId);

    if (!displayedSlide) {
        return null;
    }

    return (
        <div className={styles.workspace}>
            <Slide
                slide={displayedSlide}
                isSelected={false}
                className={""}
                selectedObjectId={null}
            />
        </div>
    );
}

export { Workspace };