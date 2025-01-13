// TextObject.tsx
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import useDrag from "./useDrag"; // Импортируем useDrag как default

type TextObjectProps = {
  textObject: TextObjectType;
  scale?: number;
  isSelected: boolean;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
};

function TextObject({ textObject, scale = 1, isSelected, onPositionChange }: TextObjectProps) {
  const { position, startDragging } = useDrag(
    { x: textObject.x, y: textObject.y },
    onPositionChange
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
    <p style={textObjectStyles} onMouseDown={startDragging}>
      {textObject.text}
    </p>
  );
}

export { TextObject };