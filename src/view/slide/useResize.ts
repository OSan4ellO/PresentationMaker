// hooks/useResize.ts
import { useState, useEffect } from 'react';

type ResizeHandler = (newSize: { width: number; height: number }, newPosition: { x: number; y: number }) => void;

function useResize(
    initialSize: { width: number; height: number },
    initialPosition: { x: number; y: number },
    onResize: ResizeHandler
) {
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState(initialSize);
    const [startPosition, setStartPosition] = useState(initialPosition);
    const [handle, setHandle] = useState<string | null>(null);

    const startResizing = (e: React.MouseEvent, handle: string) => {
        e.stopPropagation();
        setIsResizing(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartSize(initialSize);
        setStartPosition(initialPosition);
        setHandle(handle);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizing && handle) {
                const dx = e.clientX - startPos.x;
                const dy = e.clientY - startPos.y;

                let newWidth = startSize.width;
                let newHeight = startSize.height;
                let newX = startPosition.x;
                let newY = startPosition.y;

                switch (handle) {
                    case 'top':
                        newHeight = startSize.height - dy;
                        newY = startPosition.y + dy;
                        break;
                    case 'bottom':
                        newHeight = startSize.height + dy;
                        break;
                    case 'left':
                        newWidth = startSize.width - dx;
                        newX = startPosition.x + dx;
                        break;
                    case 'right':
                        newWidth = startSize.width + dx;
                        break;
                    case 'top-left':
                        newWidth = startSize.width - dx;
                        newHeight = startSize.height - dy;
                        newX = startPosition.x + dx;
                        newY = startPosition.y + dy;
                        break;
                    case 'top-right':
                        newWidth = startSize.width + dx;
                        newHeight = startSize.height - dy;
                        newY = startPosition.y + dy;
                        break;
                    case 'bottom-left':
                        newWidth = startSize.width - dx;
                        newHeight = startSize.height + dy;
                        newX = startPosition.x + dx;
                        break;
                    case 'bottom-right':
                        newWidth = startSize.width + dx;
                        newHeight = startSize.height + dy;
                        break;
                    default:
                        break;
                }

                onResize({ width: newWidth, height: newHeight }, { x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, startPos, startSize, startPosition, handle, onResize]);

    return { startResizing };
}

export { useResize };