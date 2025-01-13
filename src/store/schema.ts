export const editorSchema = {
	type: "object",
	properties: {
	  presentation: {
		 type: "object",
		 properties: {
			title: { type: "string" },
			slides: {
			  type: "array",
			  items: {
				 type: "object",
				 properties: {
					id: { type: "string" },
					objects: {
					  type: "array",
					  items: {
						 oneOf: [
							{
							  type: "object",
							  properties: {
								 id: { type: "string" },
								 type: { type: "string", const: "text" },
								 x: { type: "number" },
								 y: { type: "number" },
								 width: { type: "number" },
								 height: { type: "number" },
								 text: { type: "string" },
								 fontFamily: { type: "string" },
								 fontSize: { type: "number" },
								 fontColor: { type: "string" },
							  },
							  required: ["id", "type", "x", "y", "text", "fontFamily", "fontSize", "fontColor"],
							},
							{
							  type: "object",
							  properties: {
								 id: { type: "string" },
								 type: { type: "string", const: "image" },
								 x: { type: "number" },
								 y: { type: "number" },
								 width: { type: "number" },
								 height: { type: "number" },
								 src: { type: "string" },
							  },
							  required: ["id", "type", "x", "y", "src"],
							},
						 ],
					  },
					},
					background: {
					  type: "object",
					  oneOf: [
						 {
							type: "object",
							properties: {
							  type: { type: "string", const: "solid" },
							  color: { type: "string" },
							},
							required: ["type", "color"],
						 },
						 {
							type: "object",
							properties: {
							  type: { type: "string", const: "image" },
							  src: { type: "string" },
							},
							required: ["type", "src"],
						 },
					  ],
					},
				 },
				 required: ["id", "objects", "background"],
			  },
			},
		 },
		 required: ["title", "slides"],
	  },
	  selection: {
		 type: ["object", "null"], // selection может быть объектом или null
		 properties: {
			selectedSlideId: { type: ["string", "null"] }, // selectedSlideId может быть строкой или null
			selectedObjectId: { type: ["string", "null"] }, // selectedObjectId может быть строкой или null
		 },
		 required: ["selectedSlideId"], // selectedObjectId не обязателен
	  },
	},
	required: ["presentation", "selection"], // presentation и selection обязательны
 };