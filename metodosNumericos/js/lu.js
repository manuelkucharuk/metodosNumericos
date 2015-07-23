var A=null;
var b=null;
$(document).ready(function(){
  $("#matrizA").height($("#matrizA").width()/2);
  $("#vectorB").height($("#matrizA").height());
  $("#resultado").hide();

  A = [
        [1, 2, 3],
        [1, 1, 1],
        [0, 2, 2]
      ];

  b = [[11], [6], [10]];    
  
  var contA = document.getElementById('matrizA');
  var htMatrizA = new Handsontable(contA, {
    data: A,
    minSpareRows: 1,
    minSpareCols: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true
  });
  
  var contB = document.getElementById("vectorB");
  var htVectorB = new Handsontable(contB, {
    data: b,
    maxCols: 1,
    minSpareRows: 1,
    minSpareCols: 0,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true  
  });
});

function resolver(){
  var AA=A.slice(0);
  var bb=b.slice(0);
  alert(AA);
}