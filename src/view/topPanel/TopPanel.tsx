import styles from './TopPanel.module.css';
import { useState } from 'react';
import { Button } from "../../components/button/Button.tsx";
import { dispatch } from "../../store/editor.ts";
import { removeSlide } from "../../store/removeSlide.ts";
import { renamePresentationTitle } from "../../store/renamePresentationTitle.ts";
import { addSlide } from '../../store/addSlide.ts';
import { addTextElement } from '../../store/addTextElement.ts';
import { addPhotoElement } from '../../store/addPhotoElement.ts';
import { changeBackgroundColor } from '../../store/changeBackgroundColor.ts';
import { ColorPicker, useColor } from "react-color-palette";
import { changeBackgroundImage } from '../../store/changeBackgroundImage.ts';
import "react-color-palette/css";
import { deleteElement } from '../../store/deleteElement.ts';
import { deleteBackground } from '../../store/deleteBackground.ts';

// Функция для конвертации файла в Base64
const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

type TopPanelProps = {
    title: string,
}

function TopPanel({ title }: TopPanelProps) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [color, setColor] = useColor("#561ecb");

    function onAddSlide() {
        dispatch(addSlide);
    }

    function onRemoveSlide() {
        dispatch(removeSlide);
    }

    function onAddPhotoElement() {
        dispatch(addPhotoElement);
    }

    function onAddTextElement() {
        dispatch(addTextElement);
    }

    function onChangeBackgroundColor() {
        dispatch(changeBackgroundColor, color.hex);
        setIsColorPickerOpen(false);
    }

    function onDeleteElement() {
        dispatch(deleteElement);
    }

    function onDeleteBackground() {
        dispatch(deleteBackground);
    }

    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                const base64Image = await convertFileToBase64(file);
                dispatch(changeBackgroundImage, base64Image); // передаем Base64
            } catch (error) {
                console.error("Ошибка при конвертации файла:", error);
            }
        }
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value);
    };

    return (
        <div className={styles.topPanel}>
            <input
                className={styles.title}
                type="text"
                defaultValue={title}
                onChange={onTitleChange}
            />
            <div className={styles.slideButtonBar}>
                <Button className={styles.button} text="Add slide" onClick={onAddSlide} />
                <Button className={styles.button} text="Delete slide" onClick={onRemoveSlide} />
            </div>
            <div className={styles.toolBar}>
                <Button className={styles.button} text="Add text" onClick={onAddTextElement} />
                <Button className={styles.button} text="Add image" onClick={onAddPhotoElement} />
                <Button className={styles.button} text="Delete element" onClick={onDeleteElement} />
                <Button
                    className={styles.button}
                    text="Change background"
                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                />
            </div>
            {isColorPickerOpen && (
                <div className={styles.colorPickerContainer}>
                    <ColorPicker color={color} onChange={setColor} />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Apply Color"
                        onClick={onChangeBackgroundColor}
                    />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Change background image"
                        onClick={() => document.getElementById("fileInput")?.click()}
                    />
                    <Button
                        className={`${styles.button} ${styles.applyButton}`}
                        text="Delete background"
                        onClick={onDeleteBackground}
                    />
                </div>
            )}
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
        </div>
    );
}

export {
    TopPanel,
};
