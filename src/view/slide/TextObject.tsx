// components/TextObject.tsx
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useState } from "react";
import { useAppDispatch } from '../../redux/hooks';
import useDrag from "./useDrag";
import { updateObjectPosition, setSelection } from '../../redux/actions.ts';

type TextObjectProps = {
    textObject: TextObjectType & { slideId: string }; // Добавляем slideId
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

    // Обработчик клика для выделения объекта
    const handleClick = () => {
        dispatch(
            setSelection({
                selectedSlideId: textObject.slideId,
                selectedObjectId: textObject.id,
            })
        );
    };

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
        border: isSelected ? '2px solid #0b57d0' : 'none', // Стиль для выделенного объекта
    };

    return (
        <p
            onMouseDown={(e) => {
                handleClick(); // Выделяем объект
                startDragging(e); // Начинаем перетаскивание
            }}
            style={textObjectStyles}
        >
            {textValue}
        </p>
    );
}

export { TextObject };