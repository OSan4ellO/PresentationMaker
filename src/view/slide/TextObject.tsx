// components/TextObject.tsx
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useState } from "react";
import { useAppDispatch } from '../../redux/hooks';
import useDrag from "./useDrag";
import { updateObjectPosition } from '../../redux/actions.ts';

type TextObjectProps = {
    textObject: TextObjectType & { slideId: string }; 
    scale?: number;
    isSelected: boolean;
};

function TextObject({ textObject, scale = 1, isSelected }: TextObjectProps) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(textObject.text);

    // Обработчик изменения позиции текстового объекта
    const onDragEnd = (newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectPosition({
                slideId: textObject.slideId, 
                objectId: textObject.id,
                newPosition,
            })
        );
    };

    // Используем хук useDrag для перетаскивания
    const { position, startDragging } = useDrag(
        { x: textObject.x, y: textObject.y, width: textObject.width, height: textObject.height },
        onDragEnd,
        935, // Ширина слайда
        525, // Высота слайда
        scale
    );

    // Стили для текстового объекта
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        margin: '0',
        cursor: isSelected ? 'move' : 'default',
        border: isSelected ? '2px solid #0b57d0' : 'none',
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
		  localStorage.setItem(`text_${textObject.id}`, textValue);
    };

    return (
        <>
            {isEditing ? (
                <input
                    type="text"
                    value={textValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{ ...textObjectStyles, fontSize: `${textObject.fontSize * scale}px` }}
                />
            ) : (
                // Отображение текста
                <p
                    onDoubleClick={handleDoubleClick}
                    onMouseDown={startDragging}
                    style={textObjectStyles}
                >
                    {textValue}
                </p>
            )}
        </>
    );
}

export { TextObject };