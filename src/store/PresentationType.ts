type PresentationType = {
    title: string,
    slides: Array<SlideType>,
}

type SlideType = {
    id: string,
    objects: Array<SlideObject>,
    background: Background,
}

type SlideObject = TextObjectType | ImageObjectType

type Background = SolidBackground | ImageBackground;

type SolidBackground = {
	type: 'solid',
	color: string;
}

type ImageBackground = {
	type: 'image',
	src: string;
}

type BaseSlideObject = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
}

type TextObjectType = BaseSlideObject & {
    type: 'text',
    text: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string,
}

type ImageObjectType = BaseSlideObject & {
    type: 'image',
    src: string,
}

export type {
    PresentationType,
    SlideType,
    TextObjectType,
    ImageObjectType,
}
