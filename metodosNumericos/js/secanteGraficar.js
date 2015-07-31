function dibujarSecante(){
  var curva=board.elementsByName["curva"];
  xMin=curva.minX();
  xMax=curva.maxX();

  var p1X=xMin+(xMax-xMin)/4;
  var p1Y=f(p1X);
  var p2X=xMax-(xMax-xMin)/4;
  var p2Y=f(p2X);

  var p1=board.create('point',[p1X,f(p1X)],
    {color: '#0000FF', name: 'p1', withLabel: false});
  var p2=board.create('point',[p2X,f(p2X)],
    {color: '#0000FF', name: 'p2', withLabel: false});
  board.create('line',[p1,p2],
    {strokeColor: '#0000FF', name: 'secante', fixed: true});

  actualizarInputsAprox();
}

function actualizarLineaSecante(){
  var p1=board.elementsByName["p1"];
  var p2=board.elementsByName["p2"];

  var p1X=parseFloat($("#p1X").val());
  var p2X=parseFloat($("#p2X").val());

  //limitesValidos($("#aproxDerivada"),p1X,p2X);
  p1.setPosition(JXG.COORDS_BY_USER,[p1X,f(p1X)]);
  p2.setPosition(JXG.COORDS_BY_USER,[p2X,f(p2X)]);

  board.update();
}

function actualizarInputsAprox(){
  var secante=board.elementsByName["secante"];
  var p1=board.elementsByName["p1"];
  var p2=board.elementsByName["p2"];

  $("#p1X").val(p1.X());
  $("#p2X").val(p2.X());

  //Actualiza input text cuando se arrastran los puntos
  p1.on('drag',function(){
    p1.moveTo([p1.X(),f(p1.X())]);
    $("#p1X").val(p1.X());
  });

  p2.on('drag',function(){
    p2.moveTo([p2.X(),f(p2.X())]);
    $("#p2X").val(p2.X());
  });
}
