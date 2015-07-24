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

  var htMatrizA = new Handsontable($("#matrizA")[0], {
    data: A,
    minSpareRows: 1,
    minSpareCols: 1,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true
  });

  var htVectorB = new Handsontable($("#vectorB")[0], {
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
  var bb=b.slice(0,-1);
  var res=descomposicionLU(A.slice(0,-1));

  $("#matrizL").html("");
  $("#matrizU").html("");
  $("#vectorP").html("");

  if(!res) return;
  
  var htMatrizL = new Handsontable($("#matrizL")[0], {
    data: res.L,
    minSpareRows: 0,
    minSpareCols: 0,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: false
  });

  var htMatrizU = new Handsontable($("#matrizU")[0], {
    data: res.U,
    minSpareRows: 0,
    minSpareCols: 0,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: false
  });

  var htVectorP = new Handsontable($("#vectorP")[0], {
    data: res.p,
    minSpareRows: 0,
    minSpareCols: 0,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: false
  });
}

function descomposicionLU(A){
  //Descomposicion LU (con pivot) de una matriz cuadrada
  var L, U, n, max, indMax, i, j, k;
  n=A[0].length-1;
  var p = new Array(n);
  var L = new Array(n);
  var U = new Array(n);

  for(i=0;i<n;i++){
    p[i] = i;
    L[i] = new Array(n);
    U[i] = new Array(n);
    for(j=0;j<n;j++){
      L[i][j]=0;
      U[i][j]=A[i][j];
    }
  }

  for(k=0;k<n;k++){
    //Encuentro pivot e intercambio filas de A
    max=Math.abs(U[k][k]);
    indMax=k;
    for(i=k+1;i<n;i++){
      if(Math.abs(U[i][k])>max){
        max=Math.abs(U[i][k]);
        indMax=i;
      }
    }
    if(indMax!=k){
      for(j=k;j<n;j++){
        var temp = U[k][j]; U[k][j] = U[indMax][j]; U[indMax][j] = temp;
      }
      for(j=0;j<k;j++){
        var temp=L[k][j]; L[k][j]=L[indMax][j]; L[indMax][j]=temp;
      }
      var temp=p[k]; p[k]=p[indMax]; p[indMax]=temp;
    }

    L[k][k]=1;
    for(i=k+1;i<n;i++){
      if(U[k][k]==0){
        alert("Error en descomposicion LU");
        return false;
      }
      L[i][k]=U[i][k]/U[k][k];
      for(j=k+1;j<n;j++){
        U[i][j]=U[i][j]-L[i][k]*U[k][j];
      }
    }
  }

  for(i=0;i<n;i++){
    for(j=0;j<i;j++){
      U[i][j]=0;
    }
  }

  var pCol = new Array();
  for(i=0;i<n;i++){
    pCol[i]= new Array(1);
    pCol[i][0]=p[i];
  }

  return {L: L, U: U, p: pCol};
}
