// components/ImageObject.tsx
import { CSSProperties, useEffect } from "react";
import { useAppDispatch } from '../../redux/hooks';
import { ImageObjectType } from "../../store/PresentationType.ts";
import useDrag from "./useDrag";
import { updateObjectPosition, setSelection, updateObjectSize } from '../../redux/actions.ts';
import { useResize } from "./useResize.ts";

type ImageObjectProps = {
    imageObject: ImageObjectType & { slideId: string };
    scale?: number;
    isSelected: boolean;
};

function ImageObject({ imageObject, scale = 1, isSelected }: ImageObjectProps) {
    const dispatch = useAppDispatch();

    const onDragEnd = (newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectPosition({
                slideId: imageObject.slideId,
                objectId: imageObject.id,
                newPosition,
            })
        );
    };

    const { position, startDragging } = useDrag(
        { x: imageObject.x, y: imageObject.y, width: imageObject.width, height: imageObject.height },
        onDragEnd,
        935,
        525,
        scale
    );

    const handleClick = () => {
        dispatch(
            setSelection({
                selectedSlideId: imageObject.slideId,
                selectedObjectId: imageObject.id,
            })
        );
    };

    const onResize = (newSize: { width: number; height: number }, newPosition: { x: number; y: number }) => {
        dispatch(
            updateObjectSize({
                slideId: imageObject.slideId,
                objectId: imageObject.id,
                newSize,
                newPosition,
            })
        );
    };

    const { startResizing } = useResize(
        { width: imageObject.width, height: imageObject.height },
        { x: imageObject.x, y: imageObject.y },
        onResize
    );

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        cursor: isSelected ? 'move' : 'default',
        border: isSelected ? '3px solid #8a2094' : 'none',
    };

    // Очистка Blob URL при удалении компонента
    useEffect(() => {
        return () => {
            if (imageObject.src.startsWith('blob:')) {
                URL.revokeObjectURL(imageObject.src);
            }
        };
    }, [imageObject.src]);

    return (
        <div style={{ position: 'absolute', top: `${position.y * scale}px`, left: `${position.x * scale}px` }}>
            <img
                style={{
                    width: `${imageObject.width * scale}px`,
                    height: `${imageObject.height * scale}px`,
                    cursor: isSelected ? 'move' : 'default',
                    border: isSelected ? '3px solid #8a2094' : 'none',
                }}
                src={imageObject.src}
                onMouseDown={(e) => {
                    handleClick();
                    startDragging(e);
                }}
                alt="object"
            />
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

export { ImageObject };