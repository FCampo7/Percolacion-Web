/**
 * Matriz que representa el sistema a percolar.
 * @type {number[][]}
 */
var matriz=[];


/**
 * Activa el botón de generar según la entrada del usuario.
 */
function activateButton(){
	let inputtam = document.querySelector('#my-input');
	let button=document.querySelector('#btnGenerarMatriz');
	
	const tam=inputtam.value;

	button.disabled = tam === '';
}


/**
 * Genera una matriz con un tamaño y una probabilidad especificada para la percolación.
 */
function generarMatriz(){
	const buttonPercolar=document.querySelector('#btnPercolar');
	let inputtam = document.querySelector('#my-input');
	let slider = document.querySelector('#my-slider');

	const tam=inputtam.value;
	const probabilidad=slider.value;
	
	// Crea la matriz a percolar
	for(let i=0; i<tam; i++){
		matriz[i]=[];
		for(let j=0; j<tam; j++){
			if(Math.random()*10<probabilidad){
				matriz[i][j]=0;
			}
			else matriz[i][j]=1;
		}
	}
	drawMatrix();
	buttonPercolar.disabled = false;
}


/**
 * Crea y muestra un Snackbar con el resultado de la percolación.
 * @param {boolean} flag - Indica si hay percolación o no.
 */
function createSnackbars(flag) {
	let snackBar=document.createElement('div');
	let buttonDelete=document.createElement('button');
	buttonDelete.className="delete";
	buttonDelete.onclick=function(){
		snackBar.className=snackBar.className.replace("snackbar","");
		document.body.removeChild(snackBar); 
		snackBar.removeChild(buttonDelete);
	};
	snackBar.appendChild(buttonDelete);
	
	if(flag){
		snackBar.className="snackbar notification is-success";
		snackBar.appendChild(document.createTextNode("Hay percolación"));
	}
	else{
		snackBar.className="snackbar notification is-danger";
		snackBar.appendChild(document.createTextNode("No hay percolación"));
	}

	// Añade el snackbar al body
	document.body.appendChild(snackBar);

	// Remueve el snackbar después de 3 segundos
	setTimeout(
		function(){
			snackBar.className=snackBar.className.replace("snackbar","");
			document.body.removeChild(snackBar); 
			snackBar.removeChild(buttonDelete);
		}, 3000
	);
}


/**
 * Realiza la percolación en la matriz y muestra el resultado en un Snackbar.
 */
function percolar(){

	// Desactiva el botón Percolar
	const buttonPercolar=document.querySelector('#btnPercolar');
	buttonPercolar.disabled = true;
	
	/**
	 * Realiza el algoritmo de percolación en la matriz, iniciando desde la posición dada.
	 * @param {number} posx - Posición en el eje x.
	 * @param {number} posy - Posición en el eje y.
	 */
	function __percolar(posx, posy){
		// Condiciones de salida (Que los valores de "x" e "y" excedan el tamaóo de la matriz o que la matriz en la posición dada sea != 0)
		if (posx < 0 || posy < 0 || posx >= matriz.length || posy >= matriz[0].length || matriz[posx][posy] != 0)
			return;
	
		// Asigna un valor 2 en la posición "x" e "y" de la matriz que sera representado como agua
		matriz[posx][posy] = 2;
		
		// Dibuja el cuadrado en la posición "x" e "y"
		// No interviene en el algoritmo de percolación
		drawSquareAqua(posx, posy);
		
		// Pasa a las posiciones adyacentes
		__percolar(posx, posy + 1);
		__percolar(posx + 1, posy);
		__percolar(posx - 1, posy);
		__percolar(posx, posy - 1);
	}
	
	for(let i=0; i<matriz.length; i++){
		if (matriz[i][0] == 0){
			__percolar(i, 0);
		}
	}
	
	var flag=false;
	
	for(let i=0; i<matriz.length; i++){
		if (matriz[i][matriz.length - 1] == 2){
			flag=true;
		}
	}

	createSnackbars(flag);

}


/**
 * Dibuja la matriz en un canvas.
 */
function drawMatrix() {
	let canvas = document.querySelector('#my-canvas');
	let context = canvas.getContext('2d');
	let inputtam = document.querySelector('#my-input');

	const tam=inputtam.value;

	const side=Math.min(canvas.height,canvas.width)/tam;
	
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.beginPath();
	for(let i=0; i<tam; i++){
		for(let j=0; j<tam; j++){
			if(matriz[i][j]==1){
				context.fillStyle="black";
				context.rect(i*side, j*side, side, side);
				context.fillRect(i*side+1, j*side+1, side-1, side-1);
			}
			else if(matriz[i][j]==0){
				context.fillStyle="white";
				context.rect(i*side, j*side, side, side);
				context.fillRect(i*side+1, j*side+1, side-1, side-1);
			}
			context.stroke();
		}
	}
}


/**
 * Dibuja un cuadrado azul en una posición dada.
 * @param {number} posx - Posición en el eje x.
 * @param {number} posy - Posición en el eje y.
 */
function drawSquareAqua(posx, posy){
	let canvas = document.querySelector('#my-canvas');
	let context = canvas.getContext('2d');
	let inputtam = document.querySelector('#my-input');

	const tam=inputtam.value;

	const side=Math.min(canvas.height,canvas.width)/tam;

	context.beginPath();
	
	context.fillStyle="aqua";
	context.rect(posx*side, posy*side, side, side);
	context.fillRect(posx*side+1, posy*side+1, side-1, side-1);
	
	context.stroke();
}