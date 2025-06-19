import {getBackgroundCSS, getBorderBoxCSS, getBoxCSS, getMultiShadowCSS, isValidCSS} from "../../../../bpl-tools/utils/getCSS"
const Style = ({ attributes, id }) => {
	const { body,badge } = attributes;
	const mainSl = `#${id}`;
	const container = `${mainSl} .drgable-container`;
	const cardSl = `${container} .drgable-card`;
	const badgeSl = `${container} .drgable-badge`;
	const bodySl = `${container} .drgable-main-content`;
	return <style dangerouslySetInnerHTML={{
		__html: `
		${cardSl} {
			${isValidCSS("border-radius", getBoxCSS(body.radius))}
			${isValidCSS("width", body.width)}
			${isValidCSS("height", body.height)}
			${getBorderBoxCSS(body.border)}
			box-shadow:${getMultiShadowCSS(body.shadow)};
		}
		${bodySl}{
			${getBackgroundCSS(body.bg)}
			${isValidCSS("padding", getBoxCSS(body.padding))}
		}
		${badgeSl}{
			${isValidCSS("width",badge.width)}
			${isValidCSS("height", badge.height)}
			${isValidCSS("border-radius", getBoxCSS(badge.radius))}
			${getBorderBoxCSS(badge.border)}
			${getBackgroundCSS(badge.bg)}
			${isValidCSS("padding", getBoxCSS(badge.padding))}
		}
	`}} />;
}
export default Style;