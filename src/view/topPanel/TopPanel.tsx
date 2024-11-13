import styles from './TopPanel.module.css'
import {Button} from "../../components/button/Button.tsx";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import { addSlide } from '../../store/addSlide.ts';
import * as React from "react";
import { addTextElement } from '../../store/addTextElement.ts';
import { addPhotoElement } from '../../store/addPhotoElement.ts';
import { changeBackground } from '../../store/changeBackground.ts';




type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {

    function onAddSlide() {
		dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

	 function onaddPhotoElement() {
		dispatch(addPhotoElement)
	 }

	 function onAddTextElement() {
		dispatch(addTextElement)
	 }
	 function onchangeBackground() {
		dispatch(changeBackground)
	 }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div className={styles.slideButtonBar}>
                <Button className={styles.button} text={'Add slide'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Delete slide'} onClick={onRemoveSlide}></Button>
            </div>
				<div className={styles.toolBar}>
					<Button className={styles.button} text={'Add text'} onClick={onAddTextElement}></Button>
					<Button className={styles.button} text={'Add image'} onClick={onaddPhotoElement}></Button>
					<Button className={styles.button} text={'Change slide color'} onClick={onchangeBackground}></Button>
					<Button className={styles.button} text={'Change background'} onClick={onaddPhotoElement}></Button>
				</div>
        </div>
    )
}

export {
    TopPanel,
}
