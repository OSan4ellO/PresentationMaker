import { ImageObjectType } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import useDrag from "./useDrag";

type ImageObjectProps = {
  imageObject: ImageObjectType;
  scale?: number;
  isSelected: boolean;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  slideWidth: number; // Ширина слайда
  slideHeight: number; // Высота слайда
};

function ImageObject({ imageObject, scale = 1, isSelected, onPositionChange, slideWidth, slideHeight }: ImageObjectProps) {
  const { position, startDragging } = useDrag(
    { x: imageObject.x, y: imageObject.y, width: imageObject.width, height: imageObject.height },
    onPositionChange,
    slideWidth,
    slideHeight,
    scale // Передаем масштаб
  );

  const imageObjectStyles: CSSProperties = {
    position: 'absolute',
    top: `${position.y * scale}px`,
    left: `${position.x * scale}px`,
    width: `${imageObject.width * scale}px`,
    height: `${imageObject.height * scale}px`,
    cursor: isSelected ? 'move' : 'default',
  };

  if (isSelected) {
    imageObjectStyles.border = '3px solid #8a2094';
  }

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <img
      style={imageObjectStyles}
      src={imageObject.src}
      onMouseDown={startDragging}
      onDragStart={handleDragStart}
      alt="object"
    />
  );
}

export { ImageObject };