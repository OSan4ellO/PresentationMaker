import {SlideType} from "../../store/PresentationType.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'


type WorkspaceProps = {
    slide: SlideType,
	 selectedObjectId: string | null,
}

function Workspace({slide, selectedObjectId}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <Slide slide={slide} isSelected={false} className={""} selectedObjectId={selectedObjectId}></Slide>
        </div>
    )
}

export {
	Workspace,
}
