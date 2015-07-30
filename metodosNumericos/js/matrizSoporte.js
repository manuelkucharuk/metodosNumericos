function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function redondearMatriz(M){
  var n,m;
  var n=M.length;
  var mat=new Array(n);
  for(var i=0;i<n;i++){
    m=M[i].length;
    mat[i]=new Array(m);
    for(var j=0;j<m;j++){
      mat[i][j]=parseFloat(parseFloat(M[i][j]).toFixed(3));
    }
  }
  return mat;
}

function validarMatriz(A){
  var i, j, cols=A[0].length-1, filas=A.length-1;
  if (cols!=filas) return false;

  for(i=0;i<filas;i++){
    for(j=0;j<cols;j++){
      if(!isNumber(A[i][j])) return false;
    }
  }
  return true;
}

function validarVector(A,bCol){
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
