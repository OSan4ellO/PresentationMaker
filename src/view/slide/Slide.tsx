import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { setSelection } from "../../store/setSelection.ts";
import { dispatch } from "../../store/editor.ts";
import { editor } from "../../store/data.ts";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
	 selectedObjectId: string | null,
}

function Slide({ slide, scale = 1, isSelected, className, selectedObjectId }: SlideProps) {
	function onObjectClick(objectId: string) {
		dispatch(setSelection, {
			 selectedSlideId: slide?.id,
			 selectedObjectId: objectId,	 
		})
  }
	if (!slide) {
		 return null; 
	}

	const slideStyles: CSSProperties = {
		backgroundColor: slide.background.type === 'solid' ? slide.background.color : 'transparent',
		backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none',
		backgroundSize: 'cover',
		position: 'relative',
		width: `${SLIDE_WIDTH * scale}px`,
		height: `${SLIDE_HEIGHT * scale}px`,
	}

  

	if (isSelected) {
		 slideStyles.border = '3px solid #8A2094';
	}

	return (
		<div style={slideStyles} className={styles.slide + ' ' + className}>
			 {slide.objects?.map(slideObject => {
				  switch (slideObject.type) {
						case "text":
							 return <div key={slideObject.id} onClick={() => onObjectClick(slideObject.id)}>
							 				<TextObject textObject={slideObject} scale={scale} isSelected={slideObject.id == selectedObjectId}></TextObject>
									  </div>
						case "image":
							 return <div key={slideObject.id} onClick={() => onObjectClick(slideObject.id)}>
							 				<ImageObject imageObject={slideObject} scale={scale} isSelected={slideObject.id == selectedObjectId}></ImageObject>
									  </div>
						default:
							 throw new Error(`Unknown slide type: ${slideObject.type}`);
				  }
			 })}
		</div>
  );
  
}


export {
    Slide
}
