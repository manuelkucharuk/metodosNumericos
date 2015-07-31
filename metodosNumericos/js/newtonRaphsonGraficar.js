var fp=null;
function dibujarTangente(){
  fp=function(x){return Parser.parse($("#derivada").val()).evaluate({x: x});}
  var curva=board.elementsByName["curva"];
  var x0X=(curva.maxX()+curva.minX())/2;
  var x0=board.create('point',[x0X,f(x0X)],
    {color:'#0000FF', name: 'x0', withLabel: false});

  var pTangente=board.create('point',
    [
      function(){return x0.X()+1;},
      function(){return fp(x0.X())+f(x0.X());}
    ],
    {fillOpacity: 0, strokeOpacity: 0,
      name: 'pTangente', size:1, withLabel: false});

  var tangente=board.create('line',[x0,pTangente],
    {color:'#0000FF', name: 'tangente', fixed: true});

  actualizarInputx0();
}

function actualizarTangente(){
  var x0Punto=board.elementsByName["x0"];
  var x0Input=parseFloat($("#x0").val());
  x0Punto.setPosition(JXG.COORDS_BY_USER,[x0Input,f(x0Input)]);
  board.update();
}

function actualizarInputx0(){
  var x0Punto=board.elementsByName["x0"];
  $("#x0").val(x0Punto.X());
  //Actualiza input text cuando se arrastra el punto
  x0Punto.on('drag',function(){
    x0Punto.moveTo([x0Punto.X(), f(x0Punto.X())]);
    $("#x0").val(x0Punto.X());
  });
}
