// useDrag.ts
import { useState, useRef, useEffect } from 'react';

function useDrag(
  initialPosition: { x: number; y: number },
  onDragEnd?: (newPosition: { x: number; y: number }) => void
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
        const newX = elementStartPos.current.x + dx;
        const newY = elementStartPos.current.y + dy;
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
  }, [isDragging, position, onDragEnd]);

  return { position, startDragging };
}

// Экспортируем useDrag как default
export default useDrag;