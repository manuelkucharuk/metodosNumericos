var board=null;
var funcion;

function f(x){
	return funcion.evaluate({x: x});
}

function sgn(x){
  if(x>0){return 1;}
  if(x<0){return -1;}
  if(x==0){return 0;}
}

function dibujarRaiz(x){
  board.removeObject(board.elementsByName["Raiz"])
  board.create('point',[x,0],{name: "Raiz", face:'x', size:2, color: '#0000FF', fixed: true});
}

function limitesValidos(form,min,max){
	if(max<=min){
		form.addClass("has-error");
		return false;
	}
	else {
		form.removeClass("has-error");
		return true;
	}
}

function graficar(){
	funcion=Parser.parse($("#funcion").val());
	var xMin=parseFloat($("#xMin").val(),10);
	var xMax=parseFloat($("#xMax").val(),10);

	if (limitesValidos($("#formLimGraficos"),xMin,xMax)){
		graficarFuncion(xMin,xMax);
		$("#grafico").show();
    $("#infoExtra").removeClass('hidden');
		$("#resultado").hide();
	}
	else {
		$("#grafico").hide();
    $("#infoExtra").addClass('hidden');
		$("#resultado").hide();
	}
}

function graficarFuncion(xMin,xMax){
	var datX=[];
	var datY=[];
	var step=(xMax-xMin)/200;

	for (var x=xMin;x<=xMax;x+=step){
		datX.push(x);
		datY.push(f(x));
	}

	var xInf=xMin-0.05*(xMax-xMin);
	var xSup=xMax+0.05*(xMax-xMin);

	var yMin=Math.min.apply(Math,datY);
	var yMax=Math.max.apply(Math,datY)
	var yInf=yMin-0.05*(yMax-yMin);
	var ySup=yMax+0.05*(yMax-yMin);

	board=JXG.JSXGraph.initBoard('grafico', {boundingbox:[xInf,ySup,xSup,yInf], keepaspectratio: false, axis:true});
	board.create('curve', [datX,datY],{strokeColor:'red',strokeWidth:2, name:'curva'});
}
