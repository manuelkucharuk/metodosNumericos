function dibujarx0(){
  var curva=board.elementsByName["curva"];
  xMin=curva.minX();
  xMax=curva.maxX();
  board.create('point',[(xMax+xMin)/2, 0,],
    {fillcolor:'#0000FF', strokeColor: '#0000FF', name: 'x0'});
  actualizarInputx0();
}

function actualizarx0(){
  var x0Punto=board.elementsByName["x0"];
  var x0Input=parseFloat($("#x0").val());
  x0Punto.setPosition(JXG.COORDS_BY_USER,[x0Input,0]);
  board.update();
}

function actualizarInputx0(){
  var x0Punto=board.elementsByName["x0"];
  $("#x0").val(x0Punto.X());
  //Actualiza input text cuando se arrastra el punto
  x0Punto.on('drag',function(){
    x0Punto.moveTo([x0Punto.X(), 0]);
    $("#x0").val(x0Punto.X());
  });
}
