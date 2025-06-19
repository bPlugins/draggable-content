import { useEffect, useRef, useState } from 'react';
const DraggableBackend = ({ attributes, setAttributes }) => {
    const draggableRef = useRef(null);
    const { body, badge, container } = attributes;
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState(container.position || { x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const draggElRef = useRef(null);
    const editorContainerRef = useRef(null);
    // useEffect(() => {
    // 	const wrapperEl = draggableRef.current;
    // 	const el = draggElRef.current;
    // 	if (!el) return;
    // 	const handleMouseDown = (e) => {
    // 		setIsDragging(true);
    // 		setOffset({
    // 			x: e.clientX - position.x,
    // 			y: e.clientY - position.y,
    // 		});
    // 	};
    // 	const handleMouseMove = (e) => {
    // 		if (isDragging) {
    // 			setPosition({
    // 				x: e.clientX - offset.x,
    // 				y: e.clientY - offset.y,
    // 			});
    // 		}
    // 	};

    // 	const handleMouseUp = () => {
    // 		setIsDragging(false);
    // 	};
    // 	const handleGlobalMouseUp = () => {
    // 		setIsDragging(false);
    // 	};

    // 	if (wrapperEl) {
    // 		wrapperEl.addEventListener("mouseup", handleMouseUp);
    // 		wrapperEl.addEventListener("mousemove", handleMouseMove);
    // 	} else {
    // 		document.addEventListener("mousemove", handleMouseMove);
    // 		document.addEventListener("mouseup", handleMouseUp);
    // 	}
    // 	wrapperEl.addEventListener("mousemove", handleMouseMove);
    // 	// if (el) {
    // 	el.addEventListener("mousedown", handleMouseDown);
    // 	// }

    // 	document.addEventListener("mouseup", handleGlobalMouseUp);

    // 	return () => {
    // 		// if (el) {
    // 		el.removeEventListener("mousedown", handleMouseDown);
    // 		// }
    // 		if (wrapperEl) {
    // 			wrapperEl.removeEventListener("mousemove", handleMouseMove);
    // 			wrapperEl.removeEventListener("mouseup", handleMouseUp);
    // 		} else {
    // 			document.removeEventListener("mousemove", handleMouseMove);
    // 			document.removeEventListener("mouseup", handleMouseUp);
    // 		}
    // 		document.removeEventListener("mouseup", handleGlobalMouseUp);
    // 	};
    // }, [
    // 	isDragging,
    // ]);

    useEffect(() => {
        // editorContainerRef.current = document.querySelector('.edit-post-visual-editor');
        setPosition(container.position || { x: 50, y: 50 });
        // setOffset(container.position || { x: 0, y: 0 });
    }, [container.position])
    useEffect(() => {
        const wrapperEl = draggableRef.current;
        const el = draggElRef.current;
        if (!el) return;

        const handleMouseDown = (e) => {
            e.preventDefault();
            setIsDragging(true);
            const rect = wrapperEl.getBoundingClientRect();
            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        // const handleMouseMove = (e) => {
        // 	if (!isDragging) return;
        // 	e.preventDefault();

        // 	const newX = e.clientX - offset.x;
        // 	const newY = e.clientY - offset.y;

        // 	// Prevent dragging outside viewport
        // 	const maxX = window.innerWidth - wrapperEl.offsetWidth;
        // 	const maxY = window.innerHeight - wrapperEl.offsetHeight;

        // 	setPosition({
        // 		x: Math.min(Math.max(0, newX), maxX),
        // 		y: Math.min(Math.max(0, newY), maxY)
        // 	});
        // };
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;

            // Convert to percentage
            const percentX = (newX / window.innerWidth) * 100;
            const percentY = (newY / window.innerHeight) * 100;

            // Prevent dragging outside viewport (in percentage)
            const maxPercentX = 100 - (wrapperEl.offsetWidth / window.innerWidth) * 100;
            const maxPercentY = 100 - (wrapperEl.offsetHeight / window.innerHeight) * 100;

            setPosition({
                x: Math.min(Math.max(0, percentX), maxPercentX),
                y: Math.min(Math.max(0, percentY), maxPercentY)
            });
            setAttributes({ container: { ...container, position: { x: Math.min(Math.max(0, percentX), maxPercentX), y: Math.min(Math.max(0, percentY), maxPercentY) } } })
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };

        // Add event listeners
        el.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            el.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, offset]);
    return <>
        <div ref={draggableRef} className="drgable-container" style={{ top: position.y + "%", left: position.x + "%", transition: isDragging ? 'none' : 'all 0.3s ease', position: 'fixed' }}>

            <div className="drgable-card">

                {/* Black Friday Label */}
                <div className="drgable-badge" ref={draggElRef} dangerouslySetInnerHTML={{ __html: badge.content }} />

                {/* Main Content */}
                <div className="drgable-main-content" dangerouslySetInnerHTML={{ __html: body.content }} />

            </div>
        </div>
    </>
}
export default DraggableBackend;


// import { useEffect, useRef, useState, useCallback } from 'react';

// const DraggableBackend = ({ attributes, setAttributes, isSelected }) => {
//     const { body, badge, container } = attributes;
//     const draggableRef = useRef(null);
//     const dragHandleRef = useRef(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [position, setPosition] = useState({
//         top: container.position?.top || 50,
//         right: container.position?.right || 'auto',
//         bottom: container.position?.bottom || 'auto',
//         left: container.position?.left || 50
//     });
//     const [offset, setOffset] = useState({ x: 0, y: 0 });
//     const editorViewportRef = useRef(null);

//     // Get the appropriate viewport (editor or frontend)
//     const getViewport = useCallback(() => {
//         // In editor
//         if (typeof wp !== 'undefined' && wp.domReady) {
//             return document.querySelector('.edit-post-visual-editor__content-area') ||
//                 document.querySelector('.edit-post-visual-editor') ||
//                 document.querySelector('.editor-styles-wrapper');
//         }
//         // On frontend
//         return document.body;
//     }, []);
//     // Convert between editor and frontend positions
//     const convertPosition = useCallback((pos, fromEditor = true) => {
//         const editorViewport = document.querySelector('.edit-post-visual-editor__content-area');
//         const frontendViewport = document.body;

//         if (!editorViewport || !frontendViewport) return pos;

//         if (fromEditor) {
//             // Convert from editor % to frontend %
//             const editorWidth = editorViewport.clientWidth;
//             const editorHeight = editorViewport.clientHeight;
//             const frontendWidth = frontendViewport.clientWidth;
//             const frontendHeight = frontendViewport.clientHeight;

//             return {
//                 top: (pos.top * editorHeight) / frontendHeight,
//                 left: (pos.left * editorWidth) / frontendWidth,
//                 right: pos.right === 'auto' ? 'auto' : (pos.right * editorWidth) / frontendWidth,
//                 bottom: pos.bottom === 'auto' ? 'auto' : (pos.bottom * editorHeight) / frontendHeight
//             };
//         } else {
//             // Convert from frontend % to editor %
//             const editorWidth = editorViewport.clientWidth;
//             const editorHeight = editorViewport.clientHeight;
//             const frontendWidth = frontendViewport.clientWidth;
//             const frontendHeight = frontendViewport.clientHeight;

//             return {
//                 top: (pos.top * frontendHeight) / editorHeight,
//                 left: (pos.left * frontendWidth) / editorWidth,
//                 right: pos.right === 'auto' ? 'auto' : (pos.right * frontendWidth) / editorWidth,
//                 bottom: pos.bottom === 'auto' ? 'auto' : (pos.bottom * frontendHeight) / editorHeight
//             };
//         }
//     }, []);

//     // Update position when container position changes
//     useEffect(() => {
//         if (container.position) {
//             const convertedPosition = convertPosition(container.position, false);
//             setPosition(convertedPosition);
//         }
//     }, [container.position, convertPosition]);

//     // Handle drag events
//     useEffect(() => {
//         const handle = dragHandleRef.current;
//         const draggable = draggableRef.current;
//         if (!handle || !draggable) return;

//         const viewport = getViewport();
//         editorViewportRef.current = viewport;

//         const handleMouseDown = (e) => {
//             if (!isSelected) return;
//             e.preventDefault();
//             setIsDragging(true);

//             const rect = draggable.getBoundingClientRect();
//             const viewportRect = viewport.getBoundingClientRect();

//             setOffset({
//                 x: e.clientX - rect.left + viewport.scrollLeft,
//                 y: e.clientY - rect.top + viewport.scrollTop
//             });
//         };

//         const handleMouseMove = (e) => {
//             console.log(isDragging,": :",isSelected );
//             if (!isDragging || !isSelected) return;
//             e.preventDefault();
            
//             const viewport = editorViewportRef.current;
//             if (!viewport) return;

//             const viewportRect = viewport.getBoundingClientRect();
//             const viewportWidth = viewportRect.width;
//             const viewportHeight = viewportRect.height;

//             // Calculate new position in pixels
//             const newLeft = e.clientX - viewportRect.left - offset.x;
//             const newTop = e.clientY - viewportRect.top - offset.y;

//             // Convert to percentage of viewport
//             const percentLeft = (newLeft / viewportWidth) * 100;
//             const percentTop = (newTop / viewportHeight) * 100;

//             // Calculate boundaries
//             const draggableRect = draggable.getBoundingClientRect();
//             const maxLeft = 100 - (draggableRect.width / viewportWidth) * 100;
//             const maxTop = 100 - (draggableRect.height / viewportHeight) * 100;

//             const clampedLeft = Math.min(Math.max(0, percentLeft), maxLeft);
//             const clampedTop = Math.min(Math.max(0, percentTop), maxTop);

//             const newPosition = {
//                 top: clampedTop,
//                 left: clampedLeft,
//                 right: 'auto',
//                 bottom: 'auto'
//             };

//             setPosition(newPosition);

//             // Convert position to frontend coordinates before saving
//             const frontendPosition = convertPosition(newPosition, true);
//             setAttributes({
//                 container: {
//                     ...container,
//                     position: frontendPosition
//                 }
//             });
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//         };

//         // Add event listeners
//         handle.addEventListener('mousedown', handleMouseDown);
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);

//         return () => {
//             handle.removeEventListener('mousedown', handleMouseDown);
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDragging, offset, container, setAttributes, isSelected, convertPosition, getViewport]);

//     return (
//         <div
//             ref={draggableRef}
//             className="drgable-container"
//             style={{
//                 position: 'absolute',
//                 top: `${position.top}%`,
//                 left: `${position.left}%`,
//                 right: position.right !== 'auto' ? `${position.right}%` : 'auto',
//                 bottom: position.bottom !== 'auto' ? `${position.bottom}%` : 'auto',
//                 transition: isDragging ? 'none' : 'all 0.3s ease',
//                 cursor: isSelected ? 'move' : 'default',
//                 // zIndex: isSelected ? 9999 : 'auto'
//             }}
//         >
//             <div className="drgable-card">
//                 <div
//                     ref={dragHandleRef}
//                     className="drgable-badge"
//                     dangerouslySetInnerHTML={{ __html: badge.content }}
//                     style={{ cursor: isSelected ? 'move' : 'default' }}
//                 />
//                 <div
//                     className="drgable-main-content"
//                     dangerouslySetInnerHTML={{ __html: body.content }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default DraggableBackend;