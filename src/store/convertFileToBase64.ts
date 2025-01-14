// utils/convertFileToBase64.ts
const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		 const reader = new FileReader();
		 reader.onload = () => resolve(reader.result as string);
		 reader.onerror = (error) => reject(error);
		 reader.readAsDataURL(file); // Конвертируем файл в base64
	});
};

export { convertFileToBase64 };