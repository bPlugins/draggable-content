import { useCallback, useEffect, useState, useRef } from "react";

export const useDrag = ({ ref, calculateFor = "topLeft" }) => {
    const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });
    const dragInfoRef = useRef(null);
    const isDraggingRef = useRef(false);

    const updateFinalPosition = useCallback(
        (width, height, x, y) => {
            if (calculateFor === "bottomRight") {
                setFinalPosition({
                    x: Math.max(
                        Math.min(
                            window.innerWidth - width,
                            window.innerWidth - (x + width)
                        ),
                        0
                    ),
                    y: Math.max(
                        Math.min(
                            window.innerHeight - height,
                            window.innerHeight - (y + height)
                        ),
                        0
                    )
                });
            } else {
                setFinalPosition({
                    x: Math.min(Math.max(0, x), window.innerWidth - width),
                    y: Math.min(Math.max(0, y), window.innerHeight - height)
                });
            }
        },
        [calculateFor]
    );

    const handleMouseUp = useCallback((evt) => {
        evt.preventDefault();
        isDraggingRef.current = false;
        dragInfoRef.current = null;
    }, []);

    const handleMouseDown = useCallback((evt) => {
        evt.preventDefault();
        const { current: draggableElement } = ref;

        if (!draggableElement) {
            return;
        }

        const { clientX, clientY } = evt;
        const { top, left, width, height } = draggableElement.getBoundingClientRect();

        isDraggingRef.current = true;
        dragInfoRef.current = {
            startX: clientX,
            startY: clientY,
            top,
            left,
            width,
            height
        };
    }, [ref]);

    const handleMouseMove = useCallback(
        (evt) => {
            if (!isDraggingRef.current || !dragInfoRef.current) return;

            evt.preventDefault();

            // Check if mouse is still within the viewport
            if (
                evt.clientX < 0 ||
                evt.clientX > window.innerWidth ||
                evt.clientY < 0 ||
                evt.clientY > window.innerHeight
            ) {
                isDraggingRef.current = false;
                return;
            }

            const { clientX, clientY } = evt;
            const { startX, startY, top, left, width, height } = dragInfoRef.current;

            const position = {
                x: startX - clientX,
                y: startY - clientY
            };

            updateFinalPosition(width, height, left - position.x, top - position.y);
        },
        [updateFinalPosition]
    );

    const recalculate = useCallback((width, height) => {
        const { current: draggableElement } = ref;
        if (!draggableElement) return;

        const {
            top,
            left,
            width: boundingWidth,
            height: boundingHeight
        } = draggableElement.getBoundingClientRect();

        updateFinalPosition(
            width ?? boundingWidth,
            height ?? boundingHeight,
            left,
            top
        );
    }, [ref, updateFinalPosition]);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return {
        position: finalPosition,
        handleMouseDown,
        recalculate,
        handleMouseUp,
        isDragging: isDraggingRef.current
    };
};