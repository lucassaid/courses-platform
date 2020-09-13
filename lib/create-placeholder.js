const createPlaceholder = (blob, size = 14) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
		const ctx = canvas.getContext('2d');
		const img = new Image();

		img.src = URL.createObjectURL(blob);

		img.onload = function(){
			// si es horizontal, va a tener 14 pixeles de ancho
			const oldWidth = img.width;
			const oldHeight = img.height;

			// calcular el lado mas largo
			const largerSide = Math.max(oldWidth, oldHeight);

			// caluclar porcentaje
			let percentage = (size * 100) / largerSide;
			percentage = percentage.toFixed(2);

			// aplicar porcentaje
			const width = Math.round((oldWidth * percentage) / 100);
			const height = Math.round((oldHeight * percentage) / 100);
			canvas.width = width
			canvas.height = height

			// cargar imagen en el canvas y devolver base 64
			ctx.drawImage(img, 0, 0, width, height);
			return resolve(canvas.toDataURL())
		}
	})
}
export default createPlaceholder