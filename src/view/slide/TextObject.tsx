import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useRef } from "react";
import useDrag from "./useDrag";

type TextObjectProps = {
  textObject: TextObjectType;
  scale?: number;
  isSelected: boolean;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  slideWidth: number; // Ширина слайда
  slideHeight: number; // Высота слайда
};

function TextObject({ textObject, scale = 1, isSelected, onPositionChange, slideWidth, slideHeight }: TextObjectProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  // Функция для получения фактических размеров текста
  const getActualSize = () => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }
    return { width: textObject.width * scale, height: textObject.height * scale };
  };

  const { position, startDragging } = useDrag(
    { x: textObject.x, y: textObject.y, width: textObject.width, height: textObject.height },
    onPositionChange,
    slideWidth,
    slideHeight,
    scale,
    getActualSize // Передаем функцию для получения фактических размеров
  );

  const textObjectStyles: CSSProperties = {
    position: 'absolute',
    top: `${position.y * scale}px`,
    left: `${position.x * scale}px`,
    width: `${textObject.width * scale}px`,
    height: `${textObject.height * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    cursor: isSelected ? 'move' : 'default',
  };

  if (isSelected) {
    textObjectStyles.border = '3px solid #8a2094';
  }

  return (
    <p ref={textRef} style={textObjectStyles} onMouseDown={startDragging}>
      {textObject.text}
    </p>
  );
}

export { TextObject };