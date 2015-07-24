var A=null;
var bCol=null;
$(document).ready(function(){
  $("#matrizA").height($("#matrizA").width()/2);
  $("#vectorB").height($("#matrizA").height());
  $("#vectorX").height($("#matrizA").height());

  $("#btnInfoAdicional").hide();
  $("#infoAdicional").hide();

  A = [
        [1, 2, 3],
        [1, 1, 1],
        [0, 2, 2]
      ];

  bCol = [[11], [6], [10]];
  var xCol =[["?"],["?"],["?"]]; 

  mostrarMatriz(A,$("#matrizA")[0]);
  mostrarVector(bCol,$("#vectorB")[0]);
  mostrarVector(xCol,$("#vectorX")[0],{readOnly: true});
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function validarMatrizA(){
  var i, j, cols=A[0].length-1, filas=A.length-1;
  if (cols!=filas) return false;

  for(i=0;i<filas;i++){
    for(j=0;j<cols;j++){
      if(!isNumber(A[i][j])) return false;
    }
  }
  return true;
}

function validarVectorB(){
  var i, filasB=bCol.length-1, filasA=A.length-1;
  if (filasB!=filasA) return false;
  for(i=0;i<filasB;i++){
    if(!isNumber(bCol[i][0])) return false;
    }
  return true;  
}

function mostrarMatriz(M,lugar,opt){
  var opciones = {
    data: M,
    minSpareRows: 1,
    minSpareCols: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true,
    className: "htCenter",
  }
  for(var o in opt){ opciones[o]=opt[o]; }
  return (new Handsontable(lugar, opciones));
}

function mostrarVector(v,lugar,opt){
  var opciones={ minSpareCols: 0}
  for(var o in opt){ opciones[o]=opt[o]; }
  return (mostrarMatriz(v,lugar,opciones));
}