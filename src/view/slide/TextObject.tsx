import {TextObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
	 isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`,
        left: `${textObject.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`
    }
	 if (isSelected) {
		textObjectStyles.border = '3px solid #8a2094'
  }

    return (
        <p  style={textObjectStyles}>{textObject.text} </p>
    )
}

export {
    TextObject,
}
