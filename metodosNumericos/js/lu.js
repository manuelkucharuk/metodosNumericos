function resolver(){
  $("#infoAdicional").hide();
  $("#btnInfoAdicional").hide();
  $("#vectorX").html("");


  //Comprobación de errores
  if(!validarMatriz(A) || !validarVector(A,bCol)){
    alert("Verificar entrada.\n"+
    "La matriz A debe ser cuadrada.\n"+
    "El vector b debe tener tantas filas como la matriz A");
    return;
  }


  LUp=descomposicionLU(A); //Variable global
  if(!LUp) {alert("Error en descomposicion LU"); return;}
  determinante=det(LUp.U); //Variable global
  if(determinante==0){alert("Matriz singular");return;}

  //De tabla en columnas a array de una dimensión
  var b=Array(bCol.length-1);
  for(var i=0;i<bCol.length-1;i++){b[i]=bCol[i][0];}
  //Resuelvo
  var y=sustituir(LUp.L,b,'inf',LUp.p);
  var x=sustituir(LUp.U,y,'sup');
  //De array de una dimensión a tabla en columnas
  var xCol=Array(x.length);
  for(var i=0;i<x.length;i++){xCol[i] = new Array(1); xCol[i][0] = x[i];}
  //Muestro el resultado y el otro botón
  mostrarVector(redondearMatriz(xCol),$("#vectorX")[0],{readOnly: true})
  $("#btnInfoAdicional").show();
}

function mostrarInfoAdicional(){
  $("#matrizL").html("");
  $("#matrizU").html("");
  $("#vectorP").html("");
  $("#matrizAinv").html("");

  mostrarMatriz(redondearMatriz(LUp.L),$("#matrizL")[0],
    {readOnly: true, minSpareRows: 0, minSpareCols: 0});
  mostrarMatriz(redondearMatriz(LUp.U),$("#matrizU")[0],
    {readOnly: true, minSpareRows: 0, minSpareCols: 0});
  mostrarVector(redondearMatriz(LUp.p),$("#vectorP")[0],
    {readOnly: true, minSpareRows: 0});
  mostrarMatriz(redondearMatriz(matrizInvLU(LUp)),$("#matrizAinv")[0],
    {readOnly: true, minSpareRows: 0, minSpareCols: 0});
  $("#det").text(parseFloat(determinante.toFixed(2)));
  $("#infoAdicional").show();
}

function descomposicionLU(A){
  //Descomposicion LU (con pivot) de una matriz cuadrada
  var L, U, n, max, indMax, i, j, k;
  n=A[0].length-1;
  var p = new Array(n);
  var L = new Array(n);
  var U = new Array(n);

  //Inicializo las matrices L, U y el vector p
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
    //Encuentro pivot e intercambio filas de A, actualizando p
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

    //Actualizo valores de L y U
    L[k][k]=1;
    for(i=k+1;i<n;i++){
      if(U[k][k]==0){
        return false;
      }
      L[i][k]=U[i][k]/U[k][k];
      for(j=k+1;j<n;j++){
        U[i][j]=U[i][j]-L[i][k]*U[k][j];
      }
    }
  }

  //Completo la parte inferior (izquierda) de U con 0
  for(i=0;i<n;i++){
    for(j=0;j<i;j++){
      U[i][j]=0;
    }
  }

  //Devuelvo p como un vector columna
  var pCol = new Array();
  for(i=0;i<n;i++){
    pCol[i]= new Array(1);
    pCol[i][0]=p[i];
  }

  return {L: L, U: U, p: pCol};
}

function sustituir(A,b,tipo,p){
  //Resuelve Ax=b con A triangular sup o inf
  if (typeof tipo==="undefined"){tipo="sup";}
  if (typeof p==="undefined"){p=null;}
  var n, x, b1, i, j, s;

  n=A.length;
  x=new Array(n);
  b1=new Array(n);

  if(p){
    b1=b.slice(0);
    for(i=0;i<n;i++) {b1[i]=b[p[i]];}
    b=b1;
  }

  for(i=0;i<n;i++) x[i]=0;
  if(tipo=='sup'){
    for(i=n-1;i>-1;i--){
      s=0;
      for(j=i;j<n;j++) s+=A[i][j]*x[j];
      x[i]=(b[i]-s)/A[i][i];
    }
  }
  if(tipo=='inf'){
    for(i=0;i<n;i++){
      s=0
      for(j=0;j<i;j++) s+=A[i][j]*x[j];
      x[i]=(b[i]-s)/A[i][i];
    }
  }
  return x;
}

function det(T){
  //Determinante de una matriz triangular
  var n=T.length;
  var d=1;
  for(i=0;i<n;i++) d*=T[i][i];
  return d;
}

function matrizInvLU(descLUp){
  //Encuentra la inversa de una matriz dada la descompusicion L, U, p
  var L=descLUp.L;
  var U=descLUp.U;
  var p=descLUp.p;
  var n=L.length;
  var Ainv,x,y,e,i,j,k;

  Ainv = new Array(n);
  for(i=0;i<n;i++){
    Ainv[i] = new Array(n);
    for(j=0;j<n;j++){
      Ainv[i][j]=0;
    }
  }

  for(k=0;k<n;k++){
    e = new Array(n);
    for(i=0;i<n;i++) {e[i]=0;}
    e[k]=1;
    y=sustituir(L,e,'inf',p);
    x=sustituir(U,y,'sup');

    for(i=0;i<n;i++){
      Ainv[i][k]=x[i];
    }
  }
  return Ainv;
}
