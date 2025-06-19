import { useBlockProps } from '@wordpress/block-editor';
// import { withSelect } from '@wordpress/data';
import Style from '../Common/Style';
import DraggableBackend from './DraggableBackend';
import Settings from './Settings/Settings';

const Edit = props => {
	const { attributes, setAttributes, clientId, isSelected } = props;
	return <>
		<Settings {...{ attributes, setAttributes }} />

		<div {...useBlockProps({ draggable: false })}
			// onClick={() => selectBlock(clientId)}
		>
			<Style attributes={attributes} id={`block-${clientId}`} />

			<DraggableBackend attributes={attributes} setAttributes={setAttributes} isSelected={isSelected} />
		</div>
	</>;
}

// export default withSelect((dispatch, ownProps) => {
// 	return {
// 		selectBlock: () => {
// 			dispatch('core/block-editor').selectBlock(ownProps.clientId);
// 		}
// 	}
// })(Edit)
export default Edit;
