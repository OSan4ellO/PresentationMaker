import { SlideType } from "../../store/PresentationType.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "./SlidesList.module.css";
import { SelectionType } from "../../store/EditorType.ts";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { useState } from "react";
import { interchange } from "../../store/interchange.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListPros = {
  slides: Array<SlideType>;
  selection: SelectionType | null;
};

function SlidesList({slides, selection }: SlidesListPros) {

    
	const [draggedSlideId, setdraggedSlide] = useState<string | null>(null);

	const handleDragStart = (_e: React.DragEvent, slideId: string) => {
		 setdraggedSlide(slideId);
	} 

	const handeDrop = (e: React.DragEvent, targetSlideId: string) => {
		 e.preventDefault();
		
		 if(draggedSlideId && draggedSlideId !== targetSlideId){
			  dispatch(interchange, {draggedSlideId,targetSlideId});
			  setdraggedSlide(null);
		 }
	}
	const handleDragOver = (e: React.DragEvent) => {
		 e.preventDefault();
	}
	function onSlideClick(slideId: string) {
		 dispatch(setSelection, {selectedSlideId: slideId})
	}
	
	return (
		 <div className={styles.slideList}>
			  {slides.map(slide =>
						 <div 
							  key={slide.id}
							  onClick={() => onSlideClick(slide.id)}
							  draggable
							  onDragStart={(e) => handleDragStart(e, slide.id)}
							  onDrop={(e) => handeDrop(e, slide.id)}
							  onDragOver={(e) => handleDragOver(e)}
						 >
							  <Slide
									slide={slide}
									scale={SLIDE_PREVIEW_SCALE}
									isSelected={selection ? slide.id === selection.selectedSlideId : false}
									className={styles.item} selectedObjectId={null}>
							  </Slide>
						 </div>
			  )}
		 </div>
	)
}

export { SlidesList };
