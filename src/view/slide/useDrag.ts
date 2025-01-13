import { useState, useRef, useEffect } from 'react';

function useDrag(
  initialPosition: { x: number; y: number; width?: number; height?: number },
  onDragEnd?: (newPosition: { x: number; y: number }) => void,
  slideWidth: number = 935, // Ширина слайда по умолчанию
  slideHeight: number = 525 // Высота слайда по умолчанию
) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const startDragging = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { x: position.x, y: position.y };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;

        // Новые координаты объекта
        let newX = elementStartPos.current.x + dx;
        let newY = elementStartPos.current.y + dy;

        // Ограничиваем координаты границами слайда
        const objectWidth = initialPosition.width || 0;
        const objectHeight = initialPosition.height || 0;

        // Правая граница: x + width <= slideWidth
        newX = Math.max(0, Math.min(newX, slideWidth - objectWidth));

        // Нижняя граница: y + height <= slideHeight
        newY = Math.max(0, Math.min(newY, slideHeight - objectHeight));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (typeof onDragEnd === 'function') {
        onDragEnd(position);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, onDragEnd, slideWidth, slideHeight, initialPosition.width, initialPosition.height]);

  return { position, startDragging };
}

export default useDrag;