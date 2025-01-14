// components/TextObject.tsx
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch } from '../../redux/hooks';
import useDrag from "./useDrag";
import { updateObjectPosition, setSelection, updateObjectSize } from '../../redux/actions.ts';
import { useResize } from "./useResize.ts";

type TextObjectProps = {
    textObject: TextObjectType & { slideId: string };
    scale?: number;
    isSelected: boolean;
};

function TextObject({ textObject, scale = 1, isSelected }: TextObjectProps) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(textObject.text);

    const onDragEnd = (newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectPosition({
                slideId: textObject.slideId,
                objectId: textObject.id,
                newPosition,
            })
        );
    };

    const { position, startDragging } = useDrag(
        { x: textObject.x, y: textObject.y, width: textObject.width, height: textObject.height },
        onDragEnd,
        935,
        525,
        scale
    );

    const handleClick = () => {
        dispatch(
            setSelection({
                selectedSlideId: textObject.slideId,
                selectedObjectId: textObject.id,
            })
        );
    };

    const onResize = (newSize: { width: number; height: number }, newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectSize({
                slideId: textObject.slideId,
                objectId: textObject.id,
                newSize,
                newPosition,
            })
        );
    };

    const { startResizing } = useResize(
        { width: textObject.width, height: textObject.height },
        { x: textObject.x, y: textObject.y },
        onResize
    );

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

    return (
        <div style={{ position: 'absolute', top: `${position.y * scale}px`, left: `${position.x * scale}px` }}>
            <p
                onMouseDown={(e) => {
                    handleClick();
                    startDragging(e);
                }}
                style={{
                    width: `${textObject.width * scale}px`,
                    height: `${textObject.height * scale}px`,
                    fontSize: `${textObject.fontSize * scale}px`,
                    margin: '0',
                    cursor: isSelected ? 'move' : 'default',
                    border: isSelected ? '2px solid #0b57d0' : 'none',
                }}
            >
                {textValue}
            </p>
            {isSelected && (
                <>
                    {/* Точки для ресайза */}
                    {/* Верхняя точка */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'n-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'top')}
                    />
                    {/* Нижняя точка */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 's-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'bottom')}
                    />
                    {/* Левая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-5px',
                            transform: 'translateY(-50%)',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'w-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'left')}
                    />
                    {/* Правая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-5px',
                            transform: 'translateY(-50%)',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'e-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'right')}
                    />
                    {/* Верхняя левая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            left: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'nw-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'top-left')}
                    />
                    {/* Верхняя правая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'ne-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'top-right')}
                    />
                    {/* Нижняя левая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-5px',
                            left: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'sw-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'bottom-left')}
                    />
                    {/* Нижняя правая точка */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-5px',
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            cursor: 'se-resize',
                        }}
                        onMouseDown={(e) => startResizing(e, 'bottom-right')}
                    />
                </>
            )}
        </div>
    );
}

export { TextObject };