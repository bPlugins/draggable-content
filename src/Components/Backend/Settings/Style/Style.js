import { PanelBody, __experimentalUnitControl as UnitControl, __experimentalBorderBoxControl as BorderBoxControl, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Background, BoxControl, ShadowControl, Label } from "../../../../../../bpl-tools/Components";

const Style = props => {
    const { attributes, setAttributes } = props;
    const { badge, body, container } = attributes;
    return <>
        <PanelBody className="bPlPanelBody" title={__("Container", "b-blocks")} initialOpen={true}>
            
            <UnitControl label={__("Width", 'b-blocks')} labelPosition="edge" value={body.width} onChange={value => setAttributes({ body: { ...body, width: value } })} />
            
            <UnitControl className="mt10" label={__("Height", 'b-blocks')} labelPosition="edge" value={body.height} onChange={value => setAttributes({ body: { ...body, height: value } })} />
            
            <Background label={__("Background", "b-blocks")} value={body.bg} onChange={value => setAttributes({ body: { ...body, bg: value } })} />
            
            <BoxControl label={__("Padding", "b-blocks")} values={body.padding} onChange={value => setAttributes({ body: { ...body, padding: value } })} />
            
            <BorderBoxControl label={__("Border", "b-blocks")} value={body.border} onChange={value => setAttributes({ body: { ...body, border: value } })} />
            
            <BoxControl className="mt10" label={__("Border Radius", "b-blocks")} values={body.radius} onChange={value => setAttributes({ body: { ...body, radius: value } })} />

            <ShadowControl label={__("Shadow", "b-blocks")} value={body.shadow} onChange={value => setAttributes({ body: { ...body, shadow: value } })} /> 
            
            <Label className="mt10">{__("Initial Position", "b-blocks")}</Label>
            <RangeControl className="mt3" label={__("Position X:")} value={container.position.x} min={0} max={100} onChange={value => setAttributes({ container: { ...container, position: { ...container.position, x: value } } })} />
            
            <RangeControl label={__("Position Y:")} value={container.position.y} min={0} max={100} onChange={value => setAttributes({ container: { ...container, position: { ...container.position, y: value } } })} />

        </PanelBody>

        <PanelBody className="bPlPanelBody" title={__("Badge", "b-blocks")} initialOpen={false}>
            
            <UnitControl label={__("Width", 'b-blocks')} labelPosition="edge" value={badge.width} onChange={value => setAttributes({ badge: { ...badge, width: value } })} />
            
            <UnitControl className="mt10" label={__("Height", 'b-blocks')} labelPosition="edge" value={badge.height} onChange={value => setAttributes({ badge: { ...badge, height: value } })} />
            
            <Background label={__("Background", "b-blocks")} value={badge.bg} onChange={value => setAttributes({ badge: { ...badge, bg: value } })} />

            <BoxControl label={__("Padding", "b-blocks")} values={badge.padding} onChange={value => setAttributes({ badge: { ...badge, padding: value } })} />
            
            <BorderBoxControl label={__("Border", "b-blocks")} value={badge.border} onChange={value => setAttributes({ badge: { ...badge, border: value } })} />
            
            <BoxControl className="mt10" label={__("Border Radius", "b-blocks")} values={badge.radius} onChange={value => setAttributes({ badge: { ...badge, radius: value } })} />
            
            {/* <ShadowControl label={__("Shadow", "b-blocks")} value={badge.shadow} onChange={value => setAttributes({ badge: { ...badge, shadow: value } })} /> */}
        </PanelBody>


    </>
}
export default Style;