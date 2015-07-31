var fp=null;
function actualizarTangente(){
  var x0=board.elementsByName["x0"];
  var pTangente=board.elementsByName["pTangente"];
  var tangente=board.elementsByName["tangente"];
  fp=function(x){return Parser.parse($("#derivada").val()).evaluate({x: x});}

  //Si el campo derivada está vacío borra la tangente
  if($("#derivada").val()==""){
    fp=function(x){return 0;}
    board.removeObject(tangente);
    board.removeObject(x0);
    board.removeObject(pTangente);
    return;
  }

  if(!x0){
    //Actualizo valor de input x0 basado en los limites del grafico
    var curva=board.elementsByName["curva"];
    var x0X=(curva.maxX()+curva.minX())/2;
    $("#x0").val(x0X);

    //Dibujo el punto (x0,f(x0)), que está atado a la función
    x0=board.create('point',[x0X,f(x0X)],{color:'#0000FF', name: 'x0', withLabel: false});
    x0.on('drag',function(){
      x0.moveTo([x0.X(), f(x0.X())]);
      $("#x0").val(x0.X());
    });
  }
  //Actualiza el valor del punto basado en el input
  var x0Input=parseFloat($("#x0").val());
  x0.setPosition(JXG.COORDS_BY_USER,[x0Input,f(x0Input)]);
  board.update();
  
  //Dibujo el punto tangente (transparente)
  if(!pTangente){
    pTangente=board.create('point',
      [
        function(){return x0.X()+1;},
        function(){return fp(x0.X())+f(x0.X());}
      ],
      {fillOpacity: 0, strokeOpacity: 0,
        name: 'pTangente', size:1, withLabel: false});
  }

  //Dibujo la recta tangente
  if(!tangente){
    tangente=board.create('line',[x0,pTangente],
      {color:'#0000FF', name: 'tangente', fixed: true});
  }  
}
