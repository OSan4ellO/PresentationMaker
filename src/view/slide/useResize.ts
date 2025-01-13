import { useState, useRef, useEffect } from 'react';

function useResize(initialSize: { width: number; height: number }) {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;
        const newHeight = e.clientY - rect.top;
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = () => {
    setIsResizing(true);
  };

  return { ref, size, startResizing };
}