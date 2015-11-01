var crearIntegral = function () {
  var curva, area, limites, lineas;
  curva = board.elementsByName["curva"];
  
  limites = crearLimites(curva); 
  lineas = crearLineas(limites);
  area = crearArea(limites);

  //Actualizo los inputs
  $("#limInf").val(limites.min); 
  $("#limSup").val(limites.max);

  //Eventos
  lineas.inf.on("drag",actualizarAreaDesdeLineas);
  lineas.sup.on("drag",actualizarAreaDesdeLineas);

  $("#limInf").on("change",actualizarAreaDesdeInputs);
  $("#limSup").on("change",actualizarAreaDesdeInputs);
  $("#cantIntervalos").on("change",actualizarAreaDesdeInputs);
}

function crearLimites (curva){
  var curvaMin = curva.minX();
  var curvaMax = curva.maxX();

  var areaMin = curvaMin+(curvaMax-curvaMin)/4;
  var areaMax = curvaMax-(curvaMax-curvaMin)/4;

  return {min:areaMin, max:areaMax};
}

function crearLineas (limites){
  var min = limites.min;
  var max = limites.max;

  var lAreaInf = board.create('line',[[min,0], [min,1]],
    {strokeColor: '#0000FF', name: 'lAreaInf'});
  var lAreaSup = board.create('line',[[max,0], [max,1]],
    {strokeColor: '#0000FF', name: 'lAreaSup'});
    
  return {inf: lAreaInf, sup: lAreaSup}
}

function crearArea (limites){ 
  var datos=llenarValores(limites);
 
  return board.create('curve',datos,
    {strokeOpacity:0,fillColor:'green', fillOpacity: 0.5, name:'area', id:"areaID"});  
}

function llenarValores(limites){
  var datX=[];
  var datY=[];
  var min = limites.min;
  var max = limites.max;

  var step = (max-min)/200;
  if(step<Math.pow(10,-6)) step=0.001;

  datX.push(min); datY.push(0);
  for (var x=min;x<max;x+=step){
    datX.push(x);
    datY.push(f(x));
  }
  datX.push(max); datY.push(f(max)); 
  datX.push(max); datY.push(0);

  return [datX, datY];
}


function actualizarAreaDesdeLineas(){
  var lAreaInf = board.elementsByName["lAreaInf"];
  var lAreaSup = board.elementsByName["lAreaSup"];
  var area = board.elementsByName["area"];

  var min = lAreaInf.point1.X();
  var max = lAreaSup.point1.X();


  if (min>max) {
    var temp = lAreaSup
    board.elementsByName.lAreaSup = lAreaInf;
    board.elementsByName.lAreaInf = temp;
  }

  board.suspendUpdate();
  var datos = llenarValores({min: min, max: max});
  area.dataX = datos[0];
  area.dataY = datos[1];
  board.unsuspendUpdate();

  $("#limInf").val(min);
  $("#limSup").val(max);
}

function actualizarAreaDesdeInputs(){
  var lAreaInf = board.elementsByName["lAreaInf"];
  var lAreaSup = board.elementsByName["lAreaSup"];
  var area = board.elementsByName["area"];

  var min = parseFloat($("#limInf").val());
  var max = parseFloat($("#limSup").val());

  if(isNaN(min)) min=0;
  if(isNaN(max)) max=0;


  if (min>max) {
    var temp = min;
    min = max;
    max = temp;
    $("#limInf").val(min);
    $("#limSup").val(max);
  }

  var datos = llenarValores({min: min, max: max});
  area.dataX = datos[0];
  area.dataY = datos[1];

  lAreaInf.point1.moveTo([min,0]);
  lAreaInf.point2.moveTo([min,1]);
  lAreaSup.point1.moveTo([max,0]);
  lAreaSup.point2.moveTo([max,1]);
}
