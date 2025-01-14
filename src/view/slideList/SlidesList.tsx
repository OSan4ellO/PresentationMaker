import styles from "./SlidesList.module.css";
import { Slide } from "../slide/Slide.tsx";
import { useDispatch } from "react-redux";
import { setSelection, interchangeSlides } from "../../redux/actions.ts";
import { useState } from "react";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListProps = {
    slides: Array<{ id: string; background: { type: string; color?: string; src?: string }; objects: Array<any> }>;
    selectedSlideId: string | null;
};

function SlidesList({ slides, selectedSlideId }: SlidesListProps) {
    const dispatch = useDispatch();
    const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);

    const handleDragStart = (_e: React.DragEvent, slideId: string) => {
        setDraggedSlideId(slideId);
    };

    const handleDrop = (e: React.DragEvent, targetSlideId: string) => {
        e.preventDefault();
        if (draggedSlideId && draggedSlideId !== targetSlideId) {
            dispatch(interchangeSlides({ draggedSlideId, targetSlideId }));
            setDraggedSlideId(null);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onSlideClick = (slideId: string) => {
        dispatch(setSelection({ selectedSlideId: slideId, selectedObjectId: null }));
    };

    return (
        <div className={styles.slideList}>
            {slides.map((slide) => (
                <div
                    key={slide.id}
                    onClick={() => onSlideClick(slide.id)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, slide.id)}
                    onDrop={(e) => handleDrop(e, slide.id)}
                    onDragOver={handleDragOver}
                >
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id === selectedSlideId}
                        className={styles.item}
                        selectedObjectId={null}
                    />
                </div>
            ))}
        </div>
    );
}

export { SlidesList };