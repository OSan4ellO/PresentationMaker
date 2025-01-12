import styles from './TopPanel.module.css';
import { useRef, useState } from 'react';
import { Button } from "../../components/button/Button.tsx";
import { dispatch } from "../../store/editor.ts";
import { removeSlide } from "../../store/removeSlide.ts";
import { onTitleChange } from "../../store/renamePresentationTitle.ts";
import { addSlide } from '../../store/addSlide.ts';
import { addTextElement } from '../../store/addTextElement.ts';
import { changeBackgroundColor } from '../../store/changeBackgroundColor.ts';
import { deleteElement } from '../../store/deleteElement.ts';
import { deleteBackground } from '../../store/deleteBackground.ts';
import { handleBackgorundUpload } from '../../store/backgroundImageTo64.ts';
import { handleImageObjUpload } from '../../store/imageObjTo64.ts';
import { exportToJSON, importFromJSON } from '../../store/importExport.ts'; // Импортируем функции из importExport.ts

type TopPanelProps = {
    title: string,
}

function TopPanel({ title }: TopPanelProps) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [color, setColor] = useState("#561ecb");  // Цвет по умолчанию
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const importFileInputRef = useRef<HTMLInputElement>(null); // Ref для импорта

    function onAddSlide() {
        dispatch(addSlide);
    }

    function onRemoveSlide() {
        dispatch(removeSlide);
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
                maxLength={25}
                defaultValue={title}
                onBlur={onTitleChange}
            />
            <input
                ref={fileInputRef1} 
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBackgorundUpload}
            />
            <input
                ref={fileInputRef2} 
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageObjUpload}
            />
            <input
                ref={importFileInputRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={importFromJSON} // Используем функцию importFromJSON
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
            {/* Новые кнопки для импорта и экспорта */}
            <div className={styles.importExportBar}>
                <Button className={styles.button} text="Export" onClick={exportToJSON} /> {/* Используем функцию exportToJSON */}
                <Button className={styles.button} text="Import" onClick={() => importFileInputRef.current?.click()} />
            </div>
        </div>
    );
}

export {
    TopPanel,
};