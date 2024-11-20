import styles from './TopPanel.module.css'
import { useState } from 'react';
import {Button} from "../../components/button/Button.tsx";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import { addSlide } from '../../store/addSlide.ts';
import * as React from "react";
import { addTextElement } from '../../store/addTextElement.ts';
import { addPhotoElement } from '../../store/addPhotoElement.ts';
import { changeBackgroundColor } from '../../store/changeBackgroundColor.ts';
import { ColorPicker, useColor } from "react-color-palette";
import { changeBackgroundImage } from '../../store/changeBackgroundImage.ts';
import "react-color-palette/css";
import { deleteElement } from '../../store/deleteElement.ts';
import { deleteBackground } from '../../store/deleteBackground.ts';





type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {
	
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(null);
	const [color, setColor] = useColor("#561ecb");

    function onAddSlide() {
		dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

	 function onAddPhotoElement() {
		dispatch(addPhotoElement)
	 }

	 function onAddTextElement() {
		dispatch(addTextElement)
	 }
	 function onChangeBackgroundColor() {
		dispatch(changeBackgroundColor, color.hex);  
        setIsColorPickerOpen(false);  
	 }

	 function onChangeBackgroundImage() {
		dispatch(changeBackgroundImage);
		setIsColorPickerOpen(false);  
	 }

	 function onDeleteElement() {
		dispatch(deleteElement)
	 }

	 function onDeleteBackground() {
		dispatch(deleteBackground)
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
					<Button className={styles.button} text={'Add image'} onClick={onAddPhotoElement}></Button>
					<Button className={styles.button} text={'Delete element'} onClick={onDeleteElement}></Button>
					<Button className={styles.button} text={'Change background'} onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} ></Button>
				</div>
				{isColorPickerOpen && (
                <div className={styles.colorPickerContainer}>
                    <ColorPicker color={color} onChange={setColor}/>
                    <Button className={`${styles.button} ${styles.applyButton}`} text="Apply Color" onClick={onChangeBackgroundColor} />
						  <Button className={`${styles.button} ${styles.applyButton}`} text={'Change background'} onClick={onChangeBackgroundImage}></Button>
						  <Button className={`${styles.button} ${styles.applyButton}`} text={'Delete background'} onClick={onDeleteBackground}></Button>
                </div>
            )}
        </div>
    )

}

export {
    TopPanel,
}
