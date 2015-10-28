function dibujarArea(){
  var curva = board.elementsByName["curva"];
  var curvaMin = curva.minX();
  var curvaMax = curva.maxX();

  var areaMin = curvaMin+(curvaMax-curvaMin)/4;
  var areaMax = curvaMax-(curvaMax-curvaMin)/4

  //El area se dibuja como una funcion con los puntos de base agregados
  var datX=[];
  var datY=[];
  var step=(curvaMax-curvaMin)/200;

    datX.push(areaMin); datY.push(0);
  for (var x=areaMin;x<=areaMax;x+=step){
    datX.push(x);
    datY.push(f(x));
  }
  var xFinal=x-step;
  datX.push(xFinal); datY.push(0);

  board.create('curve',[datX,datY],
    {strokeOpacity:0,fillColor:'green', fillOpacity: 0.5, name:'area'});

  //Lineas 
  var lAreaInf = board.create('line',[[areaMin,0], [areaMin,1]],
    {strokeColor: '#0000FF', name: 'areaInf'});
  var lAreaSup = board.create('line',[[xFinal,0], [xFinal,1]],
    {strokeColor: '#0000FF', name: 'areaSup'});

  lAreaInf.on("drag",function(){
    
  });
}


function actualizarLimInf(){
  var area = board.elementsByName["area"];
  var xInf = parseFloat($("#limInf").val());
  area.curveRight.moveTo([xInf,f(xInf)]);
  board.update();
}