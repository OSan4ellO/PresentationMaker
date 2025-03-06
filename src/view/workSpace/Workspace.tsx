import { useEffect } from "react";
import { SlideType} from "../../store/functions/PresentationType.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'
import { useDispatch } from "react-redux";


function Workspace() {

    const appDispatch = useDispatch();
    const edditor = useAppSelector(state => state);
    const slides = edditor.current.presentation.slides;
    const selectiion = edditor.current.selection;
    const selectedSlide: SlideType = slides.find(s => s.id === selectiion?.selectedSlideId) || slides[0];
    const selectedElement = selectiion.selectedElementId || null;


    return (
        <div className={styles.workspace}>
            {selectedSlide ?(
                <Slide slide={selectedSlide} isSelected={false} className={""} selectedElementId={selectedElement}></Slide>
            ): (
                <div className={styles.none}/>
            )}
        </div>
    );
}

export {
    Workspace,
}