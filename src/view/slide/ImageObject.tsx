// components/ImageObject.tsx
import { CSSProperties } from "react";
import { useAppDispatch } from '../../redux/hooks';
import { ImageObjectType } from "../../store/PresentationType.ts";
import useDrag from "./useDrag";
import { updateObjectPosition, setSelection } from '../../redux/actions.ts';

type ImageObjectProps = {
    imageObject: ImageObjectType & { slideId: string }; // Добавляем slideId
    scale?: number;
    isSelected: boolean;
};

function ImageObject({ imageObject, scale = 1, isSelected }: ImageObjectProps) {
    const dispatch = useAppDispatch();

    // Обработчик изменения позиции изображения
    const onDragEnd = (newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectPosition({
                slideId: imageObject.slideId,
                objectId: imageObject.id,
                newPosition,
            })
        );
    };

    // Используем хук useDrag для перетаскивания
    const { position, startDragging } = useDrag(
        { x: imageObject.x, y: imageObject.y, width: imageObject.width, height: imageObject.height },
        onDragEnd,
        935, // Ширина слайда
        525, // Высота слайда
        scale
    );

    // Обработчик клика для выделения объекта
    const handleClick = () => {
        dispatch(
            setSelection({
                selectedSlideId: imageObject.slideId,
                selectedObjectId: imageObject.id,
            })
        );
    };

    // Стили для изображения
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        cursor: isSelected ? 'move' : 'default',
        border: isSelected ? '3px solid #8a2094' : 'none', // Стиль для выделенного объекта
    };

    return (
        <img
            style={imageObjectStyles}
            src={imageObject.src}
            onMouseDown={(e) => {
                handleClick(); // Выделяем объект
                startDragging(e); // Начинаем перетаскивание
            }}
            alt="object"
        />
    );
}

export { ImageObject };