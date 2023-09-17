var matriz=[];

function generarMatriz(){
	let inputtam = document.querySelector('#my-input');
	let slider = document.querySelector('#my-slider');
	const tam=inputtam.value;
	const probabilidad=slider.value;
	
	for(let i=0; i<tam; i++){
		matriz[i]=[];
		for(let j=0; j<tam; j++){
			if(Math.random()*10<probabilidad){
				matriz[i][j]=0;
			}
			else matriz[i][j]=1;
		}
	}
	percolar();
	drawSquare();
}

function hide(opc){
	let ns=document.querySelector('#snackbarS');
	let nf=document.querySelector('#snackbarF');
	if(opc=='snackbarS'){
		ns.className=ns.className.replace("show", "");
	}
	else{
		nf.className=ns.className.replace("show", "");
	}
}

function percolar(){
	function __percolar(posx, posy){
		// Condiciones de salida (Que los valores de "x" e "y" excedan el tama?o de la matriz o que la matriz en la posici?n dada sea != 0)
		if (posx < 0 || posy < 0 || posx >= matriz.length || posy >= matriz[0].length || matriz[posx][posy] != 0)
			return;

		// Asignamos un valor 2 en la posici?n "x" e "y" de la matriz que sera representado como agua
		matriz[posx][posy] = 2;

		// Pasamos a las posiciones adyacentes
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

	if(flag){
		let ns=document.querySelector('#snackbarS');
		ns.className="show snackbar notification is-success";
		setTimeout(function(){ ns.className = ns.className.replace("show", ""); }, 3000);
	}
	else{
		let nf=document.querySelector('#snackbarF');
		nf.className="show snackbar notification is-danger";
		setTimeout(function(){ nf.className = nf.className.replace("show", ""); }, 3000);
	}
	return flag;
}

function activateButton(){
	let inputtam = document.querySelector('#my-input');
	let button=document.querySelector('#btn');
	
	const tam=inputtam.value;
	button.disabled = tam === '';
}

function drawSquare() {
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
			else if(matriz[i][j]==2){
				context.fillStyle="aqua";
				context.rect(i*side, j*side, side, side);
				context.fillRect(i*side+1, j*side+1, side-1, side-1);
			}
			context.stroke();
		}
	}
}
