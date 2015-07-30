function resolver(){
  $("#infoAdicional").hide();
  $("#btnInfoAdicional").hide();
  $("#vectorX").html("");

  //Comprobación de errores
  if(!validarMatriz(A) || !validarVector(A,bCol) || !validarVector(A,x0Col)){
    alert("Verificar entrada.\n"+
    "La matriz A debe ser cuadrada.\n"+
    "Los vectores b y x0 deben tener tantas filas como la matriz A");
    return;
  }

  if(!esDiagonalDominante(A)){
    alert("La matriz no es diagonal dominante");
    return;
  }

  //De tabla en columnas a array de una dimensión
  var n=A.length-1;
  var b=new Array(n);
  for(var i=0;i<n;i++){b[i]=bCol[i][0];}
  var x0=new Array(n);
  for(var i=0;i<n;i++){x0[i]=x0Col[i][0];}

  //Resuelvo
  res=gaussSeidel(A,b,x0,1e-4,300); // V. global
  if(!res) {return;}
  var x=res.x;
  

  //De array de una dimensión a tabla en columnas
  var xCol=new Array(n);
  for(var i=0;i<n;i++){ xCol[i]=new Array(1); xCol[i][0] = x[i]; }
  //Muestro el resultado y el otro botón
  mostrarVector(redondearMatriz(xCol),$("#vectorX")[0],{readOnly: true})
  $("#btnInfoAdicional").show(); 
}

function mostrarInfoAdicional(){
  var error=res.error;
  var cantPasos=res.cantPasos;
  $("#error").text(res.error.toExponential(5));
  $("#cantPasos").text(res.cantPasos);
  $("#infoAdicional").show();
}

function esDiagonalDominante(A){
  var n=A.length-1;
  for(var i=0;i<n;i++){
    if(Math.abs(2*A[i][i])<=sumAbs(A[i])){return false;}
  }
  return true;
}

function sumAbs(A){
  var n=A.length;
  s=0;
  for(var i=0;i<n;i++){s+=Math.abs(A[i]);}
  return s;
}

function norma(v){
  var n=v.length;
  var norm=0;
  for(var i=0;i<n;i++){norm+=Math.pow(v[i],2);}
  return Math.sqrt(norm);
}
  
function normaDif(v1,v2){
  var n=v1.length;
  var norm=0;
  for(var i=0;i<n;i++){norm+=Math.pow((v1[i]-v2[i]),2)}
  return Math.sqrt(norm);
}
  
function gaussSeidel(A,b,x0,eps,itMax){
  var n, nIt, dif, x, s1, s2, i, j;
  n=A.length-1;
  nIt=0;
  dif=Infinity;
  x=x0.slice(0);
  while(nIt<itMax){
    for(i=0;i<n;i++){
      s1=s2=0;
      for(j=0;j<i;j++) { s1+=A[i][j]*x[j]; }
      for(j=i+1;j<n;j++) { s2+=A[i][j]*x0[j]; }
       
      x[i]=1/A[i][i]*(b[i]-s1-s2);
    }
    
    if(normaDif(x,x0)/norma(x0)>dif){
      alert("El metodo no converge");
      return null;
    }

    dif=normaDif(x,x0)/norma(x0);  
    if(dif<eps) { 
      return ({x: x, error: dif, cantPasos: nIt}); 
    }
    x0=x.slice(0);
    nIt++;
  }  
  alert("No se alcanzó la precisión de "+eps+" en "+itMax+" pasos");
  return null;
}
