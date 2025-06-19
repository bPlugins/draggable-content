import { useEffect, useRef, useState } from 'react';
const Draggable = ({ attributes }) => {
	const draggableRef = useRef(null);
	const { body, badge, container } = attributes;
	const [offset, setOffset] = useState(container.position || { x: 0, y: 0 });
	const [position, setPosition] = useState({ x: 50, y: 50 });
	const [isDragging, setIsDragging] = useState(false);
	const draggElRef = useRef(null);
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
		setPosition(container.position || { x: 50, y: 50 });
		setOffset(container.position || { x: 0, y: 0 });
	},[container.position])
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
				<div className="drgable-badge" ref={draggElRef} dangerouslySetInnerHTML={{ __html: badge.content }}/>

				{/* Main Content */}
				<div className="drgable-main-content" dangerouslySetInnerHTML={{ __html: body.content }} />

			</div>
		</div>
	</>
}
export default Draggable;