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


function graficar(){
	funcion=Parser.parse($("#funcion").val());
	var xMin=parseFloat($("#xMin").val(),10);
	var xMax=parseFloat($("#xMax").val(),10);

	if (limitesValidos($("#formLimGraficos"),xMin,xMax)){
		graficarFuncion(xMin,xMax);
		$("#grafico").show();
		$("#formAprox").removeClass('hidden');
    $("#infoExtra").removeClass('hidden');
	}
	else {
		$("#grafico").hide();
		$("#formAprox").addClass('hidden');
    $("#infoExtra").addClass('hidden');

	}
  $("#raiz").text("");
  $("#cantPasos").text("");
  $("#errorMaximo").text("");

	actualizarInputsAprox();
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

function graficarFuncion(xMin,xMax){
	var datX=[];
	var datY=[];
	var step=(xMax-xMin)/200;

	for (var x=xMin;x<=xMax;x+=step){
		datX.push(x);
		datY.push(f(x));
	}

	var xInf=xMin-0.1*(xMax-xMin);
	var xSup=xMax+0.1*(xMax-xMin);

	var yMin=Math.min.apply(Math,datY);
	var yMax=Math.max.apply(Math,datY)
	var yInf=yMin-0.1*(yMax-yMin);
	var ySup=yMax+0.1*(yMax-yMin);

	board=JXG.JSXGraph.initBoard('grafico', {boundingbox:[xInf,ySup,xSup,yInf], keepaspectratio: false, axis:true});
	board.create('curve', [datX,datY],{strokeColor:'red',strokeWidth:2, name:'curva'});

	board.create('line',[[xMin+(xMax-xMin)/4,0], [xMin+(xMax-xMin)/4,1]],
		{strokeColor: '#0000FF', name: 'aproxInf'});
	board.create('line',[[xMax-(xMax-xMin)/4,0], [xMax-(xMax-xMin)/4,1]],
		{strokeColor: '#0000FF', name: 'aproxSup'});
}

function actualizarLineasAprox(tipoAprox){
	var queLinea=$(tipoAprox).attr("id");
	var linea=board.elementsByName[queLinea];

	var aproxInf=parseFloat($("#aproxInf").val());
	var aproxSup=parseFloat($("#aproxSup").val());
	limitesValidos($("#formAprox"),aproxInf,aproxSup);

	linea.point1.setPosition(JXG.COORDS_BY_USER,[parseFloat($(tipoAprox).val()),0]);
	linea.point2.setPosition(JXG.COORDS_BY_USER,[parseFloat($(tipoAprox).val()),1]);
	board.update();
}

function actualizarInputsAprox(){
	lineaAproxInf=board.elementsByName["aproxInf"];
	lineaAproxSup=board.elementsByName["aproxSup"];
	pInf=lineaAproxInf.point1;
	pSup=lineaAproxSup.point1;

	$("#aproxInf").val(pInf.X());
	$("#aproxSup").val(pSup.X());

	//Actualiza input text cuando se arrastran las lineas
	lineaAproxInf.on('drag',function(){
		$("#aproxInf").val(pInf.X());
		if(limitesValidos($("#formAprox"),pInf.X(),pSup.X())){
			$("#buscarRaiz").show();
		}
		else {
			$("#buscarRaiz").hide()
		}
	});

  lineaAproxSup.on('drag',function(){
		$("#aproxSup").val(pSup.X());
		if(limitesValidos($("#formAprox"),pInf.X(),pSup.X())){
			$("#buscarRaiz").show();
		}
		else {
			$("#buscarRaiz").hide()
		};
	});
}

function dibujarPunto(x,y){
  board.removeObject(board.elementsByName["Raiz"])
  board.create('point',[x,y],{name: "Raiz", face:'x', size:2, color: '#0000FF', fixed: true});
}
