import { changeBackgroundImage } from "./changeBackgroundImage";
import { dispatch } from "./editor";

const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		 const reader = new FileReader();
		 reader.onload = () => resolve(reader.result as string);
		 reader.onerror = (error) => reject(error);
		 reader.readAsDataURL(file);
	});
};

async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
	if (event.target.files && event.target.files[0]) {
		 const file = event.target.files[0];
		 try {
			  const base64Image = await convertFileToBase64(file);
			  dispatch(changeBackgroundImage, base64Image);  
		 } catch (error) {
			  console.error("Error converting file:", error);
		 }
	}
}
 
 export {
	handleFileUpload
 }