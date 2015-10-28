var crearArea = function () {
  var curva = board.elementsByName["curva"];
  var area = board.elementsByName["area"];
  var lAreaInf = board.elementsByName["lAreaInf"];
  var lAreaSup = board.elementsByName["lAreaSup"];

  if(!area){
    //Primera vez
    var limites = definirLimites(); 
    $("#limInf").val(limites.min); 
    $("#limSup").val(limites.max);
  }  
  
  else {
    var min = Math.min(parseFloat($("#limInf").val()), parseFloat($("#limSup").val()));
    var max = Math.max(parseFloat($("#limInf").val()), parseFloat($("#limSup").val()));
    if(isNaN(min)) min=0;
    if(isNaN(max)) max=0;
    limites = {min: min, max: max}
  }

  dibujarArea(limites.min,limites.max);

  //Funciones
  function definirLimites (){
    var curvaMin = curva.minX();
    var curvaMax = curva.maxX();

    var areaMin = curvaMin+(curvaMax-curvaMin)/4;
    var areaMax = curvaMax-(curvaMax-curvaMin)/4;

    return {min:areaMin, max:areaMax};
  }

  function dibujarArea (min,max){
    //Lineas 
    if (!lAreaInf || !lAreaSup){
      lAreaInf = board.create('line',[[min,0], [min,1]],
        {strokeColor: '#0000FF', name: 'lAreaInf'});
      lAreaSup = board.create('line',[[max,0], [max,1]],
        {strokeColor: '#0000FF', name: 'lAreaSup'});
    }

    else{
      lAreaInf.point1.moveTo([min,0]);
      lAreaInf.point2.moveTo([min,1]);
      lAreaSup.point1.moveTo([max,0]);
      lAreaSup.point2.moveTo([max,1]);
    }

    actualizarArea(min,max);

    //Eventos  
    lAreaInf.on("drag",actualizarArea);
    lAreaSup.on("drag",actualizarArea);

    //Funciones
    function actualizarArea(min,max){
      console.log(min);
      if(typeof min != 'float'){ //Viene de drag
        min = lAreaInf.point1.X();
        max = lAreaSup.point1.X();
      }

      if (min>max){
        var temp = lAreaInf;
        lAreaInf = lAreaSup;
        lAreaSup = temp;
      }
      
      pintarArea(min,max);


      $("#limInf").val(min);
      $("#limSup").val(max);
    }
  }

  function pintarArea (min,max){ 
    //El area se pinta como una funcion con los puntos de base agregados
    var datX=[];
    var datY=[];
    var step=(max-min)/200;
    if(step<Math.pow(10,-8)) return;

    datX.push(min); datY.push(0);
    for (var x=min;x<max;x+=step){
      datX.push(x);
      datY.push(f(x));
    }
    datX.push(max); datY.push(f(max)); 
    datX.push(max); datY.push(0);


    if(area){
      console.log("Esconder area");
      area.setAttribute({visible: false});
    }

    area = board.create('curve',[datX,datY],
        {strokeOpacity:0,fillColor:'green', fillOpacity: 0.1, name:'area', id:"areaID"});
    board.update();      
  }

  
}


