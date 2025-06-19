import { createRoot } from 'react-dom/client';

import './style.scss';
import Draggable from './Components/Frontend/Draggable';
import Style from './Components/Common/Style';

document.addEventListener('DOMContentLoaded', () => {
	const draggableEls = document.querySelectorAll('.wp-block-b-blocks-draggable');
	draggableEls.forEach(draggableEl => {
		const attributes = JSON.parse(draggableEl.dataset.attributes);

		createRoot(draggableEl).render(<>
			<Style attributes={attributes} id={draggableEl.id} />
			<Draggable attributes={attributes} />
		</>);

		draggableEl?.removeAttribute('data-attributes');
	});
});