import styles from './TopPanel.module.css';
import { useRef, useState } from 'react';
import { Button } from "../../components/button/Button.tsx";
import { dispatch } from "../../store/editor.ts";
import { removeSlide } from "../../store/removeSlide.ts";
import { onTitleChange } from "../../store/renamePresentationTitle.ts";
import { addSlide } from '../../store/addSlide.ts';
import { addTextElement } from '../../store/addTextElement.ts';
import { addPhotoElement } from '../../store/addPhotoElement.ts';
import { changeBackgroundColor } from '../../store/changeBackgroundColor.ts';
// import { changeBackgroundImage } from '../../store/changeBackgroundImage.ts';
import { deleteElement } from '../../store/deleteElement.ts';
import { deleteBackground } from '../../store/deleteBackground.ts';
import { handleFileUpload } from '../../store/imageConverter.ts';

type TopPanelProps = {
    title: string,
}

function TopPanel({ title }: TopPanelProps) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [color, setColor] = useState("#561ecb");  // Цвет по умолчанию
    const fileInputRef1 = useRef<HTMLInputElement>(null);
	 const fileInputRef2 = useRef<HTMLInputElement>(null);

    function onAddSlide() {
        dispatch(addSlide);
    }

    function onRemoveSlide() {
        dispatch(removeSlide);
    }

	 function onAddPhotoElement(event: React.ChangeEvent<HTMLInputElement>){
		const file = event.target.files?.[0]; 
		if (file) {
			 const fileURL = URL.createObjectURL(file); 
			 dispatch(addPhotoElement, fileURL); 
		}
  }

    function onAddTextElement() {
        dispatch(addTextElement);
    }

    function onChangeBackgroundColor() {
        dispatch(changeBackgroundColor, color);
        setIsColorPickerOpen(false);
    }

    function onDeleteElement() {
        dispatch(deleteElement);
    }

    function onDeleteBackground() {
        dispatch(deleteBackground);
    }

    function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value);
    }

    return (
        <div className={styles.topPanel}>
            <input
                className={styles.title}
                type="text"
					 maxLength = {25}
                defaultValue={title}
                onBlur={onTitleChange}
            />
            <input
                ref={fileInputRef1} 
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
				<input
                ref={fileInputRef2} 
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onAddPhotoElement}
            />
            <div className={styles.slideButtonBar}>
                <Button className={styles.button} text="Add slide" onClick={onAddSlide} />
                <Button className={styles.button} text="Delete slide" onClick={onRemoveSlide} />
            </div>
            <div className={styles.toolBar}>
                <Button className={styles.button} text="Add text" onClick={onAddTextElement} />
                <Button className={styles.button} text="Add image" onClick={() => fileInputRef2.current?.click()} />
                <Button className={styles.button} text="Delete element" onClick={onDeleteElement} />
                <Button
                    className={styles.button}
                    text="Change background"
                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                />
            </div>
            {isColorPickerOpen && (
                <div className={styles.colorPickerContainer}>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Apply Color"
                        onClick={onChangeBackgroundColor}
                    />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Change background image"
                        onClick={() => fileInputRef1.current?.click()}
                    />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Delete background"
                        onClick={onDeleteBackground}
                    />
                </div>
            )}
        </div>
    );
}

export {
    TopPanel,
};
