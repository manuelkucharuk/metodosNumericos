function dibujarLineas(){
  var curva=board.elementsByName["curva"];
  xMin=curva.minX();
  xMax=curva.maxX();
  board.create('line',[[xMin+(xMax-xMin)/4,0], [xMin+(xMax-xMin)/4,1]],
    {strokeColor: '#0000FF', name: 'aproxInf'});
  board.create('line',[[xMax-(xMax-xMin)/4,0], [xMax-(xMax-xMin)/4,1]],
    {strokeColor: '#0000FF', name: 'aproxSup'});

  actualizarInputsAprox();
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
  });

  lineaAproxSup.on('drag',function(){
    $("#aproxSup").val(pSup.X());
  });
}
