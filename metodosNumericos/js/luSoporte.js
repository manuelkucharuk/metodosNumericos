var A=null;
var bCol=null;
$(document).ready(function(){
  $("#matrizA").height($("#matrizA").width()/3);
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


