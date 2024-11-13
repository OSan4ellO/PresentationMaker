function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
 
	  reader.onload = () => {
		 if (typeof reader.result === 'string') {
			resolve(reader.result.split(',')[1]); // Возвращаем только код Base64 без префикса
		 } else {
			reject('Ошибка при чтении файла');
		 }
	  };
 
	  reader.onerror = () => reject('Ошибка при чтении файла');
 
	  reader.readAsDataURL(file); 
	});
 }
 
 export {
	convertFileToBase64
 }