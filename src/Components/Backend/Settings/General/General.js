import { PanelBody } from "@wordpress/components";
import { TinyEditor } from "../../../../../../bpl-tools/Components";
import { __ } from "@wordpress/i18n";

const General = (props) => {
	const {attributes,setAttributes } = props;
	const { body, badge } = attributes;
	return <>
		<PanelBody className="bPlPanelBody" title={__("Badge", "b-blocks")} initialOpen={true}>
			<TinyEditor value={badge.content} onChange={value => setAttributes({ badge: { ...badge, content: value } })} />
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Body","b-blocks")} initialOpen={false}>
			<TinyEditor value={body.content} onChange={value=>setAttributes({body:{...body,content:value}})} />
		</PanelBody>
	</>
}
export default General;