function esDiagonalDominante(A){
  var n=A.length;
  for(var i=0;i<n;i++){
    if(2*A[i][i]<sum(A[i])){return false;}
  return true;
}

function sum(A){
  var n=A.length;
  s=0;
  for(var i=0;i<n;i++){s+=A[i];}
  return s;
}

function norma(v){
  var n=v.length;
  var norm=0;
  for(var i=0;i<n;i++){norm+=v[i]**2;}
  return Math.sqrt(norm);
  
function normaDif(v1,v2){
  var n=v1.length;
  var norm=0;
  for(var i=0;i<n;i++){norm+=(v1[i]-v2[i])**2}
  return Math.sqrt(norm);
}
  
function gaussSeidel(A,b,x0,eps,itMax){
  var n, nIt, dif, x, s1, s2, i, j;
  n=A.length;
  nIt=0;
  dif=float('inf');
  x=x0.slice(0);
  while(nIt<itMax){
    for(i=0;i<n;i++){
      s1=s2=0;
      for(j=0;j<i;j++) { s1+=A[i][j]*x[j]; }
      for(j=i+1;j<n;j++) { s2+=A[i][j]*x0[j]; }
       
      x[i]=1/A[i][i]*(b[i]-s1-s2);
    
    if(normaDif(x,x0)/norma(x0)>dif){
      alert("El metodo no converge");
      return null;
    }

    dif=normaDif(x,x0)/norma(x0);  
    if(dif<eps) { return {x: x, error: dif}; }
    x0=x.slice(0);
    nIt++;
  }
  alert("No se alcanzó la precisión de "+eps+" en "+itMax+" pasos");
  return null;
}
      
    
  
A=[[4,-1,0,-1,0,0],
   [-1,4,-1,0,-1,0],
   [0,-1,4,0,0,-1],
   [-1,0,0,4,-1,0],
   [0,-1,0,-1,4,-1],
   [0,0,-1,0,-1,4]
  ]
b=[0,5,0,6,-2,6]
x0=[0,0,0,0,0,1]  
 
res,error=gaussSeidel(A,b,x0,1e-3,300)
mostrarVec(res)
print("Error relativo={:.7f}".format(error))
