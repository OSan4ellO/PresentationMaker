// components/TopPanel.tsx
import styles from './TopPanel.module.css';
import { useRef, useState } from 'react';
import { Button } from "../../components/button/Button.tsx";
import { useAppDispatch } from '../../redux/hooks';
import {
    addSlide,
    removeSlide,
    addTextElement,
    changeBackgroundColor,
    deleteElement,
    deleteBackground,
    handleBackgroundUpload,
    handleImageObjUpload,
    renamePresentationTitle,
    importFromJSON as importAction,
} from '../../redux/actions.ts';
import { exportToFile } from '../../store/export.ts';
import { getEditor } from '../../store/editor.ts';
import { importFromJSON } from '../../store/import.ts';

function TopPanel({ title }: { title: string }) {
    const dispatch = useAppDispatch();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [color, setColor] = useState("#561ecb");
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const importFileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, action: typeof handleBackgroundUpload | typeof handleImageObjUpload) => {
        if (event.target.files && event.target.files[0]) {
            dispatch(action({ file: event.target.files[0] }));
        }
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        try {
            const newEditorState = await importFromJSON(file);
            dispatch(importAction(newEditorState)); // Диспатчим действие импорта
        } catch (error) {
            alert(error); // Показываем ошибку пользователю
        }
    };

    const exportFile = () => {
        const editor = getEditor();
        exportToFile(editor);
    };

    return (
        <div className={styles.topPanel}>
            <input
                className={styles.title}
                type="text"
                maxLength={25}
                defaultValue={title}
                onBlur={(e) => dispatch(renamePresentationTitle({ title: e.target.value }))}
            />
            <input ref={fileInputRef1} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, handleBackgroundUpload)} />
            <input ref={fileInputRef2} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, handleImageObjUpload)} />
            <input ref={importFileInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
            <div className={styles.buttonContainer}>
                <Button className={styles.button} text="Add slide" onClick={() => dispatch(addSlide())} />
                <Button className={styles.button} text="Delete slide" onClick={() => dispatch(removeSlide())} />
                <Button className={styles.button} text="Add text" onClick={() => dispatch(addTextElement())} />
                <Button className={styles.button} text="Add image" onClick={() => fileInputRef2.current?.click()} />
                <Button className={styles.button} text="Delete element" onClick={() => dispatch(deleteElement())} />
                <Button className={styles.button} text="Change background" onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} />
                {isColorPickerOpen && (
                    <div className={styles.colorPickerContainer}>
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                        <Button className={`${styles.button} ${styles.applyButton}`} text="Apply Color" onClick={() => dispatch(changeBackgroundColor({ color }))} />
                        <Button className={`${styles.button} ${styles.applyButton}`} text="Change background image" onClick={() => fileInputRef1.current?.click()} />
                        <Button className={`${styles.button} ${styles.applyButton}`} text="Delete background" onClick={() => dispatch(deleteBackground())} />
                    </div>
                )}
                <Button className={styles.button} text="Export" onClick={() => exportFile()} />
                <Button className={styles.button} text="Import" onClick={() => importFileInputRef.current?.click()} />
            </div>
        </div>
    );
}

export { TopPanel };